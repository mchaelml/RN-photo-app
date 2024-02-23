const getImageInfo = ({
  itemWidth,
  itemHeight,
  containerWidth,
}: {
  itemWidth: number;
  itemHeight: number;
  containerWidth: number;
}) => {
  const aspectRatio = itemWidth / itemHeight;
  const width = containerWidth;
  const height = containerWidth / aspectRatio;

  return {
    aspectRatio,
    width,
    height,
  };
};

export default getImageInfo;
