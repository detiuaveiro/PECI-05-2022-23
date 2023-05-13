using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AlarmProcessorService.Processors
{
    public class ProcessorPicker
    {
        public static IProcessor? GetProcessor(string alertName)
        {
            switch (alertName)
            {
                case "GreaterThan":
                    return new GreaterThanProcessor();
                default:
                    return null;
            }
        }
    }
}
