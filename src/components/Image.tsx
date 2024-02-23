import { Box } from "@src/Theme";
import React, { memo, useState } from "react";
import { ActivityIndicator, ImageProps } from "react-native";

import FastImage, { FastImageProps } from "react-native-fast-image";

interface IImageProps {
  height: ImageProps["height"];
  width: ImageProps["width"];
  uri: string;
  resizeMode?: FastImageProps["resizeMode"];
}

const Image = ({ width, height, uri, resizeMode }: IImageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Box alignItems="center" justifyContent="center">
      <FastImage
        resizeMode={resizeMode ?? "contain"}
        source={{ uri, priority: FastImage.priority.high }}
        style={{ width, height, alignItems: "center", justifyContent: "center" }}
        onLoadEnd={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
        children={isLoading && <ActivityIndicator size="large" />}
      />
    </Box>
  );
};

export default memo(Image);
