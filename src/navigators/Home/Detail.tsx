import React from "react";
import { Container, CustomScrollView, Image } from "@components";
import { HomeNavigationProps } from "@src/Navigation";
import { Box, Text } from "@src/Theme";
import { useWindowDimensions } from "react-native";
import getImageInfo from "@src/utils/getImageInfo";

interface IDetailProps {
  navigation: HomeNavigationProps<"Detail">["navigation"]["navigation"];
  route: HomeNavigationProps<"Detail">["route"];
}

const Detail = ({ route }: IDetailProps) => {
  const { info } = route.params;
  const { width } = useWindowDimensions();
  const { width: imageWidth, height: imageHeight } = getImageInfo({
    itemHeight: info.height,
    itemWidth: info.width,
    containerWidth: width,
  });
  return (
    <Container>
      <CustomScrollView>
        <Image uri={info.src.original ?? ""} resizeMode="cover" width={imageWidth} height={imageHeight} />
        <Box margin="l" gap="m">
          <Text variant="title1">{info.photographer}</Text>
          <Text variant="title2">{info.photographer_url}</Text>
          <Text variant="title2">{info.alt}</Text>
        </Box>
      </CustomScrollView>
    </Container>
  );
};

export default Detail;
