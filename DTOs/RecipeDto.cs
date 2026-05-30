namespace RecipeAPI.DTOs
{
    // What we send back to the client
    public class RecipeDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Instructions { get; set; } = string.Empty;
        public int PrepTimeMinutes { get; set; }
        public int CookTimeMinutes { get; set; }
        public int Servings { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CategoryName { get; set; } = string.Empty;
        public string AuthorUsername { get; set; } = string.Empty;
        public List<IngredientDto> Ingredients { get; set; } = new List<IngredientDto>();
    }

    // What we receive when creating a new recipe
    public class CreateRecipeDto
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Instructions { get; set; } = string.Empty;
        public int PrepTimeMinutes { get; set; }
        public int CookTimeMinutes { get; set; }
        public int Servings { get; set; }
        public int CategoryId { get; set; }
        public List<CreateIngredientDto> Ingredients { get; set; } = new List<CreateIngredientDto>();
    }

    // What we receive when updating a recipe
    public class UpdateRecipeDto
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Instructions { get; set; } = string.Empty;
        public int PrepTimeMinutes { get; set; }
        public int CookTimeMinutes { get; set; }
        public int Servings { get; set; }
        public int CategoryId { get; set; }
    }

    // DTO for ingredient
    public class IngredientDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Amount { get; set; } = string.Empty;
        public string Unit { get; set; } = string.Empty;
    }

    // DTO for creating a new ingredient
    public class CreateIngredientDto
    {
        public string Name { get; set; } = string.Empty;
        public string Amount { get; set; } = string.Empty;
        public string Unit { get; set; } = string.Empty;
    }
}