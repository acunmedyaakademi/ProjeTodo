using ProjeTodo.Models;

namespace ProjeTodo.DataAccess.Abstract
{
    public interface ITodoDal
    {
        bool AddTodo(Todo todo);
        bool Updater(Todo todo);
        bool DeleteTodo(int id);
        List<Todo> GetAllTodos();
        List<Todo> GetUserTodos(int userID);
        Todo GetById(int id);
    }
}
