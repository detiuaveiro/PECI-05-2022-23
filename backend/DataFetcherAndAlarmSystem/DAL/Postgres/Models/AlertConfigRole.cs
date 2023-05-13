using System.ComponentModel.DataAnnotations;

namespace DAL.Postgres.Models
{
    public class AlertConfigRole
    {
        public Guid Id { get; set; }
        [Required]
        public Guid AlertConfigId { get; set; }
        public AlertConfig AlertConfig { get; set; }
        [Required]
        public string Role { get; set; }
    }
}