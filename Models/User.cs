namespace RecipeAPI.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string Role { get; set; } = "User"; // User or Admin

        // One user can have many recipes
        public ICollection<Recipe> Recipes { get; set; } = new List<Recipe>();

        // One user can have many favorite recipes
        public ICollection<FavoriteRecipe> FavoriteRecipes { get; set; } = new List<FavoriteRecipe>();
    }
}