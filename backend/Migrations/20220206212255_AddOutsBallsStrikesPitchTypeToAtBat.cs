using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class AddOutsBallsStrikesPitchTypeToAtBat : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Balls",
                table: "AtBats",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Outs",
                table: "AtBats",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "PitchType",
                table: "AtBats",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Strikes",
                table: "AtBats",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Balls",
                table: "AtBats");

            migrationBuilder.DropColumn(
                name: "Outs",
                table: "AtBats");

            migrationBuilder.DropColumn(
                name: "PitchType",
                table: "AtBats");

            migrationBuilder.DropColumn(
                name: "Strikes",
                table: "AtBats");
        }
    }
}
