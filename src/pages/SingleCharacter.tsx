import { useParams, Link } from "react-router-dom";
import { useCharacter } from "../hooks/useSingleCharacter";
import { Heart, Dna, User, MapPin, Tv } from "lucide-react";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { Character } from "../hooks/useCharacters";

export default function SingleCharacter() {
  const [isVisible, setIsVisible] = useState(false);
  const { id } = useParams();
  const { data, isLoading, isError } = useCharacter(id);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        Error fetching character details...
      </div>
    );
  }

  const characterData = data as Character;
  const locationId = characterData.location.url.split("/").pop();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "alive":
        return "text-green-500";
      case "dead":
        return "text-red-500";
      default:
        return "text-yellow-500";
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col lg:flex-row h-screen w-screen overflow-hidden pt-[108.45px]">
        {/* Image Section */}
        <div className="w-full lg:w-1/3 h-[40vh] lg:h-full flex-shrink-0 relative">
          <img
            src={characterData.image}
            alt={characterData.name}
            className="object-fill lg:object-cover object-top w-full h-full"
          />
        </div>

        {/* Content Section */}
        <div
          className={`w-full lg:w-2/3 flex flex-col overflow-y-auto p-6 md:p-8 lg:pl-16 transition-opacity duration-700  ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Title Section */}
          <div className={`lg:mt-20  relative`}>
            <h1 className={`text-6xl xl:text-7xl 2xl:text-[100px] `}>
              <span className="absolute inset-0 blur-sm text-shadow text-[#00b0c8] -z-10">
                {characterData.name}
              </span>
              <span className="text-6xl xl:text-7xl 2xl:text-[100px] text-secondary absolute top-0 left-0">
                {characterData.name}
              </span>
            </h1>
            <p
              className={`text-2xl text-gray-200 my-8 sm:my-12 pt-12 sm:pt-20 ${
                characterData.name.length > 12 && "pt-40"
              }`}
            >
              {characterData.type || characterData.species}
            </p>

            {/* Character Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center">
                <Heart
                  className={`mr-2 ${getStatusColor(characterData.status)}`}
                  size={20}
                />
                <span className="font-medium">Status: </span>
                <span>{characterData.status}</span>
              </div>
              <div className="flex items-center">
                <Dna className="mr-2 text-primary" size={20} />
                <span className="font-medium">Species: </span>
                <span>{characterData.species}</span>
              </div>
              <div className="flex items-center">
                <User className="mr-2 text-secondary" size={20} />
                <span className="font-medium">Gender: </span>
                <span>{characterData.gender}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 text-accent" size={20} />
                <span className="font-medium">Origin: </span>
                <span>{characterData.origin.name}</span>
              </div>
            </div>

            {/* Location */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <MapPin className="mr-2 text-error" size={20} />
                Current Location
              </h3>
              <Link
                to={`/location/${locationId}`}
                className="text-blue-500 hover:underline"
              >
                {characterData.location.name}
              </Link>
            </div>

            {/* Episodes Section */}
            <div>
              <h3 className="text-xl font-semibold mb-8 flex items-center">
                <Tv className="mr-2 text-info" size={20} />
                Episodes
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {characterData.episode.map((episodeUrl: string) => {
                  const episodeId = episodeUrl.split("/").pop();
                  return (
                    <Link
                      key={episodeId}
                      to={`/episode/${episodeId}`}
                      className="btn btn-outline btn-sm hover:bg-secondary"
                    >
                      Episode {episodeId}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
