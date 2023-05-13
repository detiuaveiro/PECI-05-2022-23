using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class AlertConfig
    {
        public string Network { get; set; }
        public string Device { get; set; }
        public string AlertName { get; set; }
        public Dictionary<string, string> Params { get; set; }
        public IEnumerable<string> Roles { get; set; }
    }
}
