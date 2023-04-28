using ProjeTodo.DataAccess.Abstract;
using ProjeTodo.Models;

namespace ProjeTodo.DataAccess.Concrete
{
    public class TodoDal : ITodoDal
    {
        public bool AddTodo(Todo todo)
        {
            throw new NotImplementedException();
        }

        public bool DeleteTodo(int id)
        {
            throw new NotImplementedException();
        }

        public List<Todo> GetAllTodos()
        {
            throw new NotImplementedException();
        }

        public Todo GetById(int id)
        {
            throw new NotImplementedException();
        }

        public List<Todo> GetUserTodos(int userID)
        {
            throw new NotImplementedException();
        }

        public bool Updater(Todo todo)
        {
            throw new NotImplementedException();
        }
    }
}
