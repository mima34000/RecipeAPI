namespace RecipeAPI.Models
{
    public class Recipe
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Instructions { get; set; } = string.Empty;
        public int PrepTimeMinutes { get; set; }
        public int CookTimeMinutes { get; set; }
        public int Servings { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Foreign key to Category
        public int CategoryId { get; set; }
        public Category Category { get; set; } = null!;

        // Foreign key to User (owner of the recipe)
        public int UserId { get; set; }
        public User User { get; set; } = null!;

        // One recipe can have many ingredients
        public ICollection<Ingredient> Ingredients { get; set; } = new List<Ingredient>();

        // One recipe can be favorited by many users
        public ICollection<FavoriteRecipe> FavoriteRecipes { get; set; } = new List<FavoriteRecipe>();
    }
}