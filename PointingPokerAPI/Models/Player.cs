namespace PointingPokerAPI.Models
{
    public class Player
    {
        public string SessionId { get; set; }
        public string ConnectionId { get; set; }
        public string Name { get; set; }
        public string VotedValue { get; set; }
        public bool ShowVoting { get; set; }
    }
}
