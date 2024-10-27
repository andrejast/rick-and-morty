import { useEffect, useState } from "react";
import { useCharacters } from "../hooks/useCharacters";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loader } from "../components/Loader";
import { toast, ToastContainer } from "react-toastify";
import { Header } from "../components/Header";
import { CharacterCard } from "../components/CharacterCard";

const Characters = () => {
  const [search, setSearch] = useState("");
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useCharacters(search);
  const [isVisible, setIsVisible] = useState(false);
  const [showImage, setShowImage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error("Error fetching characters");
    }
  }, [isError]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowImage(false);
      } else {
        setShowImage(true);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-red-500">
        <Header search={search} setSearch={setSearch} className="!bg-black" />
        <p role="alert" className="text-lg">
          Error fetching characters
        </p>
        <ToastContainer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <Header search={search} setSearch={setSearch} className="!bg-black" />
        <Loader />
      </div>
    );
  }

  return (
    <div
      className={`bg-black min-h-screen transition-opacity duration-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Animated Image */}
      <div
        className={`bg-black fixed top-0 left-0 w-full h-[15vh] sm:h-[20vh] md:h-[30vh] lg:h-[40vh] bg-cover bg-center transition-opacity duration-400 ${
          showImage ? "opacity-100" : "opacity-0"
        }`}
      >
        <img
          src="/images/rick.jpg"
          alt="Header"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main Content */}
      <div
        className={`${
          showImage
            ? "mt-[15vh] sm:mt-[20vh] md:mt-[30vh] lg:mt-[40vh]"
            : "mt-0"
        } transition-all duration-400`}
      >
        <Header
          search={search}
          setSearch={setSearch}
          className="!bg-black sticky top-0 z-10"
        />
        <InfiniteScroll
          dataLength={data?.pages?.length || 0}
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          loader={
            <h2 className="text-lg text-center p-4">
              Loading more characters...
            </h2>
          }
        >
          <div className="grid gap-5 p-4 pt-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {data?.pages.map((page) =>
              page.results.map((character) => {
                return (
                  <CharacterCard character={character} key={character.id} />
                );
              })
            )}
          </div>
        </InfiniteScroll>
        <ToastContainer position="bottom-center" />
      </div>
    </div>
  );
};

export default Characters;
