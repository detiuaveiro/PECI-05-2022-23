﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AlarmProcessorService.Models
{
    public class BaseResult
    {
        public bool Success { get; set; }
        public bool SendEmail { get; set; }
    }
}
