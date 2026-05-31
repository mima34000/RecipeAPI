using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RecipeAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddSeedIngredients : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Ingredients",
                columns: new[] { "Id", "Amount", "Name", "RecipeId", "Unit" },
                values: new object[,]
                {
                    { 1, "2", "Flour", 1, "cups" },
                    { 2, "2", "Eggs", 1, "pcs" },
                    { 3, "1.5", "Milk", 1, "cups" },
                    { 4, "2", "Butter", 1, "tbsp" },
                    { 5, "400", "Spaghetti", 2, "g" },
                    { 6, "300", "Ground beef", 2, "g" },
                    { 7, "400", "Tomato sauce", 2, "ml" },
                    { 8, "1", "Onion", 2, "pcs" },
                    { 9, "1", "Romaine lettuce", 3, "head" },
                    { 10, "4", "Caesar dressing", 3, "tbsp" },
                    { 11, "50", "Parmesan", 3, "g" },
                    { 12, "1", "Croutons", 3, "cup" },
                    { 13, "200", "Dark chocolate", 4, "g" },
                    { 14, "100", "Butter", 4, "g" },
                    { 15, "200", "Sugar", 4, "g" },
                    { 16, "100", "Flour", 4, "g" },
                    { 17, "2", "Bread", 5, "slices" },
                    { 18, "1", "Avocado", 5, "pcs" },
                    { 19, "1", "Lemon juice", 5, "tbsp" },
                    { 20, "1", "Salt", 5, "pinch" }
                });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2a$11$1dINb80632tjwWtpES4SxuaDzUUI3oR5aTVZf4vxB9WDZPyYxtXiu");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "Ingredients",
                keyColumn: "Id",
                keyValue: 20);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "PasswordHash",
                value: "$2a$11$zKNTzimkx9IkZaInY6YkpegR.hZuRsfdhhcv9nHNxAHoVUHyLOji6");
        }
    }
}
