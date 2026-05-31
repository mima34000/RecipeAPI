using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using RecipeAPI.Models;

namespace RecipeAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Recipe> Recipes { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Ingredient> Ingredients { get; set; }
        public DbSet<FavoriteRecipe> FavoriteRecipes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.ConfigureWarnings(w =>
                w.Ignore(RelationalEventId.PendingModelChangesWarning));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<FavoriteRecipe>()
                .HasOne(f => f.User)
                .WithMany(u => u.FavoriteRecipes)
                .HasForeignKey(f => f.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<FavoriteRecipe>()
                .HasOne(f => f.Recipe)
                .WithMany(r => r.FavoriteRecipes)
                .HasForeignKey(f => f.RecipeId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    Username = "admin",
                    Email = "admin@recipe.com",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin123!"),
                    Role = "Admin"
                }
            );

            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "Breakfast", Description = "Morning meals" },
                new Category { Id = 2, Name = "Lunch", Description = "Midday meals" },
                new Category { Id = 3, Name = "Dinner", Description = "Evening meals" },
                new Category { Id = 4, Name = "Dessert", Description = "Sweet treats" },
                new Category { Id = 5, Name = "Snack", Description = "Light bites" }
            );

            modelBuilder.Entity<Recipe>().HasData(
                new Recipe { Id = 1, Title = "Classic Pancakes", Description = "Fluffy and delicious pancakes perfect for breakfast.", Instructions = "Mix flour, eggs, milk and butter. Cook on a hot pan until golden.", PrepTimeMinutes = 10, CookTimeMinutes = 15, Servings = 4, CategoryId = 1, UserId = 1, CreatedAt = new DateTime(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
                new Recipe { Id = 2, Title = "Spaghetti Bolognese", Description = "A classic Italian pasta dish with rich meat sauce.", Instructions = "Brown the meat, add tomatoes and simmer. Cook pasta and combine.", PrepTimeMinutes = 15, CookTimeMinutes = 30, Servings = 4, CategoryId = 3, UserId = 1, CreatedAt = new DateTime(2024, 1, 2, 0, 0, 0, DateTimeKind.Utc) },
                new Recipe { Id = 3, Title = "Caesar Salad", Description = "Fresh romaine lettuce with creamy Caesar dressing.", Instructions = "Chop lettuce, add croutons, parmesan and Caesar dressing. Toss well.", PrepTimeMinutes = 10, CookTimeMinutes = 0, Servings = 2, CategoryId = 2, UserId = 1, CreatedAt = new DateTime(2024, 1, 3, 0, 0, 0, DateTimeKind.Utc) },
                new Recipe { Id = 4, Title = "Chocolate Brownies", Description = "Rich and fudgy chocolate brownies everyone will love.", Instructions = "Melt chocolate and butter. Mix with eggs and flour. Bake at 180C for 25 minutes.", PrepTimeMinutes = 15, CookTimeMinutes = 25, Servings = 8, CategoryId = 4, UserId = 1, CreatedAt = new DateTime(2024, 1, 4, 0, 0, 0, DateTimeKind.Utc) },
                new Recipe { Id = 5, Title = "Avocado Toast", Description = "Simple and healthy avocado toast for a quick snack.", Instructions = "Toast bread, mash avocado with lemon and salt. Spread on toast.", PrepTimeMinutes = 5, CookTimeMinutes = 5, Servings = 1, CategoryId = 5, UserId = 1, CreatedAt = new DateTime(2024, 1, 5, 0, 0, 0, DateTimeKind.Utc) }
            );

            modelBuilder.Entity<Ingredient>().HasData(
                new Ingredient { Id = 1, Name = "Flour", Amount = "2", Unit = "cups", RecipeId = 1 },
                new Ingredient { Id = 2, Name = "Eggs", Amount = "2", Unit = "pcs", RecipeId = 1 },
                new Ingredient { Id = 3, Name = "Milk", Amount = "1.5", Unit = "cups", RecipeId = 1 },
                new Ingredient { Id = 4, Name = "Butter", Amount = "2", Unit = "tbsp", RecipeId = 1 },
                new Ingredient { Id = 5, Name = "Spaghetti", Amount = "400", Unit = "g", RecipeId = 2 },
                new Ingredient { Id = 6, Name = "Ground beef", Amount = "300", Unit = "g", RecipeId = 2 },
                new Ingredient { Id = 7, Name = "Tomato sauce", Amount = "400", Unit = "ml", RecipeId = 2 },
                new Ingredient { Id = 8, Name = "Onion", Amount = "1", Unit = "pcs", RecipeId = 2 },
                new Ingredient { Id = 9, Name = "Romaine lettuce", Amount = "1", Unit = "head", RecipeId = 3 },
                new Ingredient { Id = 10, Name = "Caesar dressing", Amount = "4", Unit = "tbsp", RecipeId = 3 },
                new Ingredient { Id = 11, Name = "Parmesan", Amount = "50", Unit = "g", RecipeId = 3 },
                new Ingredient { Id = 12, Name = "Croutons", Amount = "1", Unit = "cup", RecipeId = 3 },
                new Ingredient { Id = 13, Name = "Dark chocolate", Amount = "200", Unit = "g", RecipeId = 4 },
                new Ingredient { Id = 14, Name = "Butter", Amount = "100", Unit = "g", RecipeId = 4 },
                new Ingredient { Id = 15, Name = "Sugar", Amount = "200", Unit = "g", RecipeId = 4 },
                new Ingredient { Id = 16, Name = "Flour", Amount = "100", Unit = "g", RecipeId = 4 },
                new Ingredient { Id = 17, Name = "Bread", Amount = "2", Unit = "slices", RecipeId = 5 },
                new Ingredient { Id = 18, Name = "Avocado", Amount = "1", Unit = "pcs", RecipeId = 5 },
                new Ingredient { Id = 19, Name = "Lemon juice", Amount = "1", Unit = "tbsp", RecipeId = 5 },
                new Ingredient { Id = 20, Name = "Salt", Amount = "1", Unit = "pinch", RecipeId = 5 }
            );
        }
    }
}