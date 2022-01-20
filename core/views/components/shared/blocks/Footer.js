import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import dateFormat from "dateformat";
import {
  TiSocialFacebook,
  TiSocialTwitter,
  TiSocialInstagram,
  TiSocialYoutube,
} from "react-icons/ti";
import { FiChevronsUp } from "react-icons/fi";
import Brand from "./Brand";
import { Image } from "./Image";
import { Link } from "./Link";
import { Container } from "./Layout";

const Footer = () => {
  return (
    <Box pos="relative" bg="#fff" color="#000">
      <Image
        filter="brightness(20%)"
        pos="absolute"
        w="100%"
        h="100%"
        src="/img/logo-company.jpg"
      />

      <Box color="black" pos="relative" zIndex={1}>
        <Container pb={10}>
          <Grid
            templateColumns={{
              base: "1fr",
              md: "1fr 1fr",
              lg: "1.9fr .7fr .7fr 1.2fr",
            }}
            rowGap={10}
            pt={16}
            px={5}
            pb={3}
          >
            <GridItem>
              <Box w="200px">
                <Brand size="3xl" />

                <Text fontSize={{ base: "md", md: "sm", lg: "xs" }} my={4}>
                  © Goom LLC, SINCE 1999
                </Text>

                <HStack spacing="2">
                  <Link>
                    <Icon fontSize={{ base: "1.65rem", md: "1.5rem" }}>
                      <TiSocialFacebook />
                    </Icon>
                  </Link>
                  <Link>
                    <Icon fontSize={{ base: "1.65rem", md: "1.5rem" }}>
                      <TiSocialTwitter />
                    </Icon>
                  </Link>
                  <Link>
                    <Icon fontSize={{ base: "1.65rem", md: "1.5rem" }}>
                      <TiSocialInstagram />
                    </Icon>
                  </Link>
                  <Link>
                    <Icon fontSize={{ base: "1.65rem", md: "1.5rem" }}>
                      <TiSocialYoutube />
                    </Icon>
                  </Link>
                </HStack>
              </Box>
            </GridItem>

            <GridItem>
              <Heading
                as="h6"
                fontSize={{ base: "xl", md: "lg" }}
                color="black.500"
                mb={5}
              >
                About Us
              </Heading>

              <Stack spacing={1}>
                <Link
                  mute
                  fontSize={{ base:"1xl", md: "xs", lg: "xx-small" }}
                  textTransform="uppercase"
                  letterSpacing={1}
                  _hover={{ color: "black.500" }}
                >
                  Services
                </Link>
                <Link
                  mute
                  fontSize={{ base:"1xl", md: "xs", lg: "xx-small" }}
                  textTransform="uppercase"
                  letterSpacing={1}
                  _hover={{ color: "black.500" }}
                >
                  Join us
                </Link>
                <Link
                  mute
                  fontSize={{ base:"1xl", md: "xs", lg: "xx-small" }}
                  textTransform="uppercase"
                  letterSpacing={1}
                  _hover={{ color: "black.500" }}
                >
                  career opportunities
                </Link>
                <Link
                  mute
                  fontSize={{ base:"1xl", md: "xs", lg: "xx-small" }}
                  textTransform="uppercase"
                  letterSpacing={1}
                  _hover={{ color: "black.500" }}
                >
                  Link here
                </Link>
                <Link
                  mute
                  fontSize={{ base:"1xl", md: "xs", lg: "xx-small" }}
                  textTransform="uppercase"
                  letterSpacing={1}
                  _hover={{ color: "black.500" }}
                >
                  Link here
                </Link>
                <Link
                  mute
                  fontSize={{ base:"1xl", md: "xs", lg: "xx-small" }}
                  textTransform="uppercase"
                  letterSpacing={1}
                  _hover={{ color: "black.500" }}
                >
                  Link here
                </Link>
              </Stack>
            </GridItem>

            <GridItem>
              <Heading
                as="h6"
                fontSize={{ base: "xl", md: "lg" }}
                color="black500"
                mb={5}
              >
                Sitemaps
              </Heading>

              <Stack spacing={1}>
                <Link
                  mute
                  fontSize={{ base:"1xl", md: "xs", lg: "xx-small" }}
                  textTransform="uppercase"
                  letterSpacing={1}
                  _hover={{ color: "black500" }}
                >
                  Link here
                </Link>
                <Link
                  mute
                  fontSize={{ base:"1xl", md: "xs", lg: "xx-small" }}
                  textTransform="uppercase"
                  letterSpacing={1}
                  _hover={{ color: "black500" }}
                >
                  Link here
                </Link>
                <Link
                  mute
                  fontSize={{ base:"1xl", md: "xs", lg: "xx-small" }}
                  textTransform="uppercase"
                  letterSpacing={1}
                  _hover={{ color: "black500" }}
                >
                  Link here
                </Link>
                <Link
                  mute
                  fontSize={{ base:"1xl", md: "xs", lg: "xx-small" }}
                  textTransform="uppercase"
                  letterSpacing={1}
                  _hover={{ color: "black500" }}
                >
                  Link here
                </Link>
                <Link
                  mute
                  fontSize={{ base:"1xl", md: "xs", lg: "xx-small" }}
                  textTransform="uppercase"
                  letterSpacing={1}
                  _hover={{ color: "black500" }}
                >
                  Link here
                </Link>
                <Link
                  mute
                  fontSize={{ base:"1xl", md: "xs", lg: "xx-small" }}
                  textTransform="uppercase"
                  letterSpacing={1}
                  _hover={{ color: "black500" }}
                >
                  Link here
                </Link>
              </Stack>
            </GridItem>

            <GridItem>
              <Heading
                as="h6"
                fontSize={{ base: "xl", md: "lg" }}
                color="black500"
                mb={5}
              >
               Link here
              </Heading>

              <Stack spacing={5}>
                <SM_ListCard
                  title="We are globally awesome in react"
                  imageIsRound={false}
                />

                <SM_ListCard
                  title="We are now  working internationally at silicon valleys"
                  imageIsRound={false}
                />
              </Stack>
            </GridItem>
          </Grid>
        </Container>

        <Flex justifyContent="flex-end" pos="fixed" bottom={1} right={1}>
          <Link href="?top=true">
            <Button rounded="sm" size="sm" fontSize="xl" colorScheme="purple">
              <FiChevronsUp />
            </Button>
          </Link>
        </Flex>
      </Box>
    </Box>
  );
};

const SM_ListCard = ({ title, imageIsRound = "full", noImage, ...rest }) => (
  <Flex {...rest}>
    <Box mr={5}>
      <TitleText size={{ base: "md", md: "sm" }} text={title} mb={1} />

      <DateText />
    </Box>

    {!noImage && (
      <CardImage
        wrapperProps={{
          flexShrink: 0,
        }}
        boxSize={50}
        src="/img/news.jpg"
        rounded={imageIsRound}
      />
    )}
  </Flex>
);

const CardImage = ({ wrapperProps, w, h, src, ...rest }) => (
  <Box w={w} h={h} pos="relative" {...wrapperProps}>
    <Image w="100%" h="100%" src={src} {...rest} />
  </Box>
);

const TitleText = ({ text, size ="1xl", ...rest }) => (
  <Heading
    fontSize={size}
    fontFamily="Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"
    {...rest}
  >
    {text}
  </Heading>
);

const DateText = ({
  date = Date.now(),
  text,
  size = { base:"1xl", md: "xs" },
  ...rest
}) => (
  <Text fontStyle="italic" fontSize={size} {...rest}>
    {text}
    {text && " - "}
    {dateFormat(date, "fullDate")}
  </Text>
);

export default Footer;
