using System;
using System.Collections;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Contracts.PeciBackend
{
    public record MetricsPostRequest(
            string Network,
            string Device,
            Dictionary<string, string> Data
        );
}
