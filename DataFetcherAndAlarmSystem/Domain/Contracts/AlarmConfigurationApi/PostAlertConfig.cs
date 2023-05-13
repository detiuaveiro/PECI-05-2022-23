using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Contracts.AlarmConfigurationApi
{
    public class PostAlertConfig
    {
        public string? Network { get; set; }
        public string? Device { get; set; }
        public string? Type { get; set; }
        public IEnumerable<string>? Roles { get; set; }
        public Dictionary<string, string>? Params { get; set; }

        public bool validate()
        {
            return Network != null && Device != null && Params != null && Type != null;
        }
    }
}
