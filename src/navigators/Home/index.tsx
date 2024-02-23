import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import type { HomeRoutes } from "@src/Navigation";

import Main from "./Main";
import Detail from "./Detail";

const HomeStack = createStackNavigator<HomeRoutes>();

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator initialRouteName="Main">
      <HomeStack.Group>
        <HomeStack.Screen name="Main" component={Main} />
        <HomeStack.Screen name="Detail" component={Detail} />
      </HomeStack.Group>
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
