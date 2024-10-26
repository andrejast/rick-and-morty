import { Link } from "react-router-dom";
import { Character } from "../../hooks/useCharacters";
import { HelpCircle, Skull } from "lucide-react";
import Lottie from "lottie-react";
import heartBeat from "../../lotties/heart-beat.json";

interface CardProps {
  character: Character;
}

export default function CharacterCard({ character }: CardProps) {
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

  const { color, icon: Icon } = getStatusInfo(character.status);

  return (
    <Link to={`/characters/${character.id}`} className="block">
      <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-200 overflow-hidden transform hover:scale-105 hover:text-gray-100">
        <figure className="">
          <img
            src={character.image}
            alt={character.name}
            className="w-full h-auto transition-transform duration-300 hover:scale-110"
          />
        </figure>
        <div className="card-body p-4 relative">
          <h3 className="card-title text-xl font-semibold">{character.name}</h3>
          <p className="text-sm text-base-content/70">
            {character.gender} • {character.species}
          </p>
          <p className="text-sm text-base-content/70">Last known location:</p>
          <p className="text-sm font-semibold truncate text-base-content/70">
            {character.location.name}
          </p>
          <div className="absolute top-4 right-4 flex items-center gap-1">
            {character.status.toLowerCase() === "alive" ? (
              <div className="w-6 h-6">
                <Lottie animationData={heartBeat} loop={true} />
              </div>
            ) : Icon ? (
              <Icon className={`w-5 h-5 mt-1 ${color}`} />
            ) : null}
            {/* <span className="capitalize">{character.status}</span> */}
          </div>
        </div>
      </div>
    </Link>
  );
}
