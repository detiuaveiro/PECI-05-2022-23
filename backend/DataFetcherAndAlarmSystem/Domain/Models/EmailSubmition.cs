using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class EmailSubmition
    {
        public string Content { get; set; }
        public IEnumerable<string> Roles { get; set; }
    }
}
