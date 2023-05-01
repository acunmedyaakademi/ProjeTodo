namespace ProjeTodo.Models
{
    public class Todo
    {
        public int ID { get; set; }
        public int? UserID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsDone { get; set; }
        public DateTime? RemindOn { get; set; }
        public DateTime? FinishOn { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
        public bool IsActive { get; set; }
    }
}
