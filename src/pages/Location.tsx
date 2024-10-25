import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLocation } from '../hooks/useLocation';

const Location = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useLocation(id);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching location details...</div>;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>Type: {data.type}</p>
      <p>Dimension: {data.dimension}</p>

      <h3>Residents</h3>
      <ul>
        {data.residents.map((residentUrl: string) => {
          const residentId = residentUrl.split('/').pop();
          return (
            <li key={residentId}>
              <Link to={`/characters/${residentId}`}>Character {residentId}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Location;
