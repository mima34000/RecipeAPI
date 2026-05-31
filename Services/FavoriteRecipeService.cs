using Microsoft.EntityFrameworkCore;
using RecipeAPI.Data;
using RecipeAPI.DTOs;
using RecipeAPI.Models;

namespace RecipeAPI.Services
{
    public class FavoriteRecipeService
    {
        private readonly AppDbContext _context;

        public FavoriteRecipeService(AppDbContext context)
        {
            _context = context;
        }

        // Get all favorite recipes for a user
        public async Task<List<RecipeDto>> GetUserFavoritesAsync(int userId)
        {
            return await _context.FavoriteRecipes
                .Where(f => f.UserId == userId)
                .Include(f => f.Recipe)
                    .ThenInclude(r => r.Category)
                .Include(f => f.Recipe)
                    .ThenInclude(r => r.User)
                .Include(f => f.Recipe)
                    .ThenInclude(r => r.Ingredients)
                .Select(f => new RecipeDto
                {
                    Id = f.Recipe.Id,
                    Title = f.Recipe.Title,
                    Description = f.Recipe.Description,
                    Instructions = f.Recipe.Instructions,
                    PrepTimeMinutes = f.Recipe.PrepTimeMinutes,
                    CookTimeMinutes = f.Recipe.CookTimeMinutes,
                    Servings = f.Recipe.Servings,
                    CreatedAt = f.Recipe.CreatedAt,
                    CategoryName = f.Recipe.Category.Name,
                    AuthorUsername = f.Recipe.User.Username,
                    Ingredients = f.Recipe.Ingredients.Select(i => new IngredientDto
                    {
                        Id = i.Id,
                        Name = i.Name,
                        Amount = i.Amount,
                        Unit = i.Unit
                    }).ToList()
                })
                .ToListAsync();
        }

        // Add a recipe to favorites
        public async Task<bool> AddToFavoritesAsync(int userId, int recipeId)
        {
            // Check if recipe exists
            var recipe = await _context.Recipes.FindAsync(recipeId);
            if (recipe == null) return false;

            // Check if already in favorites
            var exists = await _context.FavoriteRecipes
                .AnyAsync(f => f.UserId == userId && f.RecipeId == recipeId);
            if (exists) return false;

            var favorite = new FavoriteRecipe
            {
                UserId = userId,
                RecipeId = recipeId,
                AddedAt = DateTime.UtcNow
            };

            _context.FavoriteRecipes.Add(favorite);
            await _context.SaveChangesAsync();
            return true;
        }

        // Remove a recipe from favorites
        public async Task<bool> RemoveFromFavoritesAsync(int userId, int recipeId)
        {
            var favorite = await _context.FavoriteRecipes
                .FirstOrDefaultAsync(f => f.UserId == userId && f.RecipeId == recipeId);

            if (favorite == null) return false;

            _context.FavoriteRecipes.Remove(favorite);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}