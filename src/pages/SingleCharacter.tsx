import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCharacter } from '../hooks/useSingleCharacter';

const SingleCharacter = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useCharacter(id);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching character details...</div>;

  // Parsiraj ID iz URL-a lokacije
  const locationId = data.location.url.split('/').pop();

  return (
    <div>
      <h1>{data.name}</h1>
      <img src={data.image} alt={data.name} className="max-w-96 w-full h-auto rounded" />
      <p>Status: {data.status}</p>
      <p>Species: {data.species}</p>
      <p>Gender: {data.gender}</p>

      {/* Dodaj parsirani ID za lokaciju */}
      <h3>
        Location: <Link to={`/location/${locationId}`}>{data.location.name}</Link>
      </h3>

      <h3>Episodes</h3>
      <ul>
        {data.episode.map((episodeUrl: string) => {
          const episodeId = episodeUrl.split('/').pop(); // Parsiranje ID-ja iz URL-a epizode
          return (
            <li key={episodeId}>
              <Link to={`/episode/${episodeId}`}>Episode {episodeId}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SingleCharacter;
