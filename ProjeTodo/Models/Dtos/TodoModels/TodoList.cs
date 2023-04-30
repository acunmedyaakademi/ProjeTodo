namespace ProjeTodo.Models.Dtos.TodoModels
{
    public class TodoList
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public DateTime UpdatedOn { get; set; }
        public bool IsDone { get; set; }
    }
}
