namespace PointingPokerAPI.Hub
{
    using Microsoft.AspNetCore.SignalR;
    using PointingPokerAPI.Models;

    public class PointingPokerHub : Hub
    {
        private static readonly Dictionary<string, List<Player>> sessionPlayers = new();

        public override async Task OnConnectedAsync()
        {
            await base.OnConnectedAsync();
        }
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await base.OnDisconnectedAsync(exception);
        }

        public async Task JoinSprint(Player player)
        {
            if (!sessionPlayers.ContainsKey(player.SessionId))
                sessionPlayers[player.SessionId] = new List<Player>();


            var players = sessionPlayers[player.SessionId];

            if (players.Any(p => p.Name == player.Name))
                return;


            player.ConnectionId = Context.ConnectionId;
            players.Add(player);

            await Groups.AddToGroupAsync(Context.ConnectionId, player.SessionId);
            await Clients.Group(player.SessionId).SendAsync("PlayerJoined", players);
        }

        public async Task UpdatePlayerVote(string sessionId, string voteValue)
        {
            if (sessionPlayers.TryGetValue(sessionId, out var players))
            {
                var currentPlayer = players.FirstOrDefault(p => p.ConnectionId == Context.ConnectionId);
                if (currentPlayer != null)
                {
                    currentPlayer.VotedValue = voteValue;
                    await Clients.Group(sessionId).SendAsync("PlayerVoted", players);
                }
            }
        }

        public async Task ClearVoting(string sessionId)
        {

            if (sessionPlayers.TryGetValue(sessionId, out var players))
            {
                foreach (var player in players)
                {
                    player.VotedValue = string.Empty;
                    player.ShowVoting = false;
                }

                await Clients.Group(sessionId).SendAsync("ClearVoting", players);
            }
        }

        public async Task ShowVoting(string sessionId)
        {
            if (sessionPlayers.TryGetValue(sessionId, out var players))
            {
                foreach (var player in players)
                    player.ShowVoting = true;


                await Clients.Group(sessionId).SendAsync("ShowVoting", players);
            }
        }
    }
}