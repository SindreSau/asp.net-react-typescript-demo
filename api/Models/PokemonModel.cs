using System.ComponentModel.DataAnnotations;

namespace api.Models;

public class GameModel
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Image_url { get; set; } = "https://via.placeholder.com/150";
    [Range(0, 100)]
    public int Metascore { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}