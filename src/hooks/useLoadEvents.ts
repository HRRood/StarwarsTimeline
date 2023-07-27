import { Events } from "@prisma/client";
import useSWR from "swr";

export const getUseLoadEventsKey = () => "useLoadEvents";
export const useLoadEvents = () => {
  return useSWR<Events[]>(getUseLoadEventsKey(), () =>
    fetch("/api/events")
      .then((res) => res.json())
      .catch((err) => console.error(err))
  );
};
