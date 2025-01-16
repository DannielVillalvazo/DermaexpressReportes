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
            {"ivan.lopez", "Mepiel2025"},
            {"jesus.herrera", "Mepiel2025"},
            {"gerardo.reyes", "Mepiel2025"},
            {"abisag.alcorta", "Mepiel2025"},
            {"enrique.navarro", "Mepiel2025"},
            {"jorge.barragan", "Mepiel2025"},
            {"monica.urena", "Mepiel2025"},
        };
        public static Dictionary<string, string> DiccionarioNombres = new Dictionary<string, string>()
        {
            {"ivan.lopez", "Ivan Lopez"},
            {"jesus.herrera", "Jesus Herrera"},
            {"gerardo.reyes", "Gerardo Reyes"},
            {"abisag.alcorta", "Abisag Alcorta"},
            {"enrique.navarro", "Enrique Navarro"},
            {"jorge.barragan", "Jorge Barragan"},
            {"monica.urena", "Monica Ureña"},
        };
    }
}