using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Postgres
{
    public class DatabaseContextFactory
    {
        private IConfiguration _configuration;

        public DatabaseContextFactory(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public DatabaseContext Create()
        {
            var options = new DbContextOptionsBuilder<DatabaseContext>();
            options.UseNpgsql(_configuration.GetConnectionString("DefaultConnection"));
            return new DatabaseContext(options.Options);
        }
    }
}
