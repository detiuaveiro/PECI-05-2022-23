using AlarmProcessorService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AlarmProcessorService.Processors
{
    public interface IProcessor
    {
        public Task<BaseResult> Process(Dictionary<string, string> parameters);

        public string GetEmailContent(string network, string device, IEnumerable<string> extras);
    }
}
