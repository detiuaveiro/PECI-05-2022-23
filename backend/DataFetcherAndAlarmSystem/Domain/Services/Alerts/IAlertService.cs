using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Services.Alerts
{
    public interface IAlertService
    {
        public Task<bool> CreateAlert(Alert alert);
        public Task<bool> CreateAlertConfig(AlertConfig alertConfig);
        Task<IEnumerable<AlertConfig>> GetAlertConfigs(string network, string device);
        Task<IEnumerable<string>?> GetEmailExtras(string network, string device, string alarmName);
        Task<IEnumerable<WatchedDevice>> GetWatchedDevices();
    }
}
