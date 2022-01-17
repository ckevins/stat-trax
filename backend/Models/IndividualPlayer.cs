
//for bats/throws 0 will represent right, and 1 will represent left, for bats, 2 will represent switch
public class IndividualPlayer
{
    public int IndividualPlayerId { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public int Number { get; set; }

    public string Position { get; set; } = string.Empty;
    public string Bats { get; set; } = string.Empty;
    public string Throws { get; set; } = string.Empty;
    public string TeamName { get; set; } = string.Empty;

}