using Domain.Contracts.PeciBackend;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ConnectedServices
{
    public class PeciBackend : ConnectedService, IBackend
    {
        public PeciBackend(IConfiguration configuration, HttpClient httpClient) : base(configuration["BackendUrl"]!, httpClient)
        {
        }

        public async Task<bool> postMetric(MetricsPostRequest request)
        {
            var response = await this.HttpClient.PostAsJsonAsync(this.Url + "api/TelemetryReport", request);
            using (var reader = new StreamReader(response.Content.ReadAsStream()))
            {
                var res = reader.ReadToEnd();
            }
            return response.IsSuccessStatusCode;
        }
    }
}
