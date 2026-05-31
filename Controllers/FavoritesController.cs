using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RecipeAPI.Services;
using System.Security.Claims;

namespace RecipeAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class FavoritesController : ControllerBase
    {
        private readonly FavoriteRecipeService _favoriteService;

        public FavoritesController(FavoriteRecipeService favoriteService)
        {
            _favoriteService = favoriteService;
        }

        // GET: api/favorites - get all favorites for logged in user
        [HttpGet]
        public async Task<IActionResult> GetMyFavorites()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var favorites = await _favoriteService.GetUserFavoritesAsync(userId);
            return Ok(favorites);
        }

        // POST: api/favorites/5 - add recipe to favorites
        [HttpPost("{recipeId}")]
        public async Task<IActionResult> AddToFavorites(int recipeId)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var success = await _favoriteService.AddToFavoritesAsync(userId, recipeId);
            if (!success) return BadRequest("Recipe already in favorites or does not exist.");
            return Ok("Recipe added to favorites.");
        }

        // DELETE: api/favorites/5 - remove recipe from favorites
        [HttpDelete("{recipeId}")]
        public async Task<IActionResult> RemoveFromFavorites(int recipeId)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var success = await _favoriteService.RemoveFromFavoritesAsync(userId, recipeId);
            if (!success) return NotFound("Recipe not found in favorites.");
            return Ok("Recipe removed from favorites.");
        }
    }
}