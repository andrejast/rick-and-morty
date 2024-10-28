import { useQuery } from "@tanstack/react-query";
import { ICharacter } from "../types/types";
import api from "../api";

const extractCharacterIds = (characterUrls: string[]): number[] => {
  return characterUrls.map((url) => {
    const parts = url.split("/");
    return parseInt(parts[parts.length - 1], 10);
  });
};

const fetchMultipleCharacters = async (ids: number[]): Promise<ICharacter[]> => {
  const { data } = await api.get(`/character/${ids.join(",")}`);
  return Array.isArray(data) ? data : [data]; 
};

export const useMultipleCharacters = (characterUrls: string[]) => {
  const characterIds = extractCharacterIds(characterUrls);
  return useQuery<ICharacter[]>({
    queryKey: ["characters", characterIds],
    queryFn: () => fetchMultipleCharacters(characterIds),
    enabled: characterIds.length > 0, 
    staleTime: 60000, 
  });
};
