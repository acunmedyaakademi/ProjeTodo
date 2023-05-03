using ProjeTodo.Models;
using ProjeTodo.Models.Dtos.TodoModels;

namespace ProjeTodo.DataAccess.Abstract
{
    public interface ITodoDal
    {
        bool AddTodo(AddTodo todo);
        bool UpdateTodo(UpdateTodo todo);
        bool DeleteTodo(int id);
        List<TodoList> GetAllTodos();
        List<Todo> GetUserTodos(int userID);
        Todo GetById(int id);
        bool DoneTodo(int id);
        bool UndoneTodo(int id);
    }
}
