using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ConnectedServices
{
    public abstract class ConnectedService : IConnectedService
    {
        public string Url { get; init; }
        public HttpClient HttpClient { get; init; }

        public ConnectedService(string url, HttpClient httpClient)
        {
            this.Url = url;
            this.HttpClient = httpClient;
        }
    }
}
