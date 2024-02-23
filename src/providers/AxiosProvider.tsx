import React, { createContext, useMemo, useRef } from "react";
import type { AxiosInstance } from "axios";
import axios from "axios";
import backendUrl from "@src/api";

interface AxiosProviderProps {
  children: React.ReactNode;
}

export interface AxiosContextProps {
  axiosInstance: AxiosInstance;
}

export const AxiosContext = createContext<AxiosContextProps>({
  axiosInstance: axios.create({ baseURL: backendUrl }),
});

const AxiosInstanceProvider = ({ children }: AxiosProviderProps) => {
  const instanceRef = useRef(axios.create({ baseURL: backendUrl }));

  instanceRef.current.interceptors.response.use(
    async function (response) {
      return response;
    },
    async function async(error) {
      throw new Error(error);
    },
  );

  const value = useMemo(
    () => ({
      axiosInstance: instanceRef.current,
    }),
    [],
  );

  return <AxiosContext.Provider value={value}>{children}</AxiosContext.Provider>;
};

export default AxiosInstanceProvider;
