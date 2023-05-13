using Microsoft.Extensions.Configuration;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Redis
{
    public class DbContext : IDbContext
    {
        private ConnectionMultiplexer _database;

        public DbContext(IConfiguration configuration)
        {
            _database = ConnectionMultiplexer.Connect(configuration["RedisConnectionString"]!);
        }

        public ConnectionMultiplexer GetDatabase() 
        { 
            return _database; 
        }

        public void Dispose()
        {
            _database.Dispose();
        }
    }
}
