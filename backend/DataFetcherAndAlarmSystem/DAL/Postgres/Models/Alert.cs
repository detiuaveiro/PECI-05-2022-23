using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Postgres.Models
{
    public class Alert
    {
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
        public IEnumerable<AlertParam> AlertParams { get; set; }
    }
}
