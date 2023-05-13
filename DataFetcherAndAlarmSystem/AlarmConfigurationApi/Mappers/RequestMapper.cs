using Domain.Contracts.AlarmConfigurationApi;
using Domain.Models;

namespace AlarmConfigurationApi.Mappers
{
    public static class RequestMapper
    {
        public static AlertConfig mapRequest(PostAlertConfig request)
        {
            return new AlertConfig()
            {
                AlertName = request.Type!,
                Device = request.Device!,
                Network = request.Network!,
                Params = request.Params!,
                Roles = request.Roles!
            };
        }

        public static Alert mapRequest(PostAlert request)
        {
            return new Alert()
            {
                Name = request.Name!,
                AlertParams = request.Params!.ToList().ConvertAll(x=>new AlertParam()
                {
                    Name = x.Name!,
                    Type = x.Type!
                })
            };
        }
    }
}
