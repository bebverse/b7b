import React from "react";
import { Box, HStack, Text } from "@chakra-ui/layout";
import { Button, IconButton } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import isEqual from "lodash/isEqual";

import { PostUpvoteWithActions } from "../../containers/post/PostUpvoteWithContext";
import { PostFooterWithAction } from "../../containers/post/PostFooterWithContext";

import { PostTitle } from "./PostTitle";
import { PostRichContent } from "./PostContent";
import { PostPreview } from "./PostPreview";
import { Expand } from "../icons/Expand";

import {
  makePostLink,
  makePostChannelLink,
} from "../../helpers/make-post-link";
import { getDateFromNow } from "../../helpers/get-date-from-now";
import { shortenAddress } from "../../helpers/shorten-address";

const PostParentInner = ({
  isStandalone = false,
  postLink,
  content,
  blocks,
  postId,
}) => {
  const { isOpen, onToggle } = useDisclosure();
  const showContent = React.useMemo(() => {
    return isStandalone || isOpen;
  }, [isStandalone, isOpen]);

  return (
    <>
      <HStack mt={[2, null, null, 4]} spacing={1}>
        {!isStandalone && (
          <IconButton
            icon={<Expand />}
            size="sm"
            variant={"ghost"}
            onClick={(e) => {
              e.preventDefault();
              onToggle();
            }}
          />
        )}
        <PostFooterWithAction
          postId={postId}
          index={0}
          size="sm"
          postLink={postLink}
          replyEditorStyle={isStandalone ? "inline" : "link"}
        />
      </HStack>
      {showContent && (
        <Box p={[1, null, null, 4]}>
          <PostRichContent content={content} blocks={blocks} />
        </Box>
      )}
    </>
  );
};

const PostParentInnerMemo = React.memo(
  PostParentInner,
  (prev = {}, next = {}) => {
    return (
      prev.isStandalone === next.isStandalone &&
      prev.postLink === next.postLink &&
      prev.postId === next.postId &&
      isEqual(prev.content, next.content) &&
      isEqual(prev.blocks, next.blocks)
    );
  }
);

export const ParentPost = ({ post, isStandalone = false }) => {
  const postLink = React.useMemo(() => {
    return makePostLink(post, true);
  }, [post?._id]);
  const postChannelLink = React.useMemo(() => {
    return makePostChannelLink(post, false);
  }, [post?._id]);

  return (
    <Box display="flex" flexDir={["column", null, null, "row"]}>
      <Box display="flex">
        <PostUpvoteWithActions
          postId={post?._id}
          // reactionCount={post?.reactionCount}
          size="sm"
          flexDir="column"
          mr={2}
        />
        <PostPreview
          flexShrink={0}
          mr={2}
          w={32}
          h={24}
          block={post?.richContent?.blocks?.[0]?.block}
          overflow="hidden"
          display="flex"
          justifyContent="center"
          alignItems="center"
          backgroundColor="blackAlpha.100"
          rounded="sm"
          as="a"
          href={postLink}
        />
      </Box>
      <Box flex="1" overflowX="hidden" overflowY="visible" py={1}>
        <PostTitle
          contentRaw={post?.richContent?.content?.raw}
          username={post?.account?.username}
          address={post?.account?.address?.address}
          _hover={{ textDecoration: "underline", cursor: "pointer" }}
          fontWeight="semibold"
          as="a"
          href={postLink}
          textOverflow="ellipsis"
        />

        <Box display="flex" flexWrap="wrap">
          <Button
            // ml={1}
            color="text.secondary"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            size="xs"
            as="a"
            variant="link"
            href={postChannelLink}
          >
            to: {post?.channel?.slug || "all"}@{post?.community?.bebdomain}.
            {post?.community?.tld || "beb"}
          </Button>
          <Text color="text.secondary" fontSize="xs">
            &bull; posted by{" "}
            {post?.account?.username ||
              shortenAddress(post?.account?.address?.address)}
            , {getDateFromNow(post?.createdAt)}
          </Text>
        </Box>
        <PostParentInnerMemo
          content={post?.richContent?.content}
          blocks={post?.richContent?.blocks}
          isStandalone={isStandalone}
          postLink={postLink}
          postId={post?._id}
        />
      </Box>
    </Box>
  );
};
