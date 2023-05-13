using DAL.Redis;
using Domain.Contracts.MessageBus;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Services.Comunication
{
    public class MessageBus : IMessageBus
    {
        private IDbContext _context;
        public MessageBus(IDbContext context)
        {
            _context = context;
        }
        public void Publish(Message message)
        {
            var db = _context.GetDatabase();
            var pub = db.GetSubscriber();
            var res = pub.Publish(message.Channel, message.Content);
        }

        public void Subscribe(string channel, Action<RedisChannel, RedisValue> handler)
        {
            var db = _context.GetDatabase();
            var sub = db.GetSubscriber();
            sub.Subscribe(channel, handler);
        }
    }
}
