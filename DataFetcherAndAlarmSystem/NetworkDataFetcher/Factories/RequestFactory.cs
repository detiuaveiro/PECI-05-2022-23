using Domain.Contracts.NetworkController;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NetworkDataFetcher.Factories
{
    public static class RequestFactory
    {
        public static GetMetricRequest getDefaultMetricsRequest()
        {
            return new GetMetricRequest(100, -1);
        }
    }
}
