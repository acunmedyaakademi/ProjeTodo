using Microsoft.AspNetCore.Mvc;
using ProjeTodo.DataAccess.Concrete;
using ProjeTodo.Models;
using ProjeTodo.Models.Dtos.TodoModels;

namespace ProjeTodo.Controllers
{
    public class HomeController : Controller
    {
        TodoDal _todoDal = new TodoDal();

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult AddTodo(AddTodo todo)
        {
            _todoDal.AddTodo(todo);
            return Json("true");
        }

        public IActionResult GetTodos()
        {
            List<TodoList> todoList = _todoDal.GetAllTodos();
            return Json(todoList);
        }

        public IActionResult GetTodoById(int id)
        {
           Todo todo= _todoDal.GetById(id);

            return Json(todo);
        }

        [HttpPost]
        public IActionResult DeleteTodo(int id)
        {
            _todoDal.DeleteTodo(id);
            return Json("true");
        }
    }
}
