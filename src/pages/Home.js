import { Text, Box, Link } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";

import { HomeFeedWithUniverseSelect } from "./etc/HomeFeedWithUniverseSelect";
import { DimensionRoutesLayout } from "./layout/DimensionRoutesLayout";

import { withUriQueryParams } from "../helpers/hoc/withUriQueryParams";
import { withUriApolloProvider } from "../helpers/hoc/withUriApolloProvider";
import { getInitialDomain } from "../helpers/get-initial-domain";

import { CreatePostModalButton } from "../containers/post/CreatePostModal";
export const HomeContent = ({ uri }) => {
  return (
    <DimensionRoutesLayout>
      <Box
        display={"flex"}
        p={[2, null, null, 8]}
        flexDir={["column-reverse", null, null, "row"]}
      >
        <Box flex="1" pr={[0, null, null, 8]}>
          <HomeFeedWithUniverseSelect uri={uri} />
        </Box>
        <Box w={["100%", null, null, "sm"]} mb={[8, null, null, 0]}>
          <Text fontSize="3xl" fontWeight="bold" lineHeight={1.15} mb={4}>
            An{" "}
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/bebverse/b7b"
              color="blue.600"
            >
              open-source
            </Link>{" "}
            BEB dimension browser
          </Text>
          <Text>
            The BEB protocol is a decentralized social protocol for communities,
            similar to reddit.
          </Text>
          <Text marginTop={2}>
            Dimensions (communities) are queried against the{" "}
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/bebverse/contracts/blob/main/src/Resolver.sol"
              color="blue.600"
            >
              deployed resolver contract
            </Link>
            , which allows domain holders to map their domain to their{" "}
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/bebverse/universe"
              color="blue.600"
            >
              self-hosted server
            </Link>
            .
          </Text>

          <Box marginTop={4}>
            <Text fontWeight="bold">
              Here are some useful links to learn about the BEB protocol:
              <Text fontWeight="bold">
                <Box marginLeft={10}>
                  <ul>
                    <li>
                      <Link
                        color="blue.600"
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://github.com/bebverse/protocol"
                      >
                        github.com/bebverse/protocol
                      </Link>
                    </li>
                    <li>
                      <Link
                        color="blue.600"
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://github.com/bebverse/universe"
                      >
                        github.com/bebverse/universe
                      </Link>
                    </li>
                    <li>
                      <Link
                        color="blue.600"
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://github.com/bebverse/b7b"
                      >
                        github.com/bebverse/b7b
                      </Link>
                    </li>
                    <li>
                      <Link
                        color="blue.600"
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://beb.xyz"
                      >
                        BEBverse
                      </Link>
                    </li>
                    <li>
                      <Link
                        color="blue.600"
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://beb.domains"
                      >
                        BEB Dimensions
                      </Link>
                    </li>
                  </ul>
                </Box>
              </Text>
            </Text>
          </Box>

          <Box marginTop={4}>
            <Text fontSize="sm">
              <i>
                <b>Disclaimer:</b> B7B is a browser for BEB dimensions, which
                are entirely self-hosted by third-parties. The developers and
                hosts of B7B are not responsible for the content of dimensions.
                Contact the host of the appropriate dimension to report any
                concerns.
              </i>
            </Text>
          </Box>
          <Box mt={4}>
            <CreatePostModalButton
              w="100%"
              rounded="full"
              colorScheme={"pink"}
              initialDomain={getInitialDomain(uri)}
            >
              Create Post
            </CreatePostModalButton>
            <Button
              w="100%"
              rounded="full"
              variant={"outline"}
              mt={2}
              as="a"
              href="https://beb.domains"
              target="_blank"
            >
              Create a Free Domain
            </Button>
          </Box>
        </Box>
      </Box>
    </DimensionRoutesLayout>
  );
};

export const Home = withUriQueryParams(withUriApolloProvider(HomeContent));
