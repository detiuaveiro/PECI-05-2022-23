using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Contracts.AlarmConfigurationApi
{
    public class PostAlert
    {
        public string? Name { get; set; }
        public IEnumerable<PostAlertParam>? Params { get; set; }
        
        public bool validate()
        {
            return Name != null && Params != null && Params.All(x=>x.validate());
        }
    }
}
