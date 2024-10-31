using api.Models;

namespace api.Services;

public interface IGameSearchService
{
    IEnumerable<GameModel> Search(IEnumerable<GameModel> games, string searchQuery, double similarityThreshold = 50.0);
}

public class GameSearchService : IGameSearchService
{
    private const double NameWeight = 1.0;
    private const double DescriptionWeight = 0.7;

    public IEnumerable<GameModel> Search(IEnumerable<GameModel> games, string searchQuery, double similarityThreshold = 60.0)
    {
        if (string.IsNullOrWhiteSpace(searchQuery))
        {
            return games;
        }

        var searchTerms = searchQuery.ToLower().Split(' ', StringSplitOptions.RemoveEmptyEntries);

        var searchResults = games
            .Select(game => new
            {
                Game = game,
                Relevance = CalculateRelevanceScore(game, searchTerms, similarityThreshold)
            })
            .Where(result => result.Relevance > similarityThreshold)
            .OrderByDescending(result => result.Relevance)
            .Select(result => result.Game)
            .ToList();

        return searchResults;
    }

    private double CalculateRelevanceScore(GameModel game, string[] searchTerms, double threshold)
    {
        // Normalize strings for comparison
        var gameTitle = game.Name.ToLower();
        var gameDescription = game.Description?.ToLower() ?? "";

        return searchTerms.Max(term =>
        {
            if (term.Length <= 0) return 0; // Skip very short terms

            // Exact matches in title get highest priority
            if (gameTitle.Contains(term, StringComparison.OrdinalIgnoreCase))
            {
                return 100;
            }

            double maxScore = 0;

            // Check title words
            var titleWords = gameTitle.Split(' ', StringSplitOptions.RemoveEmptyEntries);
            foreach (var word in titleWords)
            {
                var similarity = CalculateSimilarity(term, word) * NameWeight;
                maxScore = Math.Max(maxScore, similarity);
            }

            // If we have a good title match, return it
            if (maxScore >= threshold)
            {
                return maxScore;
            }

            // Check description
            var descriptionWords = gameDescription
                .Split(' ', StringSplitOptions.RemoveEmptyEntries)
                .Where(w => w.Length > 3);

            foreach (var word in descriptionWords)
            {
                var similarity = CalculateSimilarity(term, word) * DescriptionWeight;
                maxScore = Math.Max(maxScore, similarity);
            }

            return maxScore;
        });
    }

    private double CalculateSimilarity(string source, string target)
    {
        if (string.IsNullOrEmpty(source) || string.IsNullOrEmpty(target))
            return 0;

        var distance = LevenshteinDistance(source, target);
        var maxLength = Math.Max(source.Length, target.Length);
        return (1.0 - ((double)distance / maxLength)) * 100;
    }

    private int LevenshteinDistance(string source, string target)
    {
        var matrix = new int[source.Length + 1, target.Length + 1];

        // First row and column initialization
        for (var i = 0; i <= source.Length; matrix[i, 0] = i++) { }
        for (var j = 0; j <= target.Length; matrix[0, j] = j++) { }

        // Fill the rest of the matrix
        for (var i = 1; i <= source.Length; i++)
        {
            for (var j = 1; j <= target.Length; j++)
            {
                var cost = (target[j - 1] == source[i - 1]) ? 0 : 1;
                matrix[i, j] = Math.Min(
                    Math.Min(matrix[i - 1, j] + 1, matrix[i, j - 1] + 1),
                    matrix[i - 1, j - 1] + cost);
            }
        }

        return matrix[source.Length, target.Length];
    }
}