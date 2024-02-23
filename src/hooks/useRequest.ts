import type { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from "axios";
import { useCallback, useMemo } from "react";

import useAxios from "./useAxios";
import backendUrl from "@src/api";

export interface UseRequestValue {
  get: <Resp>(
    url: string,
    customHeaders?: Readonly<Record<string, string>>,
    responseType?: AxiosResponse["config"]["responseType"],
  ) => Promise<AxiosResponse<Resp>>;
  post: <Body, Resp = unknown>(
    url: string,
    body: Body,
    customHeaders?: Readonly<Record<string, string>>,
    responseType?: AxiosResponse["config"]["responseType"],
  ) => Promise<AxiosResponse<Resp>>;
}

type Request<T> = GetRequest | PostRequest<T>;

interface GetRequest {
  method: "GET";
  url: string;
  config: AxiosRequestConfig;
}

interface PostRequest<T> {
  method: "POST";
  url: string;
  config: AxiosRequestConfig;
  data: T;
}

const useRequest = (): UseRequestValue => {
  const controller = useMemo(() => new AbortController(), []);
  const { axiosInstance } = useAxios();

  const request = useCallback(
    async <Resp, Body = unknown>(req: Request<Body>): Promise<AxiosResponse<Resp>> => {
      const headers: AxiosRequestHeaders = {
        ...req.config.headers,
      } as any as AxiosRequestHeaders;
      if (headers["Content-Type"] === undefined) {
        headers["Content-Type"] = "application/json";
      }

      const requestConfig: AxiosRequestConfig = {
        method: req.method,
        headers,
        responseType: req.config.responseType,
        signal: controller.signal,
      };
      if (req.method === "POST") {
        requestConfig.data = req.data;
      }

      return await axiosInstance(req.url, requestConfig).catch((error) => {
        throw new Error(error);
      });
    },
    [controller, axiosInstance],
  );

  const get = useCallback(
    async <Resp>(
      url: string,
      customHeaders: Readonly<Record<string, string>> = {},
      responseType: AxiosResponse["config"]["responseType"] = "json",
    ) => {
      return request<Resp>({
        method: "GET",
        url: new URL(url, backendUrl).toString(),
        config: {
          headers: customHeaders,
          responseType,
        },
      });
    },
    [request],
  );

  const post = useCallback(
    <Body, Resp>(
      url: string,
      body: Body,
      customHeaders: Readonly<Record<string, string>> = {},
      responseType: AxiosResponse["config"]["responseType"] = "json",
    ) => {
      return request<Resp, Body>({
        method: "POST",
        url: new URL(url, backendUrl).toString(),
        data: body,
        config: {
          headers: customHeaders,
          responseType: responseType,
        },
      });
    },
    [request],
  );

  return useMemo(
    () => ({
      get,
      post,
    }),
    [get, post],
  );
};

export default useRequest;
