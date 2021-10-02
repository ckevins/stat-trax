using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/dummy")]
public class DummyController : ControllerBase
{
    IMediator _mediator;
    public DummyController(IMediator mediator)
    {
        _mediator = mediator;
    }
    [HttpGet("data")] 
    public async Task<ActionResult<DummyData>> GetDummyData()
    {
        var response = await _mediator.Send(new DummyRequest());
        return Ok(response);
    }
}