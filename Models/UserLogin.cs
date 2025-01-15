using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace dermaexpressReporte.Models
{
    public class UserLogin
    {
        [Required]
        public string Nombre { get; set; } 
    }
}