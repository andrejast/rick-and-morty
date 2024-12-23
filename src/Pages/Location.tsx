import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Users } from "lucide-react";
import { toast } from "react-toastify";
import { Loader } from "../components/Loader";
import { CharacterCard } from "../components/CharacterCard";
import { Header } from "../components/Header";
import { useLocation } from "../hooks/useLocation";
import { useMultipleCharacters } from "../hooks/useMultipleCharacters";

const Location = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { id } = useParams();
  const { data, isLoading, isError } = useLocation(id);

  const {
    data: characters,
    isLoading: isLoadingResidents,
    isError: isErrorResidents,
  } = useMultipleCharacters(data?.residents || []);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error("Error fetching location");
    }

    if (isErrorResidents) {
      toast.error("Error fetching location residents");
    }
  }, [isErrorResidents, isError]);

  if (isError || isErrorResidents) {
    return (
      <>
        <Header className="!bg-[#000000]" />
        <div className="flex justify-center items-center h-svh bg-[#000000]">
          <p className="text-error">Error fetching occured</p>
        </div>
      </>
    );
  }

  if (isLoading || isLoadingResidents) {
    return (
      <div className="flex justify-center items-center h-svh bg-[#000000]">
        <Header className="!bg-[#000000]" />
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Header className="!bg-[#000000] bg-opacity-100" />

      <div
        className={`hidden lg:!flex flex-col lg:flex-row h-screen w-screen overflow-hidden pt-10 bg-[#000000] ${
          isVisible ? "opacity-100" : "opacity-0"
        } `}
      >
        {/* Image Section */}
        <div className="w-full lg:w-2/5 h-[40vh] lg:h-full flex-shrink-0 relative mt-24 pb-10 bg-[#000000] overflow-auto">
          <img
            src="/images/episodes2.webp"
            alt="Series"
            className="object-contain object-center w-full h-full"
          />
        </div>

        {/* Content Section */}
        <div
          className={`w-full lg:w-3/5 flex flex-col overflow-y-auto px-6 md:px-8 lg:pl-16 transition-opacity duration-700 pt-8 bg-[#000000] ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Title Section */}
          <div className={`lg:mt-20 relative`}>
            <h1 className={`text-6xl xl:text-7xl 2xl:text-[100px]`}>
              <span className="absolute inset-0 blur-sm text-shadow text-[#00b0c8] z-0">
                Location
              </span>
              <span className="text-6xl xl:text-7xl 2xl:text-[100px] text-secondary absolute top-0 left-0">
                Location
              </span>
            </h1>

            <div className="flex flex-col gap-6 mt-32 z-10 relative">
              <h2 className="text-3xl text-gray-100">{data?.name}</h2>
              <p className={`text-2xl text-gray-200`}>Type: {data.type}</p>
              <p className={`text-xl text-gray-300`}>
                Dimension: {data.dimension}
              </p>

              {/* Episodes Section */}
              <div>
                <h3 className="text-xl font-semibold mb-8 flex items-center">
                  <Users className="mr-2 text-error" size={20} />
                  <span className="text-lg text-gray-400">Residents</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-5 p-4">
                {!isErrorResidents ? (
                      characters?.map((character) => (
                        <CharacterCard
                          character={character}
                          key={character.id}
                        />
                      ))
                    ) : (
                      <p className="text-error">
                        Error fetching episode characters
                      </p>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* small screen */}
      <div
        className={`flex lg:!hidden flex-col h-screen w-screen overflow-hidden bg-[#000000] ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Scrollable Container */}
        <div className="flex flex-col flex-grow overflow-y-auto pt-10">
          {/* Image Section */}
          <div className="w-full h-auto flex-shrink-0 relative pb-10 mt-[108px] bg-[#000000]">
            <img
              src="/images/episodes2.webp"
              alt="Series"
              className="object-contain object-center w-full h-full"
            />
          </div>

          {/* Content Section */}
          <div className="flex flex-col px-6 md:px-8 lg:pl-16 transition-opacity duration-700 pt-8 bg-[#000000]">
            {/* Title Section */}
            <div className={`lg:mt-20 relative`}>
              <h1 className={`text-6xl xl:text-7xl 2xl:text-[100px]`}>
                <span className="absolute inset-0 blur-sm text-shadow text-[#00b0c8] z-0">
                  Location
                </span>
                <span className="text-6xl xl:text-7xl 2xl:text-[100px] text-secondary absolute top-0 left-0">
                  Location
                </span>
              </h1>

              <div className="flex flex-col gap-6 mt-32 z-10 relative">
                <h2 className="text-3xl text-gray-100">{data?.name}</h2>
                <p className={`text-2xl text-gray-200`}>Type: {data.type}</p>
                <p className={`text-xl text-gray-300`}>
                  Dimension: {data.dimension}
                </p>

                {/* Episodes Section */}
                <div>
                  <h3 className="text-xl font-semibold mb-8 flex items-center">
                    <Users className="mr-2 text-error" size={20} />
                    <span className="text-lg text-gray-400">Residents</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 p-4">
                  {!isErrorResidents ? (
                      characters?.map((character) => (
                        <CharacterCard
                          character={character}
                          key={character.id}
                        />
                      ))
                    ) : (
                      <p className="text-error">
                        Error fetching episode characters
                      </p>
                    )}
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

export default Location;
