import React, { useState } from 'react';
import { useCharacters } from '../hooks/useCharacters';
import InfiniteScroll from 'react-infinite-scroll-component';

const Characters = () => {
  const [search, setSearch] = useState('');
  const { data, fetchNextPage, hasNextPage, isLoading, isError } = useCharacters(search);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching characters...</div>;

  return (
    <div>
      <h1>Rick and Morty Characters</h1>
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search characters..."
        className="p-2 border border-gray-300 rounded mb-4"
      />

      <InfiniteScroll
        dataLength={data?.pages?.length || 0}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<h4>Loading more characters...</h4>}
      >
        <div className="grid grid-cols-3 gap-4">
          {data?.pages.map((page) =>
            page.results.map((character: any) => (
              <div key={character.id} className="border p-4 rounded shadow">
                <img src={character.image} alt={character.name} className="w-full h-auto rounded" />
                <h3 className="text-lg font-bold">{character.name}</h3>
                <p>Status: {character.status}</p>
              </div>
            ))
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Characters;
