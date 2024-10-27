import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchCharacterById = async (id: string | undefined) => {
  const { data } = await axios.get(
    `https://rickandmortyapi.com/api/character/${id}`
  );
  return data;
};

export const useCharacter = (id: string | undefined) => {
  return useQuery({
    queryKey: ["character", id],
    queryFn: () => fetchCharacterById(id),
  });
};
