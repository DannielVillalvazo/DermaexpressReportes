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

        [JsonProperty("Error")]
        public Conflict Error { get; set; }

        [JsonProperty("Data")]
        public T Data { get; set; }
    }
}