import { useQuery } from "@tanstack/react-query";
import api from "../api";

const fetchCharacterById = async (id: string | undefined) => {
  const { data } = await api.get(
    `character/${id}`
  );
  return data;
};

export const useCharacter = (id: string | undefined) => {
  return useQuery({
    queryKey: ["character", id],
    queryFn: () => fetchCharacterById(id),
  });
};
