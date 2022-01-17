using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]

public class PlayerGamesController : ControllerBase
{
    private readonly StatTraxDbContext context;

    public PlayerGamesController(StatTraxDbContext context)
    {
        this.context = context;
    }

    [HttpGet]
    public List<PlayerGame> GetPlayerGames()
    {
        return context.PlayerGames
            .Include(pg => pg.IndividualPlayer)
            .Include(pg => pg.AtBats).ToList();
    }

    [HttpGet("{playerId}")]
    public List<PlayerGame> GetOnePlayersGamers(int playerId)
    {
        return context.PlayerGames
            .Where(pg => pg.IndividualPlayer.IndividualPlayerId == playerId)
            .Include(pg => pg.IndividualPlayer)
            .Include(pg => pg.AtBats)
            .ToList();
    }


    [HttpPost]
    public IActionResult CreatePlayerGame(PlayerGame game)
    {
        context.PlayerGames.Add(game);
        context.SaveChanges();
        return CreatedAtAction(nameof(GetPlayerGame), new { gameId = game.PlayerGameId }, game);
    }

    [HttpGet("game/{gameId}")]
    public IActionResult GetPlayerGame(int gameId)
    {
        var game = context.PlayerGames.Where(pg => pg.PlayerGameId == gameId).FirstOrDefault();

        if (game != null)
        {
            return new OkObjectResult(game);
        }
        else
        {
            return new NotFoundResult();
        }
    }
}