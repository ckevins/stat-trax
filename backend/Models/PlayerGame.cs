public class PlayerGame
{
    public int PlayerGameId { get; set; }
    public IndividualPlayer IndividualPlayer { get; set; }

    public DateTime Date { get; set; }
    public string Opponent { get; set; } = string.Empty;
    public ICollection<AtBat> AtBats { get; set; }

}