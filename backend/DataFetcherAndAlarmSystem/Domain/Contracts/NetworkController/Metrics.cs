using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain.Contracts.NetworkController
{
    public record GetMetricRequest(
            int Index,
            int DeviceId
        );

    public class GetMetricResponse
    {
        public Dictionary<string, Device> data { get; set; }
    }

    public class Device
    {
        public Counter[] counters { get; set; }
        public int device_id { get; set; }
    }

    public class Counter
    {
        public List<Dictionary<string, string>> entries { get; set; }
        public long id { get; set; }
        public string name { get; set; }
    }

}
