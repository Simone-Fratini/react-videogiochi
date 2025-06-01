import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const GameDetail = () => {
  const { slug } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8000/api/games/${slug}`);
        if (!response.ok) {
          throw new Error('Game not found');
        }
        const data = await response.json();
        setGame(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">
        Error: {error}
      </div>
    );
  }

  if (!game) {
    return (
      <div className="text-center">
        Game not found
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative h-96 mb-8">
        <img
          src={game.background_image || '/placeholder-image.jpg'}
          alt={game.name}
          className="w-full h-full object-cover rounded-lg"
        />
        {game.rating && (
          <div className="absolute bottom-4 right-4 bg-purple-600 text-white px-4 py-2 rounded-lg text-xl">
            {Number(game.rating).toFixed(1)} ⭐
          </div>
        )}
      </div>

      <h1 className="text-4xl font-bold mb-4">{game.name}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Details</h2>
          <div className="space-y-2">
            {game.released && (
              <p><span className="text-gray-400">Released:</span> {new Date(game.released).toLocaleDateString()}</p>
            )}
            {game.playtime !== undefined && (
              <p><span className="text-gray-400">Playtime:</span> {game.playtime} hours</p>
            )}
            {game.metacritic && (
              <p><span className="text-gray-400">Metacritic:</span> {game.metacritic}</p>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Platforms</h2>
          <div className="flex flex-wrap gap-2">
            {game.platforms?.map((platform) => (
              <span
                key={platform.id}
                className="bg-gray-700 px-3 py-1 rounded"
              >
                {platform.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Genres</h2>
        <div className="flex flex-wrap gap-2">
          {game.genres?.map((genre) => (
            <span
              key={genre.id}
              className="bg-gray-700 px-3 py-1 rounded"
            >
              {genre.name}
            </span>
          ))}
        </div>
      </div>

      {game.description && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Description</h2>
          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: game.description }}
          />
        </div>
      )}

      {game.tags?.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {game.tags.map((tag) => (
              <span
                key={tag.id}
                className="bg-gray-700 px-3 py-1 rounded"
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameDetail; 