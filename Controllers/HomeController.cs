using dermaexpressReporte.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace dermaexpressReporte.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        [HttpGet]
        [Route("GetItems")]
        public JsonResult GetItems()
        {
            Response<List<Items>> oResponse = new Response<List<Items>>();

            // Obtener primero los articulos con base a los campos
            oResponse = Functions.Inventory.GetSAPInventory();

            //oRespuestaArticulos.Error = lsItems;
            return Json(oResponse, JsonRequestBehavior.AllowGet);
        }
    }
}