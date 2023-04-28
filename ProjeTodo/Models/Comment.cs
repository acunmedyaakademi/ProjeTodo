namespace ProjeTodo.Models
{
    public class Comment
    {
        public int ID { get; set; }
        public int? UserID { get; set; }
        public int? TodoID { get; set; }
        public string Msg { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
        public bool IsActive { get; set; }
    }
}
