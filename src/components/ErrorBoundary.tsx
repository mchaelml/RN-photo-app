import type { ErrorInfo, ReactNode } from "react";
import React, { Component } from "react";

import { Box, Text } from "@src/Theme";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    console.log("getDerivedStateFromError ", error, " ");
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.log("componentDidCatch ", error, " ", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box flex={1}>
          <Text variant="title1">An error has occured. Restart the application</Text>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
