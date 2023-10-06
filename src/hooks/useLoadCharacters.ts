import { Characters } from "@prisma/client";
import useSWR, { SwrOptions } from "./useSWR";
import { getCharacters } from "@/api/characters/getCharacters";
import { ApiResponse } from "@/utils/defaulrResponse";

export interface PaginationType {
  currentPage: number;
  nextPage: number;
  previousPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalPages: number;
  totalCount: number;
}

interface CharactersResponse {
  characters: Characters[];
  pagination: PaginationType;
}

export const getUseLoadCharactersKey = (pageNumber: number, pageSize: number) => `useLoadCharacters-${pageNumber}-${pageSize}`;
export const useLoadCharacters = (pageNumber = 1, pageSize = 10, options?: SwrOptions<any>) => {
  return useSWR<ApiResponse<CharactersResponse>>(getUseLoadCharactersKey(pageNumber, pageSize), () => getCharacters(pageNumber, pageSize), options);
};
