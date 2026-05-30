using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecipeAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddAdminSeed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "PasswordHash", "Role", "Username" },
                values: new object[] { 1, "admin@recipe.com", "$2a$11$Fj/Hj.YvioBMAkDt6GhLKeN80RpeP5OfDPx5Ub5g4fOcKGlmFaSsW", "Admin", "admin" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1);
        }
    }
}
