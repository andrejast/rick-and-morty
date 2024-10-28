import { useQuery } from "@tanstack/react-query";
import { IEpisode } from "../types/types";
import api from "../api";

const fetchEpisode = async (id: string | undefined): Promise<IEpisode> => {
  const { data } = await api.get(
    `episode/${id}`
  );
  return data;
};


export const useEpisode = (id: string | undefined) => {
  return useQuery({
    queryKey: ["episode", id],
    queryFn: () => fetchEpisode(id),
    enabled: !!id,
  });
};


const fetchEpisodes = async (ids: string[]): Promise<IEpisode[]> => {
  const requests = ids.map((id) =>
    api.get(`episode/${id}`)
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
