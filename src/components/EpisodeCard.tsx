import { Link } from "react-router-dom";
import { IEpisode } from "../types/types";
import { useState } from "react";

interface EpisodeCardProps {
  episode: IEpisode;
}

export const EpisodeCard = ({ episode }: EpisodeCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const seasonMatch = episode.episode.match(/S(\d{2})/);
  const seasonNumber = seasonMatch ? parseInt(seasonMatch[1], 10) : null;

  return (
    <Link
      to={`/episode/${episode.id}`}
      className="card bg-base-100 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <figure className="relative h-48">
        <img
          src={`/images/seasons/Rick_and_Morty_season_${seasonNumber}.webp`}
          alt={episode.name}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
        />

        {/* Dark overlay for the entire card */}
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            isHovered ? "bg-opacity-30" : "bg-opacity-60"
          }`}
        ></div>

        {/* Dark overlay specifically for the episode name */}
        <div
          className={`absolute inset-x-2 bottom-2 transition-opacity duration-300 w-full rounded-lg pl-1 ${
            isHovered ? "bg-black bg-opacity-70" : "bg-opacity-0"
          }`}
        >
          <h2
            className={`card-title text-sm font-bold text-white line-clamp-2 group-hover:line-clamp-none ${
              !isHovered ? "truncate" : ""
            }`}
          >
            {episode.name}
          </h2>
        </div>
      </figure>
      <div className="card-body p-3 bg-black/70 hover:text-white">
        <p className="text-xs opacity-70">{episode.air_date}</p>
        <p className="text-xs font-semibold">{episode.episode}</p>
        <div className="absolute inset-x-0 bottom-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
      </div>
    </Link>
  );
};
