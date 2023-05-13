using Domain.Contracts.NetworkController;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain.ConnectedServices
{
    public class NetworkController : ConnectedService, INetworkController
    {
        public NetworkController(IConfiguration configuration, HttpClient httpClient) : base(configuration["ControllerUrl"]!, httpClient)
        {
        }

        public async Task<GetMetricResponse?> getMetricsData(GetMetricRequest request)
        {
            var opPath = "/p4runtime/getcounters";
            var query = $"?index=" + request.Index + (request.DeviceId > 0 ? "&device_id=" + request.DeviceId : "");
            //var response = await this.HttpClient.GetAsync(this.Url + opPath + query );
            var response = await this.HttpClient.GetAsync(this.Url + "/api/switch/getcounters");
            if (response.IsSuccessStatusCode)
            {
                string content;
                using (var reader = new StreamReader(response.Content.ReadAsStream()))
                {
                    content = await reader.ReadToEndAsync();
                }
                var data = JsonSerializer.Deserialize<Dictionary<string, Device>>(content);
                return data == null
                    ? null
                    : new GetMetricResponse()
                    {
                        data = data
                    };
            }
            return null;
        }
    }
}
