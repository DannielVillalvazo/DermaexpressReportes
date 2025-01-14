using dermaexpressReporte.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static System.Net.Mime.MediaTypeNames;

namespace dermaexpressReporte.Functions
{
    public class LoginFunction
    {
        internal static Response<Conflict> LoginValidate(string sUser, string sPass)
        {
            Response<Conflict> oRespuesta = new Response<Conflict>();
            Conflict oConflict = new Conflict();
            try
            {
                // Validar si el usuario se ingreso correctamente
                string sPassword = string.Empty;
                if (!Globals.DiccionarioUsuarios.TryGetValue(sUser, out sPassword))
                {                   
                    oConflict.Description = "Favor de verificar el correo ingresado.";
                    oConflict.Code = 404;

                    oRespuesta.Success = false;
                    oRespuesta.Result = oConflict;
                    return oRespuesta;
                }
                if (sPassword != sPass)
                {                    
                    oConflict.Description = "La contraseña ingresada es incorrecta.";
                    oConflict.Code = 404;

                    oRespuesta.Success = false;
                    oRespuesta.Result = oConflict;
                    return oRespuesta;
                }
                
                oConflict.Description = "Se ingreso correctamente al sistema";
                oConflict.Code = 200;

                oRespuesta.Success = true;
                oRespuesta.Result = oConflict;
                return oRespuesta;
            }
            catch (Exception ex)
            {
                oConflict.Description = ex.ToString();
                oConflict.Code = 500;

                oRespuesta.Success = false;
                oRespuesta.Result = oConflict;
                return oRespuesta;
            }
        }
    }
}