using AlarmProcessorService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AlarmProcessorService.Processors
{
    public class GreaterThanProcessor : BaseProcessor
    {
        public GreaterThanProcessor() : base("GreaterThan")
        {
        }

        public override string GetEmailContent(string network, string device, IEnumerable<string> extras)
        {
            return $"Network: {network}\nDevice: {device}\n{extras.First()} is greater than {extras.Last()}";
        }

        public override async Task<BaseResult> Process(Dictionary<string, string> parameters)
        {
            var result = new ProcessResult<bool>();
            if (!parameters.ContainsKey("Value") || !parameters.ContainsKey("Threshold"))
            {
                result.Success = false;
                return result;
            }
            var value = double.Parse(parameters["Value"]);
            var threshold = double.Parse(parameters["Threshold"]);
            result.Success = true;
            result.SendEmail = value > threshold;
            result.Result = value > threshold;
            return result;
        }
    }
}
