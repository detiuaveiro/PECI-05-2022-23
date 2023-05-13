using AlarmConfigurationApi.Mappers;
using Domain.Contracts.AlarmConfigurationApi;
using Domain.Models;
using Domain.Services.Alerts;
using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Mvc;

namespace AlarmConfigurationApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlarmController : ControllerBase
    {
        private readonly IAlertService _alertService;
        public AlarmController(IAlertService alertService) 
        {
            _alertService = alertService;
        }

        [HttpPost("config")]
        public async Task<IActionResult> Post([FromBody] PostAlertConfig config)
        {
            if (!config.validate()) return BadRequest();

            var alertModel = RequestMapper.mapRequest(config);
            if (alertModel == null) return BadRequest();

            var res = await _alertService.CreateAlertConfig(alertModel);

            return res ? Ok() : BadRequest("Alert not defined!");
        }

        [HttpPost("alert")]
        public async Task<IActionResult> Post([FromBody] PostAlert alert)
        {
            if(!alert.validate()) return BadRequest();

            var alertModel = RequestMapper.mapRequest(alert);
            if (alertModel == null) return BadRequest();

            var res = await _alertService.CreateAlert(alertModel);

            return res ? Ok() : BadRequest("Alert already defined!");
        }

        [HttpGet("watchedDevices")]
        [EnableQuery]
        public async Task<IEnumerable<WatchedDevice>> GetWatchedDevices()
        {
            return await _alertService.GetWatchedDevices();
        }

        [HttpGet("alertConfigs")]
        [EnableQuery]
        public async Task<IEnumerable<AlertConfig>> GetAlertConfigs(string network, string device)
        {
            return await _alertService.GetAlertConfigs(network, device);
        }

        [HttpGet("emailContent")]
        [EnableQuery]
        public async Task<IEnumerable<string>> GetEmailExtras(string network, string device, string alarmName)
        {
            var result = await _alertService.GetEmailExtras(network, device, alarmName);
            return result == null ? new List<string>() : result;
        }
    }
}
