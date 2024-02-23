import { Container, PhotoList } from "@components";
import { HomeNavigationProps } from "@src/Navigation";
import QueryKeys from "@src/api/QueryKeys";
import { getData } from "@src/hooks/useData";
import { IPexelPhoto } from "@types";
import React from "react";
import { useInfiniteQuery } from "react-query";
import { reduce } from "lodash";
import useRequest from "@src/hooks/useRequest";
import { Box } from "@src/Theme";

interface IMainProps {
  navigation: HomeNavigationProps<"Main">["navigation"]["navigation"];
  route: HomeNavigationProps<"Main">["route"];
}

const Main = ({ navigation }: IMainProps) => {
  const { get } = useRequest();
  const { data, error, fetchNextPage, refetch, status, hasNextPage, isFetching, isFetchingNextPage } = useInfiniteQuery(
    {
      enabled: true,
      cacheTime: 0,
      staleTime: 0,
      keepPreviousData: false,
      queryKey: [QueryKeys.DATA],
      queryFn: ({ pageParam }) => getData({ get, page: pageParam }),
      getNextPageParam: (lastPage) => (lastPage.next_page ? lastPage.page + 1 : null),
    },
  );

  return (
    <Container>
      <Box marginHorizontal="m">
        <PhotoList<IPexelPhoto>
          queryKey="DATA"
          onClick={(info) => navigation.navigate("Detail", { info })}
          items={reduce(data?.pages, (acc, page) => [...acc, ...page.photos], [] as IPexelPhoto[])}
          {...{ refetch, error, status, hasNextPage, isFetching, isFetchingNextPage, fetchNextPage }}
        />
      </Box>
    </Container>
  );
};

export default Main;
