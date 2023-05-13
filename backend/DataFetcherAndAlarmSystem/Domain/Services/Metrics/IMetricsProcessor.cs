using Domain.Contracts.NetworkController;
using Domain.Contracts.PeciBackend;

namespace Domain.Services.Metrics
{
    public interface IMetricsProcessor
    {
        public IEnumerable<MetricsPostRequest> ProcessNetworkControllerResponses(GetMetricResponse data);
    }
}