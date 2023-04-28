using ProjeTodo.Models;

namespace ProjeTodo.DataAccess.Abstract
{
    public interface ICommentDal
    {
        bool AddComment(string comment);
        bool DeleteComment(int id);
        List<Comment> GetTodoComments(int todoID);
        Comment GetComment(int id);
    }
}
