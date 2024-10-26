import { useParams } from "react-router-dom";
import { useEpisode, useEpisodeCharacters } from "../hooks/useEpisode";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import CharacterCard from "../components/rick-and-morty/Card";
import { Users } from "lucide-react";

const Episode = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { id } = useParams();
  const { data: episode, isLoading, isError } = useEpisode(id);

  const {
    data: characters,
    isLoading: isLoadingCharacters,
    isError: isErrorCharacters,
  } = useEpisodeCharacters(episode?.characters || []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading || isLoadingCharacters) return <div>Loading...</div>;
  if (isError || isErrorCharacters)
    return <div>Error loading episode or characters...</div>;
  return (
    <>
      <Header className="!bg-[#000000] bg-opacity-100" />
      <div
        className={`flex flex-col lg:flex-row h-screen w-screen overflow-hidden pt-[108.45px]  bg-[#000000]    ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Image Section */}
        <div className="w-full lg:w-1/3 h-[40vh] lg:h-full flex-shrink-0 relative  bg-[#000000]">
          <img
            src="/images/series3.png"
            alt="Series"
            className="object-contain xl:object-cover object-center w-full h-full"
          />
        </div>

        {/* Content Section */}
        <div
          className={`w-full lg:w-2/3 flex flex-col overflow-y-auto px-6 md:px-8 lg:pl-16 transition-opacity duration-700 bg-[#000000]  ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Title Section */}
          <div className={`lg:mt-20  relative`}>
            <h1 className={`text-6xl xl:text-7xl 2xl:text-[100px] -pt-32`}>
              <span className="absolute inset-0 blur-sm text-shadow text-[#00b0c8] z- 0">
                Series
              </span>
              <span className="text-6xl xl:text-7xl 2xl:text-[100px] text-secondary absolute top-0 left-0">
                Series
              </span>
            </h1>

            <div className="flex flex-col gap-6 mt-32">
              <h2 className="text-3xl">{episode?.name}</h2>
              <p className={`text-2xl text-gray-200`}>
                Air Date: {episode?.air_date}
              </p>
              <p className={`text-2xl text-gray-200`}>
                Episode: {episode?.episode}
              </p>

              {/* Episodes Section */}
              <div>
                <h3 className="text-xl font-semibold mb-8 flex items-center">
                  <Users className="mr-2 text-error" size={20} />
                  Characters
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 p-4">
                  {characters?.map((character) => (
                    <CharacterCard character={character} />
                  ))}
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
