using Microsoft.AspNetCore.Mvc;

namespace ProjeTodo.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
