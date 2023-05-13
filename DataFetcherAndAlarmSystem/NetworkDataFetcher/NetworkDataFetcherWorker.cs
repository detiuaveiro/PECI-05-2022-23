using Domain.ConnectedServices;
using Domain.Contracts.MessageBus;
using Domain.Contracts.PeciBackend;
using Domain.Services.Comunication;
using Domain.Services.Metrics;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using NetworkDataFetcher.Factories;
using System.Text.Json;

namespace NetworkDataFetcher
{
    public class NetworkDataFetcherWorker : BackgroundService
    {
        private readonly ILogger<NetworkDataFetcherWorker> _logger;
        private readonly IBackend _backendService;
        private readonly INetworkController _networkControllerService;
        private readonly IMetricsProcessor _metricsProcessor;
        private readonly IMessageBus _messageBus;

        public NetworkDataFetcherWorker(
            ILogger<NetworkDataFetcherWorker> logger, 
            IBackend backendService, 
            INetworkController networkControllerService,
            IMetricsProcessor metricsProcessor,
            IMessageBus messageBus)
        {
            _logger = logger;
            _backendService = backendService;
            _networkControllerService = networkControllerService;
            _metricsProcessor = metricsProcessor;
            _messageBus = messageBus;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("NetworkDataFetcher running at: {time}", DateTimeOffset.Now);
            while (!stoppingToken.IsCancellationRequested)
            {
                var controllerRequest = RequestFactory.getDefaultMetricsRequest();
                var controllerResponse = await _networkControllerService.getMetricsData(controllerRequest);
                if (controllerResponse != null)
                {
                    var backendRequests = _metricsProcessor.ProcessNetworkControllerResponses(controllerResponse);
                    _logger.LogDebug(backendRequests.ToString());
                    foreach ( var backendRequest in backendRequests )
                    {
                        try
                        {
                            var sucess = await _backendService.postMetric(backendRequest);
                            _logger.LogDebug(sucess ? $"metric for {backendRequest.Device} posted to backend" : "error posting data to backend!");
                            _messageBus.Publish(new Message("metrics", JsonSerializer.Serialize(backendRequest)));
                        }
                        catch (Exception e)
                        {
                            _logger.LogDebug(e.Message);
                        }
                    }
                }
                await Task.Delay(15000, stoppingToken);
            }
        }
    }
}