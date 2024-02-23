import { useQuery } from "react-query";

import type { UseRequestValue } from "./useRequest";
import useRequest from "./useRequest";
import QueryKeys from "@src/api/QueryKeys";
import { GET_DATA } from "@src/api/apiPathHelpers";
import { IPexelApiResponse } from "@types";
import urlWithQuery from "@src/utils/urlWithQuery";
import { stringify } from "qs";

import Config from "react-native-config";

interface IGetDataProps {
  get: UseRequestValue["get"];
  per_page?: number;
  page?: number;
}

export const getData = async ({ get, per_page = 5, page = 1 }: IGetDataProps) => {
  const searchParams = {
    per_page,
    page,
  };

  const queryString = stringify(searchParams, {
    encodeValuesOnly: true,
  });
  const url = urlWithQuery(GET_DATA, queryString);

  const authHeaders = { Authorization: Config.API_KEY ?? "" };

  const { data } = await get<IPexelApiResponse>(url, authHeaders);

  return data;
};

function useData() {
  const { get } = useRequest();

  return useQuery([QueryKeys.DATA], () => getData({ get }), {
    cacheTime: 0,
  });
}

export default useData;
