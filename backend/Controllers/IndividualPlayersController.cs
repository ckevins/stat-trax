using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]

public class IndividualPlayersController : ControllerBase
{
    private readonly StatTraxDbContext context;

    public IndividualPlayersController(StatTraxDbContext context)
    {
        this.context = context;
    }

    [HttpGet]
    public List<IndividualPlayer> GetIndividualPlayers()
    {
        return context.IndividualPlayers.ToList();
    }

    [HttpPost]
    public IActionResult CreateIndividualPlayer(IndividualPlayer player)
    {
        context.IndividualPlayers.Add(player);
        context.SaveChanges();
        return CreatedAtAction(nameof(GetIndividualPlayer), new { playerId = player.IndividualPlayerId }, player);
    }

    [HttpGet("{playerId}")]
    public IActionResult GetIndividualPlayer(int playerId)
    {
        var player = context.IndividualPlayers.Where(x => x.IndividualPlayerId == playerId).FirstOrDefault();

        if (player != null)
        {
            return new OkObjectResult(player);
        }
        else
        {
            return new NotFoundResult();
        }
    }
}