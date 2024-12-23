import { useInfiniteQuery } from "@tanstack/react-query";
import { ICharacter } from "../types/types";
import api from "../api";

interface ApiResponse {
  info: {
    next: string | null;
  };
  results: ICharacter[];
}

const fetchCharacters = async ({
  pageParam = 1,
  queryKey,
}: any): Promise<ApiResponse> => {
  const [, search] = queryKey; // queryKey is destructured to get the search term
  const { data } = await api.get(
    "/character",
    {
      params: {
        page: pageParam,
        name: search,
      },
    }
  );
  return data; // Return the API response with info and results
};

export const useCharacters = (search: string) => {
  return useInfiniteQuery<ApiResponse>({
    queryKey: ["characters", search],
    queryFn: fetchCharacters,
    initialPageParam: 1, // Set the initial page param (required)
    getNextPageParam: (lastPage) => {
      if (lastPage?.info?.next) {
        // Extract the next page number from the URL
        const nextPage = new URLSearchParams(lastPage.info.next.split("?")[1]);
        return Number(nextPage.get("page")); // Return the next page number as an integer
      }
      return undefined; // No more pages
    },
  });
};
