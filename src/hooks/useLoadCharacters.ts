import { Characters } from "@prisma/client";
import useSWR from "swr";

export const getUseLoadCharactersKey = () => "useLoadCharacters";
export const useLoadCharacters = () => {
  return useSWR<Characters[]>(getUseLoadCharactersKey(), () =>
    fetch("/api/characters")
      .then((res) => res.json())
      .catch((err) => console.error(err))
  );
};
