using System.ComponentModel.DataAnnotations;

namespace DAL.Postgres.Models
{
    public class AlertParam
    {
        public Guid Id { get; set; }
        [Required]
        public string Type { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public Guid AlertId { get; set; }
        public Alert Alert { get; set; }
        public IEnumerable<AlertConfigParamValue> AlertConfigParamValues { get; set; }
    }
}