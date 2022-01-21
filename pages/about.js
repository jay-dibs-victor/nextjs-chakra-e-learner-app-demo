import {
    Box,
    Button,
    Center,
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




import { Image } from "components/shared/blocks/Image";
import Layout, { Container } from "components/shared/blocks/Layout";
import { Link } from "components/shared/blocks/Link";
import dateFormat from "dateformat";
import { TiMediaPlay, TiSocialFacebook, TiSocialTwitter } from "react-icons/ti";
import { GoThreeBars } from "react-icons/go";

import { Swiper, SwiperSlide } from "swiper/react";
// // import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper/core";
import breakpoints  from "core/theme/breakpoints";

export const Section = ({ children, ...rest }) => {
    return (
      <Box
        as="section"
        px={{ base: 2, sm2: 6 }}
        maxW={breakpoints.xl}
        mx="auto"
        {...rest}
      >
        {children}
      </Box>
    );
  };
  
  const HomePage = () => {
    return (
      <Layout>




            {/* Hero */}
      <Section
        maxW={breakpoints.xxl}
        bg="linear-gradient(to right, #5379b1, #f87e83)"
        px={6}
        py={{ base: 10, lg: 20 }}
        mt="-20px"
   
      >
        <Flex justifyContent="center" >
          <Flex alignItems="" mr={{ lg: 16 }}>
            <Box pt={6} pb={{ lg: "45px" }} color="white">
              <Box maxW="500px">
                <Heading type="h1" as="h1" color="brand.secondary">
                Education ,Job portal, Online learning Saas.
                  
                </Heading>

                <Text type="lg-regular" mb={{ base: 10, md: "30px" }}>
                Learna provides tools and resources to help instructors and organizations that are looking to create robust online learning programs. From structured certificate programs to simple 
                "how-to" courses, we enable you offer your classes to millions of participants online.
                </Text>
              </Box>
              <Link mute href="/signup">
                <Button variant="primary">Create an Account</Button>
              </Link>

          
            </Box>
          </Flex>

          <Flex
            flexShrink={0}
            alignSelf="center"
            d={{ base: "none", lg: "flex" }}
            w={{ lg: "550px", xl: "600px" }}
            h={{ lg: "350px", xl: "400px" }}
            pos="relative"
          >
            <Image
              pos="absolute"
              w="100%"
              h="300px"
              src="/img/herolanding.jpg"
             boxShadow="-50px 50px 25px rgba(0, 0, 0, .08)"
            />
          </Flex>
        </Flex>
      </Section>


      <Section px={6} pt={20} pb={{ base: 0, lg: 20 }}>
        <Flex justifyContent="center" maxW={{ lg: "1150px", xl: "1200px" }} mx="auto">
          <Heading type="h2" color="brand.secondary" maxW="900px">
          Learn at your own pace, hire a reputable vetted  responsive employer and lots more...

          </Heading>

          
        </Flex><br/>

        <Center>
        <Text>Looking to build entrepreneurship programs that ensure a conscious approach 
            is applied towards developing ideas into startups and startups into profitable businesses? 
            Leverage ImpactXplorer to build intelligent processes that assess,
             train and support entrepreneurs on their path towards building scalable businesses.</Text>
        </Center>
      </Section>





        {/* First Section */}
  
        <Container as="section">
          <Grid
            templateColumns={{
              base: "1fr",
              md: "1fr 1fr .9fr 1.1fr",
              lg: "1fr 1fr 1fr 1fr",
            }}
            columnGap={{ md: 5 }}
            rowGap={10}
            mb={10}
          >
            <GridItem colSpan={{ base: 1, md: 2 }}>
              <LG_StackCard badge="news" />
            </GridItem>
  
            <GridItem>
              <MiniSection>
                <MD_StackCard
                  boxShadow={'2xl'}
                  rounded={'md'}
                  badge="business"
                  title="Learna provides tools and resources to help instructors and organizations that are looking to create robust online learning programs. From structured certificate programs to simple how-to courses, we enable you offer your classes to millions of participants online."
                />
  
                <MD_StackCard
                 boxShadow="-50px 50px 25px rgba(0, 0, 0, .08)"
                  badge="arts"
                  title="Our advanced course development platform helps you create classes that can be taken on the web and on all internet-enabled mobile devices by anyone, anywhere in the world, at the same time. Ideal for training organizations and individual instructors as well."
                />
  
                <MD_StackCard
                 boxShadow="-50px 50px 25px rgba(0, 0, 0, .08)"
                  badge="politics"
                  title="Traditional training institutions looking to create online courses or workshops ."
                />
              </MiniSection>
            </GridItem>
  
            <GridItem>
              <Stack spacing={5}>
                <MiniSection title="Editor Picks">
                  <SM_ListCard title="Learna provides easy-to-use tools for creating and delivering expert masterclasses online. Learna is suitable for learning organizations, individual instructors, especially industry experts, who are looking to create online programs." />
                </MiniSection>
  
               
  
                <MiniSection title="Business">
                  <SM_ListCard title="For groups with common learning interests who may already be familiar with each other e.g church cell groups, sunday school classes, school study groups, training groups for units/departments within an organization etc." />
                  <SM_ListCard title="For industry experts or anyone else looking to create a masterclass (or series of masterclasses) on topics they are knowledgable and/or passionate about." />
                  <SM_ListCard title="Jen Kendall Kicked off American Airlines First Flight" />
                </MiniSection>
              </Stack>
            </GridItem>
          </Grid>
        </Container>
  
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
              Subscribe to our job posting
            </Heading>
  
            <MoreText
              text="To be updated with all the latest news,jobs offers and special announcements."
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
  
               <Container as="section" wider pos="relative">
          <Box
            bg="purple.800"
            pos="absolute"
            top={0}
            left={0}
            w="100%"
            h={{ base: 223, md: 130, lg: 200 }}
          ></Box>
  
          <Container pos="relative" zIndex={1} px={0}>
            <Box color="white" pt={{ base: 4, lg: 10 }}>
              <Heading
                fontSize={{ base: "3xl", lg: "5xl" }}
                mb={{ base: 1, xl: 3 }}
              >
               Brief
              </Heading>
              <Text>
              Learna allows me the flexibility I need while also providing the tools that help me create comprehensive courses that are engaging and fulfilling for my participants.
              </Text>
            </Box>
  
            <Grid
              templateColumns={{
                base: "1fr",
                md: "1.35fr 1.65fr",
                xl: "1.25fr 1.75fr",
              }}
              columnGap={{ base: 2, md: 3, lg: 5 }}
              rowGap={{ base: 5, xl: 10 }}
              mb={10}
              mt={{ base: 7, lg: 0 }}
            >
             
            </Grid>
          </Container>
        </Container>
  
      
      </Layout>
    );
  };
  
  const LG_StackCard = ({
    badge,
    imageBadge,
    revereHeader,
    moreText = true,
    ...rest
  }) => {
    const renderHeader = () => (
      <Box mb={3}>
        {!imageBadge && <Badge text="news" />}
  
        <TitleText
          text={`Leveraging Artificial Intelligence for profit, and social good .`}
          size={{ base: "4xl", xl: "4xl" }}
        />
  
        <DateText text="Ace Trace is a technology company that develops AI-powered SaaS (Software-as-a-service) platforms for learning and workforce development. Governments, social impact organizations, and businesses leverage our cutting-edge digital platforms to build or run their learning and workforce development activities." />
      </Box>
    );
  
    return (
      <Box pb={5} mb={{ base: 5, md: 0 }} {...rest}>
        {!revereHeader && renderHeader()}
  
        <CardImage
          w="100%"
          h={{
            base: "230px",
            sm: "300px",
            md: "260px",
            lg: "400px",
            xl: "500px",
          }}
          src="/img/talentsource.jpg"
          badge={imageBadge && badge}
          wrapperProps={{ mb: 3 }}
        />
  
        {revereHeader && renderHeader()}
  
        {moreText && (
          <MoreText text="We empower and support governments, businesses, and everyday people to harness the power of AI." />
        )}
      </Box>
    );
  };
  
  const MD_StackCard = ({ badge, title, imageProps }) => (
    <Box mb={{ base: 5, md: 0 }}>
      <CardImage
        w="100%"
        h={{ base: "150px", md: "73.19px", lg: "100px" }}
        src="/img/skillacquisition.jpg"
        badge={badge}
        {...imageProps}
      />
  
      <TitleText size={{ base: "lg", md: "sm" }} text={title} my={2} />
  
      <DateText />
    </Box>
  );
  
  const MD_ListCard = ({ badge, title }) => (
    <Flex mb={{ base: 5, md: 0 }}>
      <Box>
        <CardImage
          w={{ base: "100px", md: "127px", lg: "168px", xl: "280px" }}
          h={{ base: "70px", md: "76px", lg: "100px", xl: "170px" }}
          src="/img/matchingemployees.jpg"
          badge={badge}
        />
      </Box>
  
      <Box
        borderTop="1px"
        borderColor="gray.100"
        p={{ base: 1, lg: 2 }}
        ml={{ base: 2, md: 1, lg: 3 }}
      >
        <TitleText
          size={{ base: "sm", xl: "lg" }}
          mb={{ base: 1, xl: 2 }}
          text={title}
        />
  
        <DateText mb={{ xl: 5 }} />
  
        <MoreText
          d={{ base: "none", xl: "block" }}
          text="The main thing that you have to remember on this journey is just be nice to everyone and always smile. Refreshingly, what was expected of her was the..."
        />
      </Box>
    </Flex>
  );
  
  const SM_ListCard = ({ title, imageIsRound = "full", noImage, ...rest }) => (
    <Flex {...rest}>
      <Box mr={{ base: 2, md: 5 }}>
        <TitleText
          size={{ base: "lg", md: "xs", lg: "sm" }}
          text={title}
          mb={1}
        />
  
        <DateText d={{ md: "none", lg: "block" }} />
      </Box>
  
      {!noImage && (
        <CardImage
          wrapperProps={{
            flexShrink: 0,
          }}
          boxSize={{ base: "64px", md: 45, lg: 50, xl: 78 }}
          src="/img/news.jpg"
          rounded={imageIsRound}
        />
      )}
    </Flex>
  );
  
  const AdCard = ({ imageProps, ...rest }) => (
    <Flex flexDir="column" alignItems="center" {...rest}>
      <Text
        textAlign="center"
        opacity=".7"
        fontSize={{ base: "sm", md: "xs" }}
        mb={1}
      >
        - Advertisement -
      </Text>
  
      <CardImage
        w={{ base: 280, sm: 300, md: 166, lg: 200, xl: 300 }}
        h={{ base: 280, sm: 300, md: 166, lg: 200, xl: 300 }}
        src="/img/shoes.jpg"
        {...imageProps}
      />
    </Flex>
  );
  
  const CardImage = ({ wrapperProps, badge, w, h, src, ...rest }) => (
    <Box w={w} h={h} pos="relative" {...wrapperProps}>
      <Image w="100%" h="100%" src={src} {...rest} />
      {badge && (
        <Badge pos="absolute" bottom={0} left={0} zIndex={1} text={badge} />
      )}
    </Box>
  );
  
  const Badge = ({ text, ...rest }) => (
    <Text
      whiteSpace="nowrap"
      wordBreak="keep-all"
      p={1}
      lineHeight={1}
      fontSize="xx-small"
      fontWeight={500}
      letterSpacing={1}
      bg="purple.800"
      color="white"
      textTransform="uppercase"
      w="fit-content"
      {...rest}
    >
      {text}
    </Text>
  );
  
  const TitleText = ({ text, size = "2xl", ...rest }) => (
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
    size = { base: "sm", md: "xs" },
    ...rest
  }) => (
    <Text fontStyle="italic" fontSize={size} {...rest}>
      {text}
      {text && " - "}
      {dateFormat(date, "fullDate")}
    </Text>
  );
  
  const MoreText = ({ text, size = "sm", ...rest }) => (
    <Text fontWeight={{ xl: "bold" }} fontSize={size} {...rest}>
      {text}
    </Text>
  );
  
  const MiniSection = ({ title, titleProps, children, moreButton, ...rest }) => {
    return (
      <Box {...rest}>
        <Stack spacing={{ base: 4, xl: 6 }}>
          {title && (
            <Heading
              fontSize={{ base: "xl", md: "lg" }}
              color="purple.800"
              {...titleProps}
            >
              {title}
            </Heading>
          )}
          {children}
        </Stack>
  
        {moreButton && (
          <Button
            rightIcon={<GoThreeBars />}
            size="sm"
            bg="black"
            color="white"
            rounded="sm"
            _hover={{ bg: "purple.800" }}
            w="fit-content"
            mt={8}
          >
            More from {title}
          </Button>
        )}
      </Box>
    );
  };
  
  export default HomePage;
  