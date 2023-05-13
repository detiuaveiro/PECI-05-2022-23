using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Redis
{
    public interface IDbContext : IDisposable
    {
        public ConnectionMultiplexer GetDatabase();
    }
}
