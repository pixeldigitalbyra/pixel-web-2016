using Microsoft.AspNet.Mvc;

namespace Pixel.Web.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
