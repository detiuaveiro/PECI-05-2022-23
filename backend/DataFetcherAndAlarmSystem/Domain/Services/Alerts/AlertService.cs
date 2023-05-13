using DAL.Postgres;
using DAL.Postgres.Models;
using Microsoft.EntityFrameworkCore;
using Npgsql.EntityFrameworkCore.PostgreSQL.Query.ExpressionTranslators.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Services.Alerts
{
    public class AlertService : IAlertService
    {
        private DatabaseContextFactory _contextFactory;
        public AlertService(DatabaseContextFactory contextFactory)
        {
            _contextFactory = contextFactory;
        }

        public async Task<bool> CreateAlert(Models.Alert alert)
        {
            using (var _context = _contextFactory.Create())
            {
                if (_context.Alerts.Any(x => x.Name == alert.Name)) return false;
                var alertRecord = new Alert()
                {
                    Name = alert.Name
                };
                await _context.Alerts.AddAsync(alertRecord);
                await _context.SaveChangesAsync();
                foreach (var param in alert.AlertParams)
                {
                    if (_context.AlertParams.Any(x => x.AlertId == alertRecord.Id && x.Name == param.Name)) continue;
                    var paramRecord = new AlertParam()
                    {
                        Name = param.Name,
                        Type = param.Type,
                        AlertId = alertRecord.Id
                    };
                    await _context.AlertParams.AddAsync(paramRecord);
                    await _context.SaveChangesAsync();
                }
                return false;
            }
        }

        public async Task<bool> CreateAlertConfig(Models.AlertConfig alertConfig)
        {
            using (var _context = _contextFactory.Create())
            {
                var alertRecord = _context.Alerts.FirstOrDefault(x => x.Name == alertConfig.AlertName);
                if (alertRecord == null) return false;
                var alertConfigRecord = new AlertConfig()
                {
                    AlertId = alertRecord.Id,
                    Device = alertConfig.Device,
                    Network = alertConfig.Network,
                    Enabled = true,
                };
                await _context.AlertConfigs.AddAsync(alertConfigRecord);
                await _context.SaveChangesAsync();
                foreach (var param in alertConfig.Params)
                {
                    var paramRecord = _context.AlertParams.FirstOrDefault(x => x.AlertId == alertRecord.Id && x.Name == param.Key);
                    if (paramRecord == null) continue;
                    var paramValueRecord = new AlertConfigParamValue()
                    {
                        AlertConfigId = alertConfigRecord.Id,
                        AlertParamId = paramRecord.Id,
                        Value = param.Value,
                    };
                    await _context.AlertConfigParamValues.AddAsync(paramValueRecord);
                    await _context.SaveChangesAsync();
                }
                foreach (var role in alertConfig.Roles)
                {
                    var roleRecord = new AlertConfigRole()
                    {
                        AlertConfigId = alertConfigRecord.Id,
                        Role = role,
                    };
                    await _context.AlertConfigRoles.AddAsync(roleRecord);
                    await _context.SaveChangesAsync();
                }
                return true;
            }
        }

        public async Task<IEnumerable<Models.AlertConfig>> GetAlertConfigs(string network, string device)
        {
            using (var _context = _contextFactory.Create())
            {
                return (await _context.AlertConfigs
                    .Where(x => x.Enabled && x.Network == network && x.Device == device)
                    .Include(x => x.Alert)
                    .Include(x => x.Roles)
                    .Include(x => x.ParamValues)
                    .ToListAsync())
                    .ConvertAll(x => new Models.AlertConfig()
                    {
                        AlertName = x.Alert.Name,
                        Device = x.Device,
                        Network = x.Network,
                        Params = x.ParamValues.ToDictionary(y => y.AlertParam.Name, y => y.Value),
                        Roles = x.Roles.Select(y => y.Role),
                    });
            }
        }

        public async Task<IEnumerable<string>?> GetEmailExtras(string network, string device, string alarmName)
        {
            using (var _context = _contextFactory.Create())
            {
                var record = await _context.AlertConfigs
                    .Include(x => x.Alert)
                    .Include(x => x.ParamValues)
                    .FirstOrDefaultAsync(x => x.Enabled && x.Network == network && x.Device == device && x.Alert.Name == alarmName);
                if (record == null) return null;

                switch (record.Alert.Name)
                {
                    case "GreaterThan":
                        var metricName = (await _context.AlertConfigParamValues
                            .Where(x => x.AlertConfigId == record.Id)
                            .Include(x => x.AlertParam)
                            .FirstOrDefaultAsync(x => x.AlertParam.Name == "MetricName"))?.Value;
                        return new List<string>()
                    {
                        $"{metricName}",
                        $"Threshold: {record.ParamValues.FirstOrDefault(x => x.AlertParam.Name == "Threshold")?.Value}",
                    };
                }
                return null;
            }
        }

        public async Task<IEnumerable<Models.WatchedDevice>> GetWatchedDevices()
        {

            using (var _context = _contextFactory.Create())
            {
                var configs = await _context.AlertConfigs.ToListAsync();
                return configs.Select(x => new Models.WatchedDevice()
                {
                    Device = x.Device,
                    Network = x.Network,
                }).Distinct();
            }
        }
    }
}
