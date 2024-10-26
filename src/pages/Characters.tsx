import React, { useState } from "react";
import { useCharacters } from "../hooks/useCharacters";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
// import Pulse from "../components/Pulse";
import Header from "../components/Header";

const Characters = () => {
  const [search, setSearch] = useState("");
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useCharacters(search);


  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching characters...</div>;

  return (
    <div className="bg-[#1a1a1a]">
      <Header search={search} setSearch={setSearch}/>
      {/* <Pulse>
      <img src="images/rm.png" alt="" className="scale-75" />
      </Pulse> */}



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
