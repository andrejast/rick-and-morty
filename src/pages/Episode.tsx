import React from "react";
import { useParams } from "react-router-dom";
import { useEpisode, useEpisodeCharacters } from "../hooks/useEpisode";
import { Link } from "react-router-dom";

const Episode = () => {
  const { id } = useParams();
  const { data: episode, isLoading, isError } = useEpisode(id);

  const {
    data: characters,
    isLoading: isLoadingCharacters,
    isError: isErrorCharacters,
  } = useEpisodeCharacters(
    episode?.characters || []
  );

  if (isLoading || isLoadingCharacters) return <div>Loading...</div>;
  if (isError || isErrorCharacters)
    return <div>Error loading episode or characters...</div>;

  return (
    <div>
      <h1>{episode?.name}</h1>
      <p>Air Date: {episode?.air_date}</p>
      <p>Episode: {episode?.episode}</p>

      <h3>Characters</h3>
      <div className="grid grid-cols-2 gap-4">
        {characters?.map((character) => (
          <Link to={`/characters/${character.id}`}>
            <div key={character.id} className="border p-4 rounded shadow">
              <img
                src={character.image}
                alt={character.name}
                className="max-w-96 w-full h-auto rounded"
              />
              <h3 className="text-lg font-bold">{character.name}</h3>
              <p>Status: {character.status}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Episode;
