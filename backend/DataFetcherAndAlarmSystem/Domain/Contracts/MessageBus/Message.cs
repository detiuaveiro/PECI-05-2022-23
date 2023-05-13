using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Contracts.MessageBus
{
    public record Message (
        string Channel,
        RedisValue Content);
}
