

import react from "react";

import {
    Box,
    Button,
    Flex,
    Grid,
    GridItem,
    Heading,
    HStack,
    Icon,
    Input,
    Stack,
    Text,
  } from "@chakra-ui/react";
  import { Image } from "components/Image";
  import Layout, { Container } from "components/Layout";
  import { Link } from "components/Link";
  import dateFormat from "dateformat";
  import { TiMediaPlay, TiSocialFacebook, TiSocialTwitter } from "react-icons/ti";
  import { GoThreeBars } from "react-icons/go";

const InfoBoxes = () =>{
    <Container
        as="section"
        wider
        d="flex"
        flexDir={{ base: "column", md: "row" }}
        alignItems="stretch"
        mb={10}
      >
        <Box bg="gray.100" p={{ base: 2, lg: 5 }} flex={1}>
          <Heading
            fontSize={{ base: "xl", md: "lg", lg: "md" }}
            color="purple.800"
            mb={{ base: 5, md: 10, lg: 5 }}
          >
            New Podcast
          </Heading>

          <Flex justifyContent="space-between">
            <Box mr={2}>
              <TitleText
                fontSize={{ base: "md", md: "sm" }}
                text="Mark Steinberg Reads Donald Trump’s Mean Tweets on Kimmel"
              />

              <DateText my={1} />
            </Box>

            <Image
              rounded="full"
              boxSize="60px"
              src="/img/shoes.jpg"
              d={{ md: "none", lg: "block" }}
            />
          </Flex>
        </Box>

        <Box
          bg="gray.100"
          p={{ base: 2, lg: 5 }}
          my={{ base: 5, md: 0 }}
          mx={{ base: 0, md: 1, lg: 5 }}
          flex={1}
        >
          <Heading
            fontSize={{ base: "xl", md: "lg", lg: "md" }}
            color="purple.800"
            mb={5}
          >
            Subscribe to our newsletter
          </Heading>

          <MoreText
            text="To be updated with all the latest news, offers and special announcements."
            fontStyle="italic"
            size={{ base: "md", md: "xs" }}
            mb={4}
          />

          <Flex flexDir={{ base: "column", lg: "row" }} as="form">
            <Input
              rounded="none"
              placeholder="Your email address"
              size={{ base: "md", md: "sm", lg: "xs" }}
              h="40px"
              px={5}
              bg="white"
              color="black"
            />
            <Box h="40px">
              <Button
                bg="purple.800"
                color="white"
                rounded="none"
                size={{ base: "md", md: "sm", lg: "xs" }}
                w={{ base: "100%", lg: "auto" }}
                h="40px"
                px={5}
                _hover={{ opacity: 0.8 }}
              >
                SUBSCRIBE
              </Button>
            </Box>
          </Flex>
        </Box>

        <Box bg="gray.100" p={{ base: 2, lg: 5 }} flex={1}>
          <Heading
            fontSize={{ base: "xl", md: "lg", lg: "md" }}
            color="purple.800"
            mb={{ base: 5, md: 10, lg: 5 }}
          >
            Stay Connected
          </Heading>

          <HStack spacing={{ base: 1, lg: 5 }} color="white">
            <Link mute flex={{ base: 1, md: 0, lg: 1 }}>
              <Box
                w={{ base: "100%", md: "84px", lg: "100%" }}
                transition=".15s"
                _hover={{ bg: "black" }}
                textAlign="center"
                bg="facebook.300"
                p={2}
              >
                <Icon fontSize="1.5rem">
                  <TiSocialFacebook />
                </Icon>

                <Text fontWeight="bold">16,000</Text>
                <Text fontSize={{ base: "md", md: "sm", lg: "xs" }}>Fans</Text>
              </Box>
            </Link>
            <Link mute flex={{ base: 1, md: 0, lg: 1 }}>
              <Box
                w={{ base: "100%", md: "84px", lg: "100%" }}
                transition=".15s"
                _hover={{ bg: "black" }}
                textAlign="center"
                bg="twitter.400"
                p={2}
              >
                <Icon fontSize="1.5rem">
                  <TiSocialTwitter />
                </Icon>

                <Text fontWeight="bold">16,000</Text>
                <Text fontSize={{ base: "md", md: "sm", lg: "xs" }}>
                  Followers
                </Text>
              </Box>
            </Link>
            <Link mute flex={{ base: 1, md: 0, lg: 1 }}>
              <Box
                w={{ base: "100%", md: "84px", lg: "100%" }}
                transition=".15s"
                _hover={{ bg: "black" }}
                textAlign="center"
                bg="red.500"
                p={2}
              >
                <Icon fontSize="1.5rem">
                  <TiMediaPlay />
                </Icon>

                <Text fontWeight="bold">16,000</Text>
                <Text
                  fontSize={{ base: "md", md: "sm" }}
                  d={{ base: "block", lg: "none" }}
                >
                  Subs
                </Text>
                <Text fontSize="xs" d={{ base: "none", lg: "block" }}>
                  Subscribers
                </Text>
              </Box>
            </Link>
          </HStack>
        </Box>
      </Container>
}