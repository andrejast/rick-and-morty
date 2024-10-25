import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchLocationById = async (id: string | undefined) => {
  const { data } = await axios.get(`https://rickandmortyapi.com/api/location/${id}`);
  return data;
};

export const useLocation = (id: string | undefined) => {
  return useQuery({
    queryKey: ['location', id],
    queryFn: () => fetchLocationById(id),
  });
};
