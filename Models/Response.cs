using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace dermaexpressReporte.Models
{
    public class Response<T>
    {
        [JsonProperty("Success")]
        public bool Success { get; set; }
        [JsonProperty("Result")]
        public T Result { get; set; }
    }
}