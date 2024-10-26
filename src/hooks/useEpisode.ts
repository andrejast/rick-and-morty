import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Define the type for the episode data we get from the API
interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
}

interface Character {
  id: number;
  name: string;
  status: string;
  image: string;
}

const fetchEpisode = async (id: string | undefined): Promise<Episode> => {
  const { data } = await axios.get(
    `https://rickandmortyapi.com/api/episode/${id}`
  );
  return data;
};

const fetchMultipleCharacters = async (
  urls: string[]
): Promise<Character[]> => {
  const requests = urls.map((url) => axios.get(url));
  const responses = await Promise.all(requests);
  return responses.map((response) => response.data);
};

export const useEpisode = (id: string | undefined) => {
  return useQuery({
    queryKey: ["episode", id],
    queryFn: () => fetchEpisode(id),
    enabled: !!id,
  });
};

export const useEpisodeCharacters = (characterUrls: string[]) => {
  return useQuery({
    queryKey: ["characters", characterUrls],
    queryFn: () => fetchMultipleCharacters(characterUrls),
    enabled: characterUrls.length > 0,
  });
};
