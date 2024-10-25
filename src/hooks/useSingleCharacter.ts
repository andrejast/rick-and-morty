import { useQuery } from '@tanstack/react-query'; // Update import
import axios from 'axios';

const fetchCharacterById = async (id: string | undefined) => {
  const { data } = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
  return data;
};

export const useCharacter = (id: string | undefined) => {
  return useQuery({
    queryKey: ['character', id], // Use queryKey in the right format
    queryFn: () => fetchCharacterById(id),
  });
};
