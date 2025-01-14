using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace dermaexpressReporte.Models
{
    public class Conflict
    {
        [Required]
        [JsonProperty("Code")]
        public int Code { get; set; }
        [Required]
        [JsonProperty("Description")]
        public string Description { get; set; }
    }
}