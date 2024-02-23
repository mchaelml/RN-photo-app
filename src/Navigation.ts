import type { ParamListBase, RouteProp } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { IPexelPhoto } from "@types";

export interface StackNavigationProps<ParamList extends ParamListBase, RouteName extends keyof ParamList = string> {
  navigation: StackNavigationProp<ParamList, RouteName>;
  route: RouteProp<ParamList, RouteName>;
}

export interface HomeNavigationProps<RouteName extends keyof HomeRoutes> {
  navigation: StackNavigationProps<HomeRoutes, RouteName>;
  route: RouteProp<HomeRoutes, RouteName>;
}

export type HomeRoutes = {
  Main: undefined;
  Detail: {
    info: IPexelPhoto;
  };
};
