import { api } from "../api";

export const getCharacters = async (pageNumber = 1, pageSize = 10) => {
  const url = `/api/characters?pageNumber=${pageNumber}&pageSize=${pageSize}`;
  const response = await api.get(url);
  return response;
};
