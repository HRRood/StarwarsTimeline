import useActualSWR, { SWRConfiguration } from "swr";
import { useState } from "react";

type UseSWRReturnType<T> = {
  data: T | undefined;
  error: Error;
  isLoading: boolean;
  isValidating: boolean;
  mutate: (data?: T, shouldRevalidate?: boolean) => Promise<T | undefined>;
};

export interface CustomSWROptions<Data = any, Error = any> extends SWRConfiguration<Data, Error> {
  showPreviousData?: boolean;
}

export default function useSWR<Data = any, Error = any>(
  key: string,
  fetcher: () => Promise<Data>,
  options?: CustomSWROptions<Data, Error>
): UseSWRReturnType<Data> {
  const [previousData, setPreviousData] = useState<Data | undefined>();

  const { data, error, isLoading, isValidating, mutate } = useActualSWR(key, () => fetcher(), {
    ...options,
    refreshInterval: 0,
    dedupingInterval: 60 * 1000 * 30,
    fallbackData: options?.showPreviousData ? previousData : undefined,
    onSuccess: (data) => {
      if (options?.showPreviousData && data) {
        setPreviousData(data);
      }
    },
  });

  return { data, error, isLoading, isValidating, mutate };
}

export interface SwrOptions<T> {
  fallbackData?: T;
  keepPreviousData?: boolean;
  refreshInterval?: number;
  dedupingInterval?: number;
}
