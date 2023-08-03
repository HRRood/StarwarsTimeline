import { MediaWithMediaType } from "@/repository/media/getMedia";
import { Media } from "@prisma/client";
import useSWR from "swr";

export const getUseLoadMediaKey = () => "useLoadMediaEvents";
export const useLoadMedia = () => {
  return useSWR<MediaWithMediaType[]>(getUseLoadMediaKey(), () =>
    fetch("/api/media")
      .then((res) => res.json())
      .catch((err) => console.error(err))
  );
};
