import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Character {
  id: number;
  name: string;
  status: string;
  image: string;
}

const fetchMultipleCharacters = async (
  urls: string[]
): Promise<Character[]> => {
  const requests = urls.map((url) => axios.get(url));
  const responses = await Promise.all(requests);
  return responses.map((response) => response.data);
};

export const useMultipleCharacters = (characterUrls: string[]) => {
  return useQuery({
    queryKey: ["characters", characterUrls],
    queryFn: () => fetchMultipleCharacters(characterUrls),
    enabled: characterUrls.length > 0,
  });
};
