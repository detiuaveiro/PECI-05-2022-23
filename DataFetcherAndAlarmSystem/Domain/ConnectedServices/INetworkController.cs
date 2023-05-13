using Domain.Contracts.NetworkController;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ConnectedServices
{
    public interface INetworkController
    {
        public Task<GetMetricResponse?> getMetricsData(GetMetricRequest request);
    }
}
