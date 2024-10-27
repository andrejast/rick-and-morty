import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ICharacter, IEpisode } from "../types/types";

const fetchEpisode = async (id: string | undefined): Promise<IEpisode> => {
  const { data } = await axios.get(
    `https://rickandmortyapi.com/api/episode/${id}`
  );
  return data;
};

const fetchMultipleCharacters = async (
  urls: string[]
): Promise<ICharacter[]> => {
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

export const useMultipleCharacters = (characterUrls: string[]) => {
  return useQuery({
    queryKey: ["characters", characterUrls],
    queryFn: () => fetchMultipleCharacters(characterUrls),
    enabled: characterUrls.length > 0,
  });
};

const fetchEpisodes = async (ids: string[]): Promise<IEpisode[]> => {
  const requests = ids.map((id) =>
    axios.get(`https://rickandmortyapi.com/api/episode/${id}`)
  );
  const responses = await Promise.all(requests);
  return responses.map((response) => response.data);
};

export const useEpisodes = (ids: string[]) => {
  return useQuery({
    queryKey: ["episodes", ids],
    queryFn: () => fetchEpisodes(ids),
    enabled: ids.length > 0,
  });
};
