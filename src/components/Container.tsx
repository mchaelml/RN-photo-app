import type { ReactNode } from "react";
import React, { memo } from "react";

import type { Theme } from "../Theme";
import { Box } from "../Theme";

interface IContainerProps {
  children: ReactNode;
  backgroundColor?: keyof Theme["colors"];
}

const Container: React.FC<IContainerProps> = ({ children, backgroundColor = "background" }) => {
  return (
    <Box flex={1} backgroundColor={backgroundColor}>
      {children}
    </Box>
  );
};

export default memo(Container);
