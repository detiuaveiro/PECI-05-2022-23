using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AlarmProcessorService.Models
{
    public class ProcessResult<TResult> : BaseResult
    {
        public TResult? Result { get; set; }
    }
}
