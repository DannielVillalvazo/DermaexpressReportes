using dermaexpressReporte.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Sap.Data.Hana;
using System.Drawing;

namespace dermaexpressReporte.Functions
{
    public class Inventory
    {
        internal static Response<List<Items>> GetSAPInventory()
        {
            Response<List<Items>> oRespuesta = new Response<List<Items>>();
            List<Items> lsItems = new List<Items>();
            string sDB = Properties.Settings.Default.SapDB;
            try
            {
                string connString = "Server=" + Properties.Settings.Default.HanaServer + ";UID=" + Properties.Settings.Default.SapDBuser + ";PWD=" + Properties.Settings.Default.SapDBpass + ";";
                string sQuery = $@"CALL {sDB}.MP_DERMAEXPRESS_CONSULTA_STOCK";

                using (HanaConnection connection = new HanaConnection(connString))
                {
                    connection.Open();
                    using (var cmd = new HanaCommand(sQuery, connection))
                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            lsItems.Add(new Items
                            {

                                SKU = reader["CodeBars"].ToString(),
                                CodigoSAP = reader["ItemCode"].ToString(),
                                Descripcion = reader["ItemName"].ToString(),
                                Fabricante = reader["Fabricante"].ToString(),
                                Marca = reader["Marca"].ToString(),
                                DisponibleGDL = reader["DisponibleAlmacenGDL"].ToString(),
                                DisponibleCDMX = reader["DisponibleAlmacenCDMX"].ToString(),
                                DisponibleMTY = reader["DisponibleAlmacenMTY"].ToString(),
                                DisponibleSLT = reader["DisponibleAlmacenSALTO"].ToString(),
                            });
                        }
                    }
                    connection.Close();
                }

                if (lsItems.Count == 0)
                {
                    Conflict oConflict = new Conflict();
                    oConflict.Description = "No se encontro información relacionada";
                    oConflict.Code = 404;

                    oRespuesta.Success = false;
                    oRespuesta.Error = oConflict;
                    return oRespuesta;
                }

                oRespuesta.Success = true;
                oRespuesta.Data = lsItems;
                return oRespuesta ;
            }
            catch (Exception ex)
            {
                Conflict oConflict = new Conflict();
                oConflict.Description = "Se produjo un error no controlado, contacte al area de Desarrollo";
                oConflict.Code = 500;

                oRespuesta.Success = false;
                oRespuesta.Error = oConflict;
                return oRespuesta;
            }
        }
    }
}