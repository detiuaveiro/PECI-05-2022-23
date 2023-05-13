using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Postgres.Models
{
    public class AlertConfig
    {
        public Guid Id { get; set; }
        [Required]
        public string Network { get; set; }
        [Required]
        public string Device { get; set; }
        [Required]
        public bool Enabled { get; set; }
        [Required]
        public Guid AlertId { get; set; }
        public Alert Alert { get; set; }
        public IEnumerable<AlertConfigRole> Roles { get; set; }
        public IEnumerable<AlertConfigParamValue> ParamValues { get; set; }
    }
}
