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

        // Each DbSet represents a table in the database
        public DbSet<User> Users { get; set; }
        public DbSet<Recipe> Recipes { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Ingredient> Ingredients { get; set; }
        public DbSet<FavoriteRecipe> FavoriteRecipes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // Suppress warning about dynamic values in seed data (BCrypt hash)
            optionsBuilder.ConfigureWarnings(w =>
                w.Ignore(RelationalEventId.PendingModelChangesWarning));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Fix for multiple cascade paths - turn off cascade delete for FavoriteRecipe
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

            // Seed admin user so anyone who clones the repo has an admin account
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

            // Seed some categories so the app has data from the start
            modelBuilder.Entity<Category>().HasData(
                new Category { Id = 1, Name = "Breakfast", Description = "Morning meals" },
                new Category { Id = 2, Name = "Lunch", Description = "Midday meals" },
                new Category { Id = 3, Name = "Dinner", Description = "Evening meals" },
                new Category { Id = 4, Name = "Dessert", Description = "Sweet treats" },
                new Category { Id = 5, Name = "Snack", Description = "Light bites" }
            );
        }
    }
}