import React, { useEffect, useState } from "react";
import { useCharacters } from "../hooks/useCharacters";
import InfiniteScroll from "react-infinite-scroll-component";
import Header from "../components/Header";
import CharacterCard from "../components/rick-and-morty/Card";

const Characters = () => {
  const [search, setSearch] = useState("");
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useCharacters(search);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching characters...</div>;

  return (
    <div
      className={`bg-[#000] transition-opacity duration-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <Header search={search} setSearch={setSearch} className="!bg-[#000000]" />
      <InfiniteScroll
        dataLength={data?.pages?.length || 0}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<h4>Loading more characters...</h4>}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 pt-32 gap-5 p-4">
          {data?.pages.map((page) =>
            page.results.map((character: any) => (
              <CharacterCard character={character} />
            ))
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Characters;
