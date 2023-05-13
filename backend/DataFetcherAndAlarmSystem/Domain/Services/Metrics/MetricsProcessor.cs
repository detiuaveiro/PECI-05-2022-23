using Domain.Contracts.NetworkController;
using Domain.Contracts.PeciBackend;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Services.Metrics
{
    public class MetricsProcessor : IMetricsProcessor
    {
        public IEnumerable<MetricsPostRequest> ProcessNetworkControllerResponses(GetMetricResponse data)
        {
            var result = new List<MetricsPostRequest>();

            foreach (var kvp in data.data)
            {
                var deviceName = kvp.Key;
                var deviceData = kvp.Value;
                if (deviceData == null) continue;
                foreach (var counter in deviceData.counters)
                {
                    var metricResult = new Dictionary<string, string>();
                    foreach (var entry in counter.entries)
                    {
                        foreach (var metric in entry.Keys)
                        {
                            metricResult.Add(
                                (counter.name + "_" + metric).Replace(".", "_"),
                                entry[metric]);
                        }
                    }
                    result.Add(
                        new MetricsPostRequest(
                            "test",
                            deviceName,
                            metricResult));
                }
            }
            return result;
        }
    }
}
