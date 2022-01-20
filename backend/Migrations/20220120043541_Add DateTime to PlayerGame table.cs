using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class AddDateTimetoPlayerGametable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AtBats_PlayerGames_PlayerGameId",
                table: "AtBats");

            migrationBuilder.AddColumn<DateTime>(
                name: "Date",
                table: "PlayerGames",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AlterColumn<int>(
                name: "PlayerGameId",
                table: "AtBats",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_AtBats_PlayerGames_PlayerGameId",
                table: "AtBats",
                column: "PlayerGameId",
                principalTable: "PlayerGames",
                principalColumn: "PlayerGameId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AtBats_PlayerGames_PlayerGameId",
                table: "AtBats");

            migrationBuilder.DropColumn(
                name: "Date",
                table: "PlayerGames");

            migrationBuilder.AlterColumn<int>(
                name: "PlayerGameId",
                table: "AtBats",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_AtBats_PlayerGames_PlayerGameId",
                table: "AtBats",
                column: "PlayerGameId",
                principalTable: "PlayerGames",
                principalColumn: "PlayerGameId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
