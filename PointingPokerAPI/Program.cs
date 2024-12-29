using PointingPokerAPI.Hub;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSignalR();

builder.Services.AddSpaStaticFiles(configuration =>
{
    configuration.RootPath = "ClientSide/frontend/build";
});

var app = builder.Build();

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseSpaStaticFiles();

app.UseAuthorization();

app.MapControllers();

app.UseSpa(spa =>
{
    spa.Options.SourcePath = "ClientSide/frontend";
});

app.MapHub<PointingPokerHub>("/pointingPokerHub");

app.Run();
