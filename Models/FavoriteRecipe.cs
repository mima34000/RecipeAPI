namespace RecipeAPI.Models
{
    public class FavoriteRecipe
    {
        public int Id { get; set; }

        // Foreign key to User
        public int UserId { get; set; }
        public User User { get; set; } = null!;

        // Foreign key to Recipe
        public int RecipeId { get; set; }
        public Recipe Recipe { get; set; } = null!;

        public DateTime AddedAt { get; set; } = DateTime.UtcNow;
    }
}