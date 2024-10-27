import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Function to fetch a location by ID from the Rick and Morty API
const fetchLocationById = async (id: string | undefined) => {
  // Makes a GET request to the location endpoint with the provided ID
  const { data } = await axios.get(
    `https://rickandmortyapi.com/api/location/${id}`
  );
  return data; // Returns the location data
};

// Custom hook to fetch location data using react-query
export const useLocation = (id: string | undefined) => {
  return useQuery({
    // Unique query key to cache and control refetching based on location ID
    queryKey: ["location", id],
    // Function that fetches location data when the query runs
    queryFn: () => fetchLocationById(id),
    // The query will automatically refetch whenever the ID changes
    enabled: !!id, // Guards against undefined IDs, only enabling if ID exists
  });
};
