using System.Threading;
using System.Threading.Tasks;
using MediatR;

public class DummyRequest : IRequest<DummyData> {}

public class DummyData
{
    public int X {get; set;}
    public int Y {get; set;}
}
public class DummyHandler : IRequestHandler<DummyRequest, DummyData>
{
    public async Task<DummyData> Handle(DummyRequest request, CancellationToken cancellationToken)
    {
        return new DummyData
        {
            X = 8, 
            Y = 2,
        };
    }
}