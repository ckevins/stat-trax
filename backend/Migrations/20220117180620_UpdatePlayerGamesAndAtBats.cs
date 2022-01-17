using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class UpdatePlayerGamesAndAtBats : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_PlayerGames_IndividualPlayerId",
                table: "PlayerGames",
                column: "IndividualPlayerId");

            migrationBuilder.AddForeignKey(
                name: "FK_PlayerGames_IndividualPlayers_IndividualPlayerId",
                table: "PlayerGames",
                column: "IndividualPlayerId",
                principalTable: "IndividualPlayers",
                principalColumn: "IndividualPlayerId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PlayerGames_IndividualPlayers_IndividualPlayerId",
                table: "PlayerGames");

            migrationBuilder.DropIndex(
                name: "IX_PlayerGames_IndividualPlayerId",
                table: "PlayerGames");
        }
    }
}
