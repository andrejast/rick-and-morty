import { useParams, Link } from "react-router-dom";
import { useCharacter } from "../hooks/useSingleCharacter";
import { Dna, MapPin, Tv, HelpCircle, Earth, Skull } from "lucide-react";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { Icons } from "../components/Icons";
import Lottie from "lottie-react";
import heartBeat from "../lotties/heart-beat.json";
import { Loader } from "../components/Loader";
import { ICharacter } from "../types/types";

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
        <Header />
        <Loader />
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

  const characterData = data as ICharacter;
  const locationId = characterData.location.url.split("/").pop();

  const getStatusInfo = (status: string) => {
    switch (status.toLowerCase()) {
      case "alive":
        return { color: "text-green-500", icon: null };
      case "dead":
        return { color: "text-red-500", icon: Skull };
      default:
        return { color: "text-gray-50", icon: HelpCircle };
    }
  };

  const { color, icon: Icon } = getStatusInfo(characterData.status);

  const getGenderIcon = (gender: string) => {
    switch (gender.toLowerCase()) {
      case "male":
        // eslint-disable-next-line react/jsx-pascal-case
        return <Icons.male className="w-5 h-5 mr-2" />;
      case "female":
        // eslint-disable-next-line react/jsx-pascal-case
        return <Icons.female className="w-5 h-5 mr-2" />;

      default:
        return <HelpCircle className="w-5 h-5 mr-2" />;
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
                {characterData.status.toLowerCase() === "alive" ? (
                  <div className="w-8 h-8 -ml-2 mr-1">
                    <Lottie animationData={heartBeat} loop={true} />
                  </div>
                ) : Icon ? (
                  <Icon className={`w-5 h-5 mr-2 ${color}`} />
                ) : null}
                <span className="font-medium">Status:&nbsp; </span>
                <span>{characterData.status}</span>
              </div>
              <div className="flex items-center">
                <Dna className="mr-2 text-primary" size={20} />
                <span className="font-medium">Species:&nbsp; </span>
                <span>{characterData.species}</span>
              </div>
              <div className="flex items-center">
                {getGenderIcon(characterData.gender)}
                <span className="font-medium">Gender:&nbsp; </span>
                <span>{characterData.gender}</span>
              </div>
              <div className="flex items-center">
                <Earth className="mr-2 text-secondary" size={20} />
                <span className="font-medium">Origin:&nbsp; </span>
                <span>{characterData.origin.name}</span>
              </div>
            </div>

            {/* Location */}
            <div className="mb-8">
              <Link
                to={`/location/${locationId}`}
                className="hover:text-secondary "
              >
                <h3 className="text-xl font-semibold flex items-center">
                  <MapPin
                    className="mr-2 text-error hover:!text-error"
                    size={20}
                  />
                  <span>Current Location</span>
                </h3>
                <span className="ml-7">{characterData.location.name}</span>
              </Link>
            </div>

            {/* Episodes Section */}
            <div>
              <h3 className="text-xl font-semibold mb-8 flex items-center">
                <Tv className="mr-2" size={20} />
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
