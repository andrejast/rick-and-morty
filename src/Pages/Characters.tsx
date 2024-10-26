import { useEffect, useState } from "react";
import { useCharacters } from "../hooks/useCharacters";
import InfiniteScroll from "react-infinite-scroll-component";
import Header from "../components/Header";
import CharacterCard from "../components/rick-and-morty/Card";
import { Loader } from "../components/Loader";
import { toast, ToastContainer } from "react-toastify";

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

  useEffect(() => {
    if (isError) {
      toast("Error fetching characters");
    }
  }, [isError]);

  if (isError) {
    return (
      <div className="flex justify-center items-center h-svh bg-[#000000]">
        <Header
          search={search}
          setSearch={setSearch}
          className="!bg-[#000000]"
        />
        <p className="text-error">Error fetching characters</p>
        <ToastContainer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-svh bg-[#000000]">
        <Header
          search={search}
          setSearch={setSearch}
          className="!bg-[#000000]"
        />
        <Loader />
      </div>
    );
  }

  return (
    <div
      className={`bg-[#000] transition-opacity duration-700 min-h-svh ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <Header search={search} setSearch={setSearch} className="!bg-[#000000]" />
      <InfiniteScroll
        dataLength={data?.pages?.length || 0}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<h2 className="text-lg">Loading more characters...</h2>}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 pt-32 gap-5 p-4">
          {data?.pages.map((page) =>
            page.results.map((character: any) => (
              <CharacterCard character={character} key={character.id} />
            ))
          )}
        </div>
      </InfiniteScroll>
      <ToastContainer />
    </div>
  );
};

export default Characters;
