using Microsoft.EntityFrameworkCore;

public class StatTraxDbContext: DbContext
{
    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        options.UseSqlServer("Server=localhost;User=SA;Password=C@ellyn@rr0wb0Lt;Database=StatTraxDb");
    }
    public DbSet<IndividualPlayer> IndividualPlayers => Set<IndividualPlayer>();

}