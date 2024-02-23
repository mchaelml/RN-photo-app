import React from "react";
import { Box, Text, Theme, makeStyles, useTheme } from "@src/Theme";
import { IPexelPhoto } from "@types";
import {
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  ActivityIndicator,
  useWindowDimensions,
  RefreshControl,
} from "react-native";
import { isEmpty } from "lodash";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Image from "./Image";
import QueryKeys from "@src/api/QueryKeys";
import { useQueryClient, QueryStatus } from "react-query";
import getImageInfo from "@src/utils/getImageInfo";

interface IPhotoList<T> {
  items: T[];
  isFetching: boolean;
  isFetchingNextPage: boolean;
  error: unknown;
  hasNextPage?: boolean;
  fetchNextPage: () => void;
  onClick: (info: T) => void;
  queryKey: keyof typeof QueryKeys;
  status: QueryStatus;
}

const PhotoList = <T extends IPexelPhoto>({
  items,
  fetchNextPage,
  isFetching,
  isFetchingNextPage,
  error,
  hasNextPage,
  onClick,
  queryKey,
  status,
}: IPhotoList<T>) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const queryClient = useQueryClient();

  const styles = useStyles()();

  const renderItem: ListRenderItem<T> = ({ item }) => {
    if (isEmpty(items)) {
      return (
        <Box flexDirection="column" justifyContent="center" flex={1} alignItems="center" marginTop="xxxl">
          <Text variant="title1" marginBottom="l">
            No results found
          </Text>
          <Text variant="title2">There are no items returned by the API at the moment</Text>
        </Box>
      );
    }
    const { width: imageWidth, height: imageHeight } = getImageInfo({
      itemHeight: item.height,
      itemWidth: item.width,
      containerWidth: width - 2 * theme.spacing.m,
    });
    return (
      <TouchableOpacity onPress={() => onClick(item)} key={item.id} style={styles.container}>
        <Box
          width="100%"
          marginVertical="m"
          alignItems="center"
          backgroundColor="darkBackground"
          shadowColor="text"
          shadowOffset={{ width: -4, height: 8 }}
          shadowOpacity={0.2}
          shadowRadius={4}
          elevation={4}
          borderRadius="l"
        >
          <Box width="100%" borderRadius="l" overflow="hidden">
            <Image uri={item.src.original ?? ""} resizeMode="cover" width={imageWidth} height={imageHeight} />
            <Text variant="title1" paddingVertical="m">
              {item.photographer}
            </Text>
          </Box>
        </Box>
      </TouchableOpacity>
    );
  };

  if (error) {
    return (
      <Box>
        <Text variant="title1">An Error has occured!</Text>
        {error && (error as Error)?.message && <Text variant="title2">{(error as Error).message}</Text>}
      </Box>
    );
  }

  return (
    <>
      <FlatList
        data={isEmpty(items) ? [] : items}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        contentContainerStyle={{ paddingBottom: insets.bottom ?? theme.spacing.xl }}
        renderItem={renderItem}
        onEndReached={() => (hasNextPage && !isFetching && !isFetchingNextPage ? fetchNextPage() : null)}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={status === "loading"}
            onRefresh={() => {
              queryClient.refetchQueries([queryKey]);
            }}
          />
        }
      />
      {(isFetching || isFetchingNextPage) && (
        <Box width="100%" alignItems="center" height={50} justifyContent="center">
          <ActivityIndicator size="large" />
        </Box>
      )}
    </>
  );
};

const useStyles = () =>
  makeStyles((theme: Theme) => {
    return {
      container: {
        marginLeft: theme.spacing.s,
        marginRight: theme.spacing.s,
      },
    };
  });

export default PhotoList;
