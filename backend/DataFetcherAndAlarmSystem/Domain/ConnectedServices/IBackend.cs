using Domain.Contracts.PeciBackend;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ConnectedServices
{
    public interface IBackend
    {
        public Task<bool> postMetric(MetricsPostRequest request);
    }
}
