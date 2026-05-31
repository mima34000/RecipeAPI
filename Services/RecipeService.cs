using Microsoft.EntityFrameworkCore;
using RecipeAPI.Data;
using RecipeAPI.DTOs;
using RecipeAPI.Models;

namespace RecipeAPI.Services
{
    public class RecipeService
    {
        private readonly AppDbContext _context;

        public RecipeService(AppDbContext context)
        {
            _context = context;
        }

        // Get all recipes
        public async Task<List<RecipeDto>> GetAllAsync()
        {
            return await _context.Recipes
                .Include(r => r.Category)
                .Include(r => r.User)
                .Include(r => r.Ingredients)
                .Select(r => MapToDto(r))
                .ToListAsync();
        }

        // Get one recipe by id
        public async Task<RecipeDto?> GetByIdAsync(int id)
        {
            var recipe = await _context.Recipes
                .Include(r => r.Category)
                .Include(r => r.User)
                .Include(r => r.Ingredients)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (recipe == null) return null;

            return MapToDto(recipe);
        }

        // Create a new recipe
        public async Task<RecipeDto> CreateAsync(CreateRecipeDto dto, int userId)
        {
            var recipe = new Recipe
            {
                Title = dto.Title,
                Description = dto.Description,
                Instructions = dto.Instructions,
                PrepTimeMinutes = dto.PrepTimeMinutes,
                CookTimeMinutes = dto.CookTimeMinutes,
                Servings = dto.Servings,
                CategoryId = dto.CategoryId,
                UserId = userId,
                CreatedAt = DateTime.UtcNow,
                Ingredients = dto.Ingredients.Select(i => new Ingredient
                {
                    Name = i.Name,
                    Amount = i.Amount,
                    Unit = i.Unit
                }).ToList()
            };

            _context.Recipes.Add(recipe);
            await _context.SaveChangesAsync();

            return await GetByIdAsync(recipe.Id) ?? MapToDto(recipe);
        }

        // Update an existing recipe
        public async Task<bool> UpdateAsync(int id, UpdateRecipeDto dto, int userId, string role)
        {
            var recipe = await _context.Recipes.FindAsync(id);

            if (recipe == null) return false;

            // Only the owner or admin can update
            if (recipe.UserId != userId && role != "Admin") return false;

            recipe.Title = dto.Title;
            recipe.Description = dto.Description;
            recipe.Instructions = dto.Instructions;
            recipe.PrepTimeMinutes = dto.PrepTimeMinutes;
            recipe.CookTimeMinutes = dto.CookTimeMinutes;
            recipe.Servings = dto.Servings;
            recipe.CategoryId = dto.CategoryId;

            await _context.SaveChangesAsync();
            return true;
        }

        // Delete a recipe
        public async Task<bool> DeleteAsync(int id, int userId, string role)
        {
            var recipe = await _context.Recipes.FindAsync(id);

            if (recipe == null) return false;

            // Only the owner or admin can delete
            if (recipe.UserId != userId && role != "Admin") return false;

            _context.Recipes.Remove(recipe);
            await _context.SaveChangesAsync();
            return true;
        }

        // Helper method to map Recipe to RecipeDto
        private static RecipeDto MapToDto(Recipe r)
        {
            return new RecipeDto
            {
                Id = r.Id,
                UserId = r.UserId,
                Title = r.Title,
                Description = r.Description,
                Instructions = r.Instructions,
                PrepTimeMinutes = r.PrepTimeMinutes,
                CookTimeMinutes = r.CookTimeMinutes,
                Servings = r.Servings,
                CreatedAt = r.CreatedAt,
                CategoryName = r.Category?.Name ?? "",
                AuthorUsername = r.User?.Username ?? "",
                Ingredients = r.Ingredients.Select(i => new IngredientDto
                {
                    Id = i.Id,
                    Name = i.Name,
                    Amount = i.Amount,
                    Unit = i.Unit
                }).ToList()
            };
        }
    }
}