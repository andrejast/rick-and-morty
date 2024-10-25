import React, { useState } from "react";
import { useCharacters } from "../hooks/useCharacters";
import { Link, useNavigate } from "react-router-dom"; // Import Link
import InfiniteScroll from "react-infinite-scroll-component";
import { useAuth } from "../context/AuthContext";

const Characters = () => {
  const [search, setSearch] = useState("");
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useCharacters(search);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const { setToken } = useAuth(); // Uvezi setToken iz AuthContext
  const navigate = useNavigate(); // Inicijalizuj navigate

  const handleLogout = () => {
    localStorage.removeItem('token'); // Ukloni token iz localStorage
    setToken(null); // Postavi token u AuthContext na null
    navigate('/login'); // Preusmeri na login stranicu
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching characters...</div>;

  return (
    <div>
      <h1>Rick and Morty Characters</h1>
      <button onClick={handleLogout} className="logout-button">Logout</button>
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search characters..."
        className="p-2 border border-gray-300 rounded mb-4"
        autoFocus
      />

      <InfiniteScroll
        dataLength={data?.pages?.length || 0}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<h4>Loading more characters...</h4>}
      >
        <div className="grid grid-cols-6 gap-4">
          {data?.pages.map((page) =>
            page.results.map((character: any) => (
              <Link to={`/characters/${character.id}`} key={character.id}>
                <div className="border p-4 rounded shadow">
                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-full h-auto rounded"
                  />
                  <h3 className="text-lg font-bold">{character.name}</h3>
                  <p>Status: {character.status}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Characters;
