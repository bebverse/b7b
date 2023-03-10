import React from "react";
import { useQuery } from "@apollo/client";

import { GET_POST_FEED } from "../graphql/queries/GET_POST_FEED";

export const PostFeedContext = React.createContext({
  postFeed: [],
  isEnd: false,
  loading: false,
  error: null,
  // eslint-disable-next-line no-empty-function
  resetPostFeed: () => {},
});
PostFeedContext.displayName = "PostFeedContext";

export const usePostFeedContext = () => React.useContext(PostFeedContext);

export const PostFeedContextProvider = ({
  children,
  limit,
  sort,
  filters,
  context = null,
}) => {
  const [isEnd, setIsEnd] = React.useState(false);
  const queryOptions = {
    variables: {
      filters,
      sort,
      limit,
    },
    onCompleted: (res) => {
      if (!res || res.getPostFeed.length < limit) {
        setIsEnd(true);
      } else if (isEnd) {
        setIsEnd(false);
      }
    },
  };
  if (context) {
    queryOptions.context = context;
  }

  const { data, loading, error, fetchMore } = useQuery(
    GET_POST_FEED,
    queryOptions
  );

  const resetPostFeed = React.useCallback(async () => {
    await fetchMore({
      offset: 0,
      limit,
    });
  }, [fetchMore, limit]);

  const postFeed = React.useMemo(() => {
    return data?.getPostFeed;
  }, [data]);

  const next = React.useCallback(() => {
    return fetchMore({
      variables: {
        limit,
        offset: postFeed.length,
      },
    }).then((res) => {
      if (!res?.data || res.data.getPostFeed.length < limit) {
        setIsEnd(true);
      }
    });
  }, [fetchMore, limit, setIsEnd, postFeed]);

  return (
    <PostFeedContext.Provider
      value={{
        postFeed,
        loading,
        error,
        next,
        isEnd,
        limit,
        resetPostFeed,
      }}
    >
      {children}
    </PostFeedContext.Provider>
  );
};
