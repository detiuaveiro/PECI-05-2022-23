using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Alert
    {
        public string Name { get; set; }
        public IEnumerable<AlertParam> AlertParams { get; set; }
    }
}
