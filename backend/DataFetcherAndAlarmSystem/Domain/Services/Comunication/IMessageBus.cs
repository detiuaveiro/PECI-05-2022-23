using Domain.Contracts.MessageBus;
using StackExchange.Redis;

namespace Domain.Services.Comunication
{
    public interface IMessageBus
    {
        public void Subscribe(string channel, Action<RedisChannel, RedisValue> handler);
        public void Publish(Message message);
    }
}