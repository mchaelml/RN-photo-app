import { createText, createTheme, createBox, useTheme as useReTheme } from "@shopify/restyle";
import type { ImageStyle, TextStyle, ViewStyle } from "react-native";

export const theme = createTheme({
  colors: {
    primary: "#EDF0F8",
    secondary: "#0C0D34",
    text: "#0F1524",
    white: "#FFFFFF",
    background: "#EDF0F8",
    darkBackground: "#DEE3EE",
  },
  spacing: {
    o: 0,
    xs: 4,
    s: 8,
    m: 14,
    l: 18,
    xl: 24,
    xxl: 28,
    xxxl: 36,
  },
  textVariants: {
    default: {
      fontSize: 0,
      lineHeight: 0,
    },
    title1: {
      fontWeight: "700",
      fontSize: 16,
      color: "text",
      textAlign: "center",
      lineHeight: 24,
      fontFamily: "Inter-bold",
    },
    title2: {
      fontSize: 16,
      color: "text",
      fontWeight: "400",
      lineHeight: 24,
    },
  },
  borderRadii: {
    s: 4,
    m: 8,
    l: 20,
    xl: 75,
  },
  breakpoints: {},
  custom: {},
});

export type Theme = typeof theme;
export const Box = createBox<Theme>();
export const Text = createText<Theme>();
export const useTheme = () => useReTheme<Theme>();

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export const makeStyles =
  <T extends NamedStyles<T>>(styles: (theme: Theme) => T) =>
  () => {
    const currentTheme = useTheme();
    return styles(currentTheme);
  };
