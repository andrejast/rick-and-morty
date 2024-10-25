import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCharacter } from '../hooks/useSingleCharacter';

const SingleCharacter = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useCharacter(id);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching character details...</div>;

  return (
    <div>
      <h1>{data.name}</h1>
      <img src={data.image} alt={data.name} className="w-full h-auto rounded" />
      <p>Status: {data.status}</p>
      <p>Species: {data.species}</p>
      <p>Gender: {data.gender}</p>

      <h3>Location: <Link to={`/location/${data.location.id}`}>{data.location.name}</Link></h3>

      <h3>Episodes</h3>
      <ul>
        {data.episode.map((episodeUrl: string) => {
          const episodeId = episodeUrl.split('/').pop();
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
