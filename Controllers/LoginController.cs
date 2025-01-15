using dermaexpressReporte.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace dermaexpressReporte.Controllers
{
    public class LoginController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Route("GetLogin")]
        public JsonResult GetLogin(string sUser, string sPass)
        {
            Response<UserLogin> oRespuesta = new Response<UserLogin>();
            oRespuesta = Functions.LoginFunction.LoginValidate(sUser, sPass);

            return Json(oRespuesta, JsonRequestBehavior.AllowGet);
        }
    }
}
