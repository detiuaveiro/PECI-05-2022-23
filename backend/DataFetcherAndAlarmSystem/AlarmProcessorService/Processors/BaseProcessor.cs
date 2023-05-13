using AlarmProcessorService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AlarmProcessorService.Processors
{
    public abstract class BaseProcessor : IProcessor
    {
        private string _alertName;
        public BaseProcessor(string alertName)
        {
            _alertName = alertName;
        }

        public abstract string GetEmailContent(string network, string device, IEnumerable<string> extras);

        public abstract Task<BaseResult> Process(Dictionary<string, string> parameters);
    }
}
