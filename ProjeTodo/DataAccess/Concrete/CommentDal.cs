using ProjeTodo.DataAccess.Abstract;
using ProjeTodo.Models;

namespace ProjeTodo.DataAccess.Concrete
{
    public class CommentDal : ICommentDal
    {
        public bool AddComment(string comment)
        {
            throw new NotImplementedException();
        }

        public bool DeleteComment(int id)
        {
            throw new NotImplementedException();
        }

        public Comment GetComment(int id)
        {
            throw new NotImplementedException();
        }

        public List<Comment> GetTodoComments(int todoID)
        {
            throw new NotImplementedException();
        }
    }
}
