using AlarmProcessorService.Processors;
using Domain.Contracts.MessageBus;
using Domain.Contracts.PeciBackend;
using Domain.Models;
using Domain.Services.Alerts;
using Domain.Services.Comunication;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using StackExchange.Redis;
using System.Text.Json;

namespace AlarmProcessorService
{
    public class AlarmProcessorServiceWorker : BackgroundService
    {
        private readonly ILogger<AlarmProcessorServiceWorker> _logger;
        private readonly IMessageBus _messageBus;
        private readonly IConfiguration _configuration;
        private readonly IAlertService _alertService;

        public AlarmProcessorServiceWorker(ILogger<AlarmProcessorServiceWorker> logger, IMessageBus messageBus, IAlertService alertService, IConfiguration configuration)
        {
            _logger = logger;
            _messageBus = messageBus;
            _configuration = configuration;
            _alertService = alertService;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                _logger.LogInformation("Worker running at: {time}", DateTimeOffset.Now);

                _messageBus.Subscribe("alarms", handler);

                await Task.Delay(10000, stoppingToken);
            }
        }

        private async void handler(RedisChannel channel, RedisValue value)
        {
            _logger.LogInformation($"AlarmProcessorServiceWorker received message: {value}");
            var obj = JsonSerializer.Deserialize<MetricsPostRequest>(value.ToString());
            if (obj == null) return;

            var configs = await _alertService.GetAlertConfigs(obj.Network, obj.Device);
            if (configs == null) return;
            foreach (var config in configs)
            {
                var processor = ProcessorPicker.GetProcessor(config.AlertName);
                if (processor == null) return;
                var processResult = await processor.Process(config.Params);
                if (processResult == null) return;
                if (processResult.SendEmail)
                {
                    var emailContent = processor.GetEmailContent(obj.Network, obj.Device, await _alertService.GetEmailExtras(obj.Network, obj.Device, config.AlertName) ?? new List<string>());
                    if (emailContent == null || emailContent == "") return;
                    var email = new EmailSubmition
                    {
                        Content = emailContent,
                        Roles = config.Roles,
                    };
                    _messageBus.Publish(new Message("emails", JsonSerializer.Serialize(email)));
                }
            }
        }
    }
}