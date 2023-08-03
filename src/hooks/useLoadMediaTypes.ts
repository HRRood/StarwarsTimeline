import { MediaType } from "@prisma/client";
import useSWR from "swr";

export const getUseLoadMediaTypesKey = () => "useLoadMediaTypesEvents";
export const useLoadMediaTypes = () => {
  return useSWR<MediaType[]>(getUseLoadMediaTypesKey(), () =>
    fetch("/api/mediaTypes")
      .then((res) => res.json())
      .catch((err) => console.error(err))
  );
};
