using ProjeTodo.Models;
using ProjeTodo.Models.Dtos.TodoModels;

namespace ProjeTodo.DataAccess.Abstract
{
    public interface ITodoDal
    {
        bool AddTodo(AddTodo todo);
        bool Updater(Todo todo);
        bool DeleteTodo(int id);
        List<TodoList> GetAllTodos();
        List<Todo> GetUserTodos(int userID);
        Todo GetById(int id);
    }
}
