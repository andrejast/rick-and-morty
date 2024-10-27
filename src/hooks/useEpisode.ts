import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ICharacter, IEpisode } from "../types/types";

// Fetches a single episode by ID from the Rick and Morty API
const fetchEpisode = async (id: string | undefined): Promise<IEpisode> => {
  // Sends GET request to retrieve episode data using the provided ID
  const { data } = await axios.get(
    `https://rickandmortyapi.com/api/episode/${id}`
  );
  return data; // Returns episode data in the format of IEpisode
};

// Fetches multiple character details from an array of URLs
const fetchMultipleCharacters = async (
  urls: string[]
): Promise<ICharacter[]> => {
  // Maps each character URL to an axios GET request
  const requests = urls.map((url) => axios.get(url));
  // Executes all requests concurrently and waits for all to complete
  const responses = await Promise.all(requests);
  // Returns the character data for each resolved request
  return responses.map((response) => response.data);
};

// Custom hook to fetch episode data by ID
export const useEpisode = (id: string | undefined) => {
  return useQuery({
    // Unique query key for caching and refetching control based on episode ID
    queryKey: ["episode", id],
    // Function to fetch episode data when query is enabled
    queryFn: () => fetchEpisode(id),
    // Enables query only if an ID is provided (guards against undefined IDs)
    enabled: !!id,
  });
};

// Custom hook to fetch data for multiple characters using their URLs
export const useMultipleCharacters = (characterUrls: string[]) => {
  return useQuery({
    // Unique query key for caching and refetching control based on character URLs
    queryKey: ["characters", characterUrls],
    // Function to fetch character data when query is enabled
    queryFn: () => fetchMultipleCharacters(characterUrls),
    // Enables query only if character URLs are provided (guards against empty arrays)
    enabled: characterUrls.length > 0,
  });
};
