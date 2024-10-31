using Microsoft.AspNetCore.Mvc;
using api.Models;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GameController : ControllerBase
{
    private static readonly List<GameModel> _games = new()
    {
        new GameModel
        {
            Id = 1,
            Name = "The Legend of Zelda: Breath of the Wild",
            Description = "Step into a world of discovery, exploration, and adventure in The Legend of Zelda: Breath of the Wild.",
            Image_url = "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_656/b_white/f_auto/q_auto/ncom/software/switch/70010000000025/7137262b5a64d921e193653f8aa0b722925abc5680380ca0ea12dd11c2dc42b1",
            Metascore = 97,
            CreatedAt = DateTime.Now,
            UpdatedAt = DateTime.Now
        },
        new GameModel
        {
            Id = 2,
            Name = "Red Dead Redemption 2",
            Description = "An epic tale of life in America's unforgiving heartland.",
            Image_url = "https://image.api.playstation.com/vulcan/ap/rnd/202208/0921/dR9KJAKDW2izPbptHQbh3rnj.png",
            Metascore = 97,
            CreatedAt = DateTime.Now,
            UpdatedAt = DateTime.Now
        },
        new GameModel
        {
            Id = 3,
            Name = "God of War Ragnarök",
            Description = "Embark on an epic and heartfelt journey as Kratos and Atreus struggle with holding on and letting go.",
            Image_url = "https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/4xJ8XB3bi888QTLZYdl7Oi0s.png",
            Metascore = 94,
            CreatedAt = DateTime.Now,
            UpdatedAt = DateTime.Now
        },
        new GameModel
        {
            Id = 4,
            Name = "Elden Ring",
            Description = "The Golden Order has been broken. Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring.",
            Image_url = "https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/phvVT0qZfcRms5qDAk0SI3CM.png",
            Metascore = 96,
            CreatedAt = DateTime.Now,
            UpdatedAt = DateTime.Now
        },
        new GameModel
        {
            Id = 5,
            Name = "Super Mario Odyssey",
            Description = "Join Mario on a massive, globe-trotting 3D adventure!",
            Image_url = "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_656/b_white/f_auto/q_auto/ncom/software/switch/70010000001130/c42553b4fd0312c31e70ec7468c6c9bccd739f340152925b9600631f2d29f67f",
            Metascore = 97,
            CreatedAt = DateTime.Now,
            UpdatedAt = DateTime.Now
        }
    };

    // GET: api/game
    [HttpGet]
    public ActionResult<IEnumerable<GameModel>> GetAllGames()
    {
        return Ok(_games);
    }

    // GET: api/game/5
    [HttpGet("{id}")]
    public ActionResult<GameModel> GetGame(int id)
    {
        var game = _games.FirstOrDefault(g => g.Id == id);
        if (game == null)
        {
            return NotFound();
        }
        return Ok(game);
    }

    // POST: api/game
    [HttpPost]
    public ActionResult<GameModel> CreateGame(GameModel game)
    {
        game.Id = _games.Max(g => g.Id) + 1;
        game.CreatedAt = DateTime.Now;
        game.UpdatedAt = DateTime.Now;
        _games.Add(game);
        return CreatedAtAction(nameof(GetGame), new { id = game.Id }, game);
    }

    // PUT: api/game/5
    [HttpPut("{id}")]
    public IActionResult UpdateGame(int id, GameModel game)
    {
        var existingGame = _games.FirstOrDefault(g => g.Id == id);
        if (existingGame == null)
        {
            return NotFound();
        }

        existingGame.Name = game.Name;
        existingGame.Description = game.Description;
        existingGame.Image_url = game.Image_url;
        existingGame.Metascore = game.Metascore;
        existingGame.UpdatedAt = DateTime.Now;

        return NoContent();
    }

    // DELETE: api/game/5
    [HttpDelete("{id}")]
    public IActionResult DeleteGame(int id)
    {
        var game = _games.FirstOrDefault(g => g.Id == id);
        if (game == null)
        {
            return NotFound();
        }

        _games.Remove(game);
        return NoContent();
    }

    // GET: api/game/search?name=zelda
    [HttpGet("search")]
    public ActionResult<IEnumerable<GameModel>> SearchGames([FromQuery] string? name)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            return Ok(_games);
        }

        var games = _games.Where(g =>
            g.Name.Contains(name, StringComparison.OrdinalIgnoreCase));
        return Ok(games);
    }
}