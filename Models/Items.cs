using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace dermaexpressReporte.Models
{
    public class Items
    {
        [Required]
        public string SKU { get; set; }
        [Required]
        public string CodigoSAP { get; set; }
        [Required]
        public string Descripcion { get; set; }
        [Required]
        public string Fabricante { get; set; }
        [Required]
        public string Marca { get; set; }
        [Required]
        public string DisponibleGDL { get; set; }
        [Required]
        public string DisponibleSLT { get; set; }
        [Required]
        public string DisponibleCDMX { get; set; }
        [Required]
        public string DisponibleMTY { get; set; }
    }
}