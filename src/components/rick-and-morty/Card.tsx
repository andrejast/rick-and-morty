import { Link } from "react-router-dom";
import { HelpCircle, Skull } from "lucide-react";
import Lottie from "lottie-react";
import heartBeat from "../../lotties/heart-beat.json";
import { useEffect, useRef, useState } from "react";
import { ICharacter } from "../../types/types";

interface StatusInfo {
  color: string;
  icon: React.ElementType | null;
}

interface CharacterCardProps {
  character: ICharacter;
}

export default function CharacterCard({ character }: CharacterCardProps) {
  const getStatusInfo = (status: string): StatusInfo => {
    switch (status.toLowerCase()) {
      case "alive":
        return { color: "text-green-500", icon: null };
      case "dead":
        return { color: "text-red-500", icon: Skull };
      default:
        return { color: "text-gray-50", icon: HelpCircle };
    }
  };

  const [isVisible, setIsVisible] = useState(false);
  const { color, icon: Icon } = getStatusInfo(character.status);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentSection = cardRef.current;
    const threshold = 0.2;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  return (
    <Link
      to={`/characters/${character.id}`}
      className={`block transition-all duration-700 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div
        ref={cardRef}
        className="card max-h-96 bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-200 overflow-hidden transform hover:scale-105 hover:text-gray-100"
      >
        <figure>
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
          </div>
        </div>
      </div>
    </Link>
  );
}
