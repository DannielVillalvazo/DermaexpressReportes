using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace dermaexpressReporte.Models
{
    public class Globals
    {
        //inicialización y crear a valores
        public static Dictionary<string, string> DiccionarioUsuarios = new Dictionary<string, string>()
        {
            {"ivan.lopez@dermaexpress.com.mx", "Mepiel2025"},
            {"jesus.herrera@dermaexpress.com.mx", "Mepiel2025"}
        };
        public static Dictionary<string, string> DiccionarioNombres = new Dictionary<string, string>()
        {
            {"ivan.lopez@dermaexpress.com.mx", "Ivan Lopez"},
            {"jesus.herrera@dermaexpress.com.mx", "Jesus Herrera"}
        };
    }
}