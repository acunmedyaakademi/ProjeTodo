using ProjeTodo.DataAccess.Abstract;
using ProjeTodo.Models;
using System.Data.SqlClient;
using TodoApp.Dal;

namespace ProjeTodo.DataAccess.Concrete
{
    public class UserDal : IUserDal
    {
        public bool AddUser(User user)
        {
            using (SqlConnection connection = new SqlConnection(ConnectionString.ConnectionValue))
            {
                try
                {
                    connection.Open();

                    var command = new SqlCommand(
                            "INSERT INTO users (id, name, email, password, mail_code, mail_send_date, mail_confirmed, created_on, is_active) VALUES (@id, @name, @email, @password, @mailCode, @mailSendDate, @mailConfirmed, @createdOn, @isActive)",
                            connection);

                    command.Parameters.AddWithValue("@id", Guid.NewGuid());
                    command.Parameters.AddWithValue("@name", user.Name);
                    command.Parameters.AddWithValue("@email", user.Email);
                    command.Parameters.AddWithValue("@password", user.Password);
                    command.Parameters.AddWithValue("@mailCode", "nul");
                    command.Parameters.AddWithValue("@mailSendDate", DateTime.Now);
                    command.Parameters.AddWithValue("@mailConfirmed", false);
                    command.Parameters.AddWithValue("@createdOn", DateTime.Now);
                    command.Parameters.AddWithValue("@isActive", true);

                    command.ExecuteNonQuery();

                    return true;

                }
                catch (Exception e)
                {
                    return false;
                }

            }

        }

        public bool DeleteUser(int id)
        {
            using (SqlConnection connection = new SqlConnection(ConnectionString.ConnectionValue))
            {
                try
                {
                    connection.Open();
                    var command = new SqlCommand("UPDATE users SET is_active = 0 WHERE id = @id", connection);

                    command.Parameters.AddWithValue("@id", id);

                    int a = command.ExecuteNonQuery();

                    if (a == 0)
                    {
                        return false;
                    }

                    return true;

                }
                catch (Exception e)
                {
                    return false;
                }
            }
        }

        public List<User> GetAllUsers()
        {
            throw new NotImplementedException();
        }

        public User GetUserByEmail(string email)
        {
            using (SqlConnection connection = new SqlConnection(ConnectionString.ConnectionValue))
            {
                try
                {
                    User user = new();

                    connection.Open();

                    var command = new SqlCommand(
                            "select id, name, email, password, mail_code, mail_send_date, mail_confirmed, created_on, is_active from users where email = @email",
                            connection);

                    command.Parameters.AddWithValue("@email", email);

                    var reader = command.ExecuteReader();

                    reader.Read();
                    user.ID = reader.GetInt32(0);
                    user.Name = reader.GetString(1);
                    user.Email = reader.GetString(2);
                    user.Password = reader.GetString(3);
                    user.MailCode = reader.GetString(4);
                    user.MailSendDate = reader.GetDateTime(5);
                    user.MailConfirmed = reader.GetBoolean(6);
                    user.CreatedOn = reader.GetDateTime(7);
                    user.IsActive = reader.GetBoolean(8);

                    return user;

                }
                catch (Exception e)
                {
                    return null;
                }
            }
        }

        public User GetUserById(int id)
        {
            using (SqlConnection connection = new SqlConnection(ConnectionString.ConnectionValue))
            {
                try
                {
                    User user = new();

                    connection.Open();

                    var command = new SqlCommand(
                            "select id, name, email, password, mail_code, mail_send_date, mail_confirmed, created_on, is_active from users where id = @id",
                            connection);

                    command.Parameters.AddWithValue("@id", id);

                    var reader = command.ExecuteReader();

                    reader.Read();
                    user.ID = reader.GetInt32(0);
                    user.Name = reader.GetString(1);
                    user.Email = reader.GetString(2);
                    user.Password = reader.GetString(3);
                    user.MailCode = reader.GetString(4);
                    user.MailSendDate = reader.GetDateTime(5);
                    user.MailConfirmed = reader.GetBoolean(6);
                    user.CreatedOn = reader.GetDateTime(7);
                    user.IsActive = reader.GetBoolean(8);

                    return user;

                }
                catch (Exception e)
                {
                    return null;
                }
            }
        }

        public bool UpdateUser(User user)
        {
            throw new NotImplementedException();
        }
    }
}
