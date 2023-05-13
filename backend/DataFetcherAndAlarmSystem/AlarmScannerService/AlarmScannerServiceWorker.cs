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

namespace AlarmScannerService
{
    public class AlarmScannerServiceWorker : BackgroundService
    {
        private readonly ILogger<AlarmScannerServiceWorker> _logger;
        private readonly IMessageBus _messageBus;
        private readonly IConfiguration _configuration;
        private readonly IAlertService _alertService;

        public AlarmScannerServiceWorker(ILogger<AlarmScannerServiceWorker> logger, IMessageBus messageBus, IConfiguration configuration, IAlertService alertService)
        {
            _logger = logger;
            _messageBus = messageBus;
            _configuration = configuration;
            _alertService = alertService;
        }

        private async void handleMetric(RedisChannel channel, RedisValue value)
        {
            _logger.LogInformation($"AlarmScannerServiceWorker received message: {value}");
            var obj = JsonSerializer.Deserialize<MetricsPostRequest>(value.ToString());
            (await _alertService.GetWatchedDevices())?.ToList().ForEach(device =>
            {
                if (device.Device == obj?.Device && device.Network == obj?.Network)
                {
                    _messageBus.Publish(new Message("alarms", value));
                }
            });
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                _logger.LogInformation("Worker running at: {time}", DateTimeOffset.Now);

                _messageBus.Subscribe("metrics", handleMetric);

                await Task.Delay(15000, stoppingToken);
            }
        }
    }
}