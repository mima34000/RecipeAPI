namespace RecipeAPI.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

        // One category can have many recipes
        public ICollection<Recipe> Recipes { get; set; } = new List<Recipe>();
    }
}
