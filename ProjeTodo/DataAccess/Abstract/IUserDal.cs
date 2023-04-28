using ProjeTodo.Models;

namespace ProjeTodo.DataAccess.Abstract
{
    public interface IUserDal
    {
        bool AddUser(User user);
        bool UpdateUser(User user);
        bool DeleteUser(int id);
        List<User> GetAllUsers();
        User GetUserById(int id);
        User GetUserByEmail(string email);
    }
}
