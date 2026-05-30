using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RecipeAPI.DTOs;
using RecipeAPI.Services;
using System.Security.Claims;

namespace RecipeAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecipesController : ControllerBase
    {
        private readonly RecipeService _recipeService;

        public RecipesController(RecipeService recipeService)
        {
            _recipeService = recipeService;
        }

        // GET: api/recipes - anyone can see all recipes
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var recipes = await _recipeService.GetAllAsync();
            return Ok(recipes);
        }

        // GET: api/recipes/5 - anyone can see one recipe
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var recipe = await _recipeService.GetByIdAsync(id);
            if (recipe == null) return NotFound("Recipe not found.");
            return Ok(recipe);
        }

        // POST: api/recipes - only logged in users can create
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] CreateRecipeDto dto)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var recipe = await _recipeService.CreateAsync(dto, userId);
            return CreatedAtAction(nameof(GetById), new { id = recipe.Id }, recipe);
        }

        // PUT: api/recipes/5 - only owner or admin can update
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateRecipeDto dto)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var role = User.FindFirstValue(ClaimTypes.Role)!;

            var success = await _recipeService.UpdateAsync(id, dto, userId, role);
            if (!success) return Forbid();

            return NoContent();
        }

        // DELETE: api/recipes/5 - only owner or admin can delete
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var role = User.FindFirstValue(ClaimTypes.Role)!;

            var success = await _recipeService.DeleteAsync(id, userId, role);
            if (!success) return Forbid();

            return NoContent();
        }
    }
}