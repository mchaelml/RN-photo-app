import { useContext } from "react";

import { AxiosContext } from "@src/providers/AxiosProvider";
import type { AxiosContextProps } from "@src/providers/AxiosProvider";

const useAxios = (): AxiosContextProps => {
  return useContext(AxiosContext);
};
export default useAxios;
