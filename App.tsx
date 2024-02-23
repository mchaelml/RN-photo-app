import { ThemeProvider } from "@shopify/restyle";
import AppNavigation from "@src/AppNavigation";
import React from "react";
import { DefaultTheme } from "@react-navigation/native";
import { theme } from "./src/Theme";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "react-query";
import type { Theme as NavTheme } from "@react-navigation/native";
import AxiosInstanceProvider from "@providers/AxiosProvider";
import ErrorBoundary from "@components/ErrorBoundary";

function App(): React.JSX.Element {
  const queryClient = new QueryClient();
  const navTheme: NavTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.colors.background,
    },
  };

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <AxiosInstanceProvider>
              <AppNavigation navTheme={navTheme} />
            </AxiosInstanceProvider>
          </SafeAreaProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
