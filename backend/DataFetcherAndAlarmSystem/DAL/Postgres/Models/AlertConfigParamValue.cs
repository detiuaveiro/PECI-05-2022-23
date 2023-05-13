using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Postgres.Models
{
    public class AlertConfigParamValue
    {
        public Guid Id { get; set; }
        [Required]
        public Guid AlertConfigId { get; set; }
        public AlertConfig AlertConfig { get; set; }
        [Required]
        public Guid AlertParamId { get; set; }
        public AlertParam AlertParam { get; set; }
        [Required]
        public string Value { get; set; }
    }
}
