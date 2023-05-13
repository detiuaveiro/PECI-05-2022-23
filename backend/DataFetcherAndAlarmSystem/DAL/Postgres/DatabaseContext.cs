using DAL.Postgres.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Postgres
{
    public class DatabaseContext : DbContext
    {
        public DbSet<Alert> Alerts { get; set; }
        public DbSet<AlertConfig> AlertConfigs { get; set; }
        public DbSet<AlertConfigParamValue> AlertConfigParamValues { get; set; }
        public DbSet<AlertConfigRole> AlertConfigRoles { get; set; }
        public DbSet<AlertParam> AlertParams { get; set; }

        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
        }
    }
}
