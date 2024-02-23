import React from "react";
import type { Theme as NavTheme } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import HomeNavigator from "@navigators/Home";

interface INavigationProps {
  navTheme: NavTheme;
}

const Navigation = ({ navTheme }: INavigationProps) => {
  return (
    <NavigationContainer key="home" theme={navTheme}>
      <HomeNavigator />
    </NavigationContainer>
  );
};

export default Navigation;
