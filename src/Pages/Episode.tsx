import { useParams } from "react-router-dom";
import { useEpisode, useMultipleCharacters } from "../hooks/useEpisode";
import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { Loader } from "../components/Loader";
import { Header } from "../components/Header";
import { CharacterCard } from "../components/CharacterCard";
import { EpisodeCard } from "../components/EpisodeCard";

const Episode = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { id } = useParams();
  const { data: episode, isLoading, isError } = useEpisode(id);

  const {
    data: characters,
    isLoading: isLoadingCharacters,
    isError: isErrorCharacters,
  } = useMultipleCharacters(episode?.characters || []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isErrorCharacters || isError) {
      toast("Error fetching characters");
    }
  }, [isErrorCharacters, isError]);

  if (isErrorCharacters) {
    return (
      <div className="flex justify-center items-center h-svh bg-black">
        <Header className="!bg-black" />
        <p className="text-error">Error fetching characters</p>
        <ToastContainer />
      </div>
    );
  }

  if (isLoadingCharacters || isLoading) {
    return (
      <div className="flex justify-center items-center h-svh bg-black">
        <Header className="!bg-black" />
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Header className="!bg-black bg-opacity-100" />
      <div
        className={`hidden md:!flex flex-col lg:flex-row h-screen w-screen overflow-hidden pt-10 bg-black    ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Image Section */}
        <div className="w-full lg:w-2/5 h-[40vh] lg:h-full flex-shrink-0 relative mt-24  bg-black">
          <img
            src="/images/locations.png"
            alt="Series"
            className="object-contain xl:object-cover object-center w-full h-full"
          />
        </div>

        {/* Content Section */}
        <div
          className={`w-full lg:w-3/5 flex flex-col overflow-y-auto px-6 md:px-8 lg:pl-16 transition-opacity duration-700 pt-8 bg-black  ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Title Section */}
          <div className={`lg:mt-20  relative`}>
            <h1 className={`text-6xl xl:text-7xl 2xl:text-[100px] -pt-32`}>
              <span className="absolute inset-0 blur-sm text-shadow text-primary z- 0">
                Episode
              </span>
              <span className="text-6xl xl:text-7xl 2xl:text-[100px] text-secondary absolute top-0 left-0">
                Episode
              </span>
            </h1>

            <div className="flex flex-col gap-6 mt-32 relative z-10">
              <div className="max-w-40">
                <EpisodeCard episode={episode!} />
              </div>
              <h2 className="text-3xl text-gray-100">{episode?.name}</h2>
              <p className={`text-2xl text-gray-200`}>
                Air Date: {episode?.air_date}
              </p>
              <p className={`text-xl text-gray-300`}>
                Episode: {episode?.episode}
              </p>

              {/* Episodes Section */}
              <div>
                <h3 className="text-xl font-semibold mb-8 flex items-center">
                  <Users className="mr-2 text-error" size={20} />
                  <span className="text-lg text-gray-400">Characters</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-5 p-4">
                  {characters?.map((character) => (
                    <CharacterCard character={character} key={character.id} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Small screen */}
      <div
        className={`flex lg:!hidden flex-col h-screen w-screen overflow-hidden pt-10 bg-black ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col flex-grow overflow-y-auto">
          {/* Image Section */}
          <div className="w-full h-auto flex-shrink-0 relative mt-24">
            <img
              src="/images/locations.png"
              alt="Series"
              className="object-contain xl:object-cover object-center w-full h-full"
            />
          </div>

          {/* Content Section */}
          <div
            className={`w-full flex flex-col px-6 md:px-8 lg:pl-16 transition-opacity duration-700 pt-8 bg-black ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Title Section */}
            <div className={`lg:mt-20 relative`}>
              <h1 className={`text-6xl xl:text-7xl 2xl:text-[100px] -pt-32`}>
                <span className="absolute inset-0 blur-sm text-shadow text-[#00b0c8] z-0">
                  Episode
                </span>
                <span className="text-6xl xl:text-7xl 2xl:text-[100px] text-secondary absolute top-0 left-0">
                  Episode
                </span>
              </h1>

              <div className="flex flex-col gap-6 mt-32 relative z-10">
                <div className="max-w-40">
                  <EpisodeCard episode={episode!} />
                </div>
                <h2 className="text-3xl text-gray-100">{episode?.name}</h2>
                <p className={`text-2xl text-gray-200`}>
                  Air Date: {episode?.air_date}
                </p>
                <p className={`text-xl text-gray-300`}>
                  Episode: {episode?.episode}
                </p>

                {/* Characters Section */}
                <div>
                  <h3 className="text-xl font-semibold mb-8 flex items-center">
                    <Users className="mr-2 text-error" size={20} />
                    <span className="text-lg text-gray-400">Characters</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 p-4">
                    {characters?.map((character) => (
                      <CharacterCard character={character} key={character.id} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Episode;
