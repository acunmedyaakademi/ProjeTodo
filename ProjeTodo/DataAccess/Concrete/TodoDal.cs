using ProjeTodo.DataAccess.Abstract;
using ProjeTodo.Models;
using ProjeTodo.Models.Dtos.TodoModels;
using System.Data.SqlClient;
using System.Threading.Tasks;
using TodoApp.Dal;

namespace ProjeTodo.DataAccess.Concrete
{
    public class TodoDal : ITodoDal
    {
        public bool AddTodo(AddTodo todo)
        {
            using (SqlConnection connection = new SqlConnection(ConnectionString.ConnectionValue))
            {
                try
                {
                    connection.Open();

                    var command = new SqlCommand(
                            "INSERT INTO todos (title, description, finish_on, updated_on, created_on, is_done, is_active) VALUES (@title, @description, @finishOn,  @updated_on, @created_on, @is_done, @is_active)",
                            connection);

                    command.Parameters.AddWithValue("@title", todo.Title);
                    command.Parameters.AddWithValue("@description", todo.Description);
                    command.Parameters.AddWithValue("@finishOn", todo.FinishTime);
                    command.Parameters.AddWithValue("@updated_on", DateTime.Now);
                    command.Parameters.AddWithValue("@created_on", DateTime.Now);
                    command.Parameters.AddWithValue("@is_done", false);
                    command.Parameters.AddWithValue("@is_active", true);

                    command.ExecuteNonQuery();

                    return true;

                }
                catch (Exception e)
                {
                    return false;
                }

            }

        }

        public bool DeleteTodo(int id)
        {
            throw new NotImplementedException();
        }

        public List<TodoList> GetAllTodos()
        {
            using (SqlConnection connection = new SqlConnection(ConnectionString.ConnectionValue))
            {
                try
                {
                    List<TodoList> todoList = new List<TodoList>();
                    connection.Open();

                    var command = new SqlCommand(
                            "SELECT id, title, updated_on, is_done FROM todos where is_active = 1 order by updated_on asc", connection);
                    var reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        TodoList todo = new();
                        todo.ID = reader.GetInt32(0);
                        todo.Title = reader.GetString(1);
                        todo.UpdatedOn = reader.GetDateTime(2);
                        todo.IsDone = reader.GetBoolean(3);

                        todoList.Add(todo);
                    }

                    return todoList;

                }
                catch (Exception e)
                {
                    return null;
                }

            }

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
