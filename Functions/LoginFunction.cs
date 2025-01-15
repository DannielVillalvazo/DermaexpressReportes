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
        internal static Response<UserLogin> LoginValidate(string sUser, string sPass)
        {
            Response<UserLogin> oRespuesta = new Response<UserLogin>();
            Conflict oConflict = new Conflict();
            try
            {
                // Validar si el usuario se ingreso correctamente
                string sPassword = string.Empty;
                if (!Globals.DiccionarioUsuarios.TryGetValue(sUser, out sPassword))
                {
                    oConflict.Description = "Favor de verificar el correo ingresado.";
                    oConflict.Code = 400;

                    oRespuesta.Success = false;
                    oRespuesta.Error = oConflict;
                    return oRespuesta;
                }
                if (sPassword != sPass)
                {
                    oConflict.Description = "La contraseña ingresada es incorrecta.";
                    oConflict.Code = 400;

                    oRespuesta.Success = false;
                    oRespuesta.Error = oConflict;
                    return oRespuesta;
                }
                UserLogin sNombreUsuario = new UserLogin();
                sNombreUsuario.Nombre = Globals.DiccionarioNombres[sUser];

                oRespuesta.Success = true;
                oRespuesta.Data = sNombreUsuario;
                return oRespuesta;
            }
            catch (Exception ex)
            {
                oConflict.Description = ex.ToString();
                oConflict.Code = 500;

                oRespuesta.Success = false;
                oRespuesta.Error = oConflict;
                return oRespuesta;
            }
        }
    }
}