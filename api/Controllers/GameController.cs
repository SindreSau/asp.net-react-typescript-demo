using Microsoft.AspNetCore.Mvc;
using api.Models;
using api.Services;
using Microsoft.AspNetCore.Cors;

namespace api.Controllers;

[ApiController]
[EnableCors("AllowReactApp")]
[Route("api/[controller]")]
public class GameController : ControllerBase
{
    private readonly IGameSearchService _searchService;

    private static readonly List<GameModel> _games = new()
    {
        new GameModel
        {
            Id = 1,
            Name = "The Legend of Zelda: Breath of the Wild",
            Description =
                "Step into a world of discovery, exploration, and adventure in The Legend of Zelda: Breath of the Wild.",
            Image_url =
                "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000000025/7137262b5a64d921e193653f8aa0b722925abc5680380ca0e18a5cfd91697f58",
            Metascore = 97,
            CreatedAt = DateTime.Now,
            UpdatedAt = DateTime.Now
        },
        new GameModel
        {
            Id = 2,
            Name = "Red Dead Redemption 2",
            Description = "An epic tale of life in America's unforgiving heartland.",
            Image_url =
                "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1174180/capsule_616x353.jpg?t=1720558643",
            Metascore = 97,
            CreatedAt = DateTime.Now,
            UpdatedAt = DateTime.Now
        },
        new GameModel
        {
            Id = 3,
            Name = "God of War Ragnarök",
            Description =
                "Embark on an epic and heartfelt journey as Kratos and Atreus struggle with holding on and letting go.",
            Image_url = "https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/4xJ8XB3bi888QTLZYdl7Oi0s.png",
            Metascore = 94,
            CreatedAt = DateTime.Now,
            UpdatedAt = DateTime.Now
        },
        new GameModel
        {
            Id = 4,
            Name = "Elden Ring",
            Description =
                "The Golden Order has been broken. Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring.",
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
            Image_url =
                "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000001130/c42553b4fd0312c31e70ec7468c6c9bccd739f340152925b9600631f2d29f8b5",
            Metascore = 97,
            CreatedAt = DateTime.Now,
            UpdatedAt = DateTime.Now
        },
        new GameModel
        {
            Id = 6,
            Name = "Cyberpunk 2077",
            Description = "Cyberpunk 2077 is an open-world, action-adventure story set in Night City.",
            Image_url =
                "https://image.api.playstation.com/vulcan/ap/rnd/202311/2812/ae84720b553c4ce943e9c342621b60f198beda0dbf533e21.jpg",
            Metascore = 76,
            CreatedAt = DateTime.Now,
            UpdatedAt = DateTime.Now
        },
        new GameModel
        {
            Id = 7,
            Name = "Fallout 76",
            Description =
                "Bethesda Game Studios welcomes you to Fallout 76, the online prequel where every surviving human is a real person.",
            Image_url =
                "https://cdn-ext.fanatical.com/production/product/1280x720/db6b6224-c847-4927-b31e-553a69ecf50f.jpeg",
            Metascore = 52,
            CreatedAt = DateTime.Now,
            UpdatedAt = DateTime.Now
        },
        new GameModel
        {
            Id = 9,
            Name = "Stardew Valley",
            Description =
                "You've inherited your grandfather's old farm plot in Stardew Valley. Armed with hand-me-down tools and a few coins, you set out to begin your new life.",
            Image_url =
                "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/413150/capsule_616x353.jpg?t=1711128146",
            Metascore = 89,
            CreatedAt = DateTime.Now,
            UpdatedAt = DateTime.Now
        },
        new GameModel
        {
            Id = 10,
            Name = "Anthem",
            Description =
                "Anthem is a shared-world action-RPG where players delve into a vast world teeming with amazing technology and forgotten treasures.",
            Image_url =
                "https://media.contentapi.ea.com/content/dam/eacom/en-us/migrated-images/2017/06/anthem-dylan.jpg.adapt.crop191x100.1200w.jpg",
            Metascore = 45,
            CreatedAt = DateTime.Now,
            UpdatedAt = DateTime.Now
        }
    };

    public GameController(IGameSearchService searchService)
    {
        _searchService = searchService;
    }

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

    [HttpGet("search")]
    public ActionResult<IEnumerable<GameModel>> SearchGames([FromQuery] string? query)
    {
        if (query == null) return BadRequest();
        var results = _searchService.Search(_games, query);
        return Ok(results);
    }
}