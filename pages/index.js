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

const CustomerReview = () => (
  <Box
    flexShrink="0"
    shadow="md"
    rounded="md"
    p={4}
    my={4}
    bg="brand.white"
    mx={4}
    w={{ base: "300px", md: "350px" }}
  >
    <Text lineHeight="25px">
      I got my kitchen appliances from sweat Dreams and i love it. The size
      and length of the electronics are perfectly to what i have been longing
      for sometime. this is the third time i’m using it, i’ve never experience
      any form of electrical hazard. If you need a customer review, let me
      know. I’ll be happy to provide it. Thank you for this good product.
    </Text>

    <Flex
      mt={3}
      textAlign={{ base: "left", md: "right" }}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      alignItems="flex-end"
    >
      <Box color="brand.secondary">
        <Text m={0} type="nm-bold">
          Jame. S. Samuel
        </Text>

        <Text m={0}>Lesa Restaurant</Text>
      </Box>

      <Image
        src="/images/lg/customer-satisfaction.jpeg"
        border="1px"
        rounded="full"
        ml={2}
        w="65px"
        h="65px"
      />
    </Flex>
  </Box>
);

// A function that renders the content for `Kitchen` tab
const renderTabKitchenAppliancesContent = (
  <Flex
    flexDir={{ base: "column", md: "row" }}
    justifyContent="center"
    alignItems={{ base: "center", md: "stretch" }}
  >
    {/* Big Card */}
    <Flex
      flexDir="column"
      alignItems="center"
      textAlign="center"
      p={5}
      w={{ base: "300px", md: "400px" }}
      rounded="xl"
      bg="brand.white"
      border="1px"
      borderColor="brand.gray5"
      mr={{ md: 10 }}
      mb={{ base: 5, md: 0 }}
    >
      <Image
        mt="auto"
        w={{ base: "200px", md: "300px" }}
        h={{ base: "150px", md: "250px" }}
        mb={{ base: 4, md: 10 }}
        isProduct
        src="/images/lg/product 3.png"
      />

      <Heading w={{ base: "180px", md: "300px" }}>
        AddWash™, 10kg, Washer Dryer, 4 Ticks
      </Heading>

      <Text mb="auto" type="sm-regular" lineHeight="20px">
        Simply add during wash with AddWash door Wash & dry in 59 minute
      </Text>

      
    </Flex>

    {/* Small Cards */}
    <Flex flexDir="column" w="300px" rounded="lg">
      <Box
        d="grid"
        placeItems="center"
        textAlign="center"
        p={5}
        w="300px"
        h={{ base: "200px", md: "255px" }}
        flex="1"
        rounded="lg"
        bg="brand.white"
        border="1px"
        borderColor="brand.gray5"
        mb={{ base: 5, md: 10 }}
      >
        <Image
          w={{ base: "200px", md: "120px" }}
          h={{ base: "150px", md: "100px" }}
          isProduct
          mb={4}
          src="/images/lg/product 2.png"
        />

        <Heading w="180px">AddWash™, 10kg, Washer Dryer, 4 Ticks</Heading>

        {/* <Text type="sm-regular" lineHeight="20px">
          Simply add during wash with AddWash door Wash & dry in 59 minute
        </Text> */}

        
      </Box>
      <Box
        d="grid"
        placeItems="center"
        textAlign="center"
        p={5}
        w="300px"
        h={{ base: "200px", md: "255px" }}
        flex="1"
        rounded="lg"
        bg="brand.white"
        border="1px"
        borderColor="brand.gray5"
      >
        <Image
          w={{ base: "200px", md: "120px" }}
          h={{ base: "150px", md: "100px" }}
          isProduct
          mb={4}
          src="/images/lg/product 1.png"
        />

        <Heading w="180px">AddWash™, 10kg, Washer Dryer, 4 Ticks</Heading>

        {/* <Text type="sm-regular" lineHeight="20px">
          Simply add during wash with AddWash door Wash & dry in 59 minute
        </Text> */}

       
      </Box>
    </Flex>
  </Flex>
);

// The `Special Products`'s Tab data
const specialProductsTabData = [
  { header: "TV's", content: "TV's content" },
  {
    header: "Kitchen Appliances",
    content: renderTabKitchenAppliancesContent,
  },
  { header: "IT", content: "IT content" },
  { header: "Other Offers", content: "Other Offers content" },
];

const HomePage = () => {
  return (
    <Layout>
          <Container>


     

     

        {/* long text one col  
      <Section mb={20} px={6}>
        <Box>
          <Heading type="h6" mb={3}>
            Example Heading
          </Heading>

          <Box bg="brand.white" minH="100px">
          <Text>
            Example text free flowing lorem ipsum gypsum mia duis samplus sasa dus san kios dorumuis 
            vizz asap duikous aboamand dseakead fiankasd   Example text free flowing lorem ipsum gypsum mia duis samplus sasa dus san kios dorumuis 
            vizz asap duikous aboamand dseakead fiankasd  free flowing lorem ipsum gypsum mia duis
            </Text>

            <Text>
            Example text free flowing lorem ipsum gypsum mia duis samplus sasa dus san kios dorumuis 
            vizz asap duikous aboamand dseakead fiankasd   Example text free flowing lorem ipsum gypsum mia duis samplus sasa dus san kios dorumuis 
            vizz asap duikous aboamand dseakead fiankasd  free flowing lorem ipsum gypsum mia duis
            </Text>

            <Text>
            Example text free flowing lorem ipsum gypsum mia duis samplus sasa dus san kios dorumuis 
            vizz asap duikous aboamand dseakead fiankasd   Example text free flowing lorem ipsum gypsum mia duis samplus sasa dus san kios dorumuis 
            vizz asap duikous aboamand dseakead fiankasd  free flowing lorem ipsum gypsum mia duis
            </Text>

          </Box>
        </Box>
      </Section>*/}


      

          {/* Hero */}
      <Section
        maxW={breakpoints.xxl}
        bg="brand.primaryLight"
        px={6}
        py={{ base: 10, lg: 20 }}
      >
        <Flex justifyContent="center">
          <Flex alignItems="" mr={{ lg: 16 }}>
            <Box pt={6} pb={{ lg: "45px" }}>
              <Box maxW="500px">
                <Heading type="h1" as="h1" color="brand.secondary">
                Education ,Online learning ever evolving capacity and easy carreer pathfinder.
                  
                </Heading>

                <Text type="lg-regular" mb={{ base: 10, md: "30px" }}>
                 For remote jobs, office jobs and organizations tackling
                 unemployment by empowering entrepreneurs or supporting job seekers 
                 and vetting reputable employees, we have got you covered on our platform.
                </Text>
              </Box>
              <Link mute href="/signup">
                <Button variant="primary">Create an Account</Button>
              </Link>

              {/* <Box mt="30px">
                <Heading type="h5" mb={3}>
                  popular brands
                </Heading>

                <Box bg="rgba(0, 0, 0, 0.1)" minH="70px"></Box>
              </Box> */}
            </Box>
          </Flex>

          <Flex
            flexShrink={0}
            alignSelf="center"
            d={{ base: "none", lg: "flex" }}
            w={{ lg: "550px", xl: "600px" }}
            h={{ lg: "550px", xl: "600px" }}
            pos="relative"
          >
            <Image
              pos="absolute"
              w="100%"
              h="100%"
              src="/img/herolanding.jpg"
             boxShadow="-50px 50px 25px rgba(0, 0, 0, .08)"
            />
          </Flex>
        </Flex>
      </Section>

      {/* Why Patronize us? */}
      <Section px={6} pt={20} pb={{ base: 0, lg: 20 }}>
        <Flex maxW={{ lg: "1150px", xl: "1200px" }} mx="auto">
          <Heading type="h2" color="brand.secondary" maxW="400px">
            Why Patronize us? Learn More
          </Heading>
        </Flex>
      </Section>

      {/* Buy Now, Pay Later from any Mobile */}
      <Section py={20} maxW={breakpoints.xxl}>
        <Flex
          flexDir={{ base: "column", md: "row" }}
          justifyContent="center"
          px={6}
        >
          <Flex
            justifyContent={{ base: "center", md: "flex-start" }}
            flexShrink="0"
            mb={{ base: 5, md: 0 }}
            order={{ base: 0, md: 1 }}
            ml={{ md: 10, lg: 16 }}
            rounded="md"
          >
            <Image
              src="/images/lg/silver-dream-easy-payment-1.jpg"
              w={{ base: "280px", md: "325px", lg: "425px", xl: "525px" }}
              h={{ base: "335px", md: "400px", lg: "500px", xl: "600px" }}
              // boxShadow="-50px 50px 25px rgba(0, 0, 0, .03)"
            />
          </Flex>

          <Box textAlign="left" maxW="600px">
            <Heading type="h3" color="brand.secondary" mb={10} maxW="450px">
              Order Now, Pay Later from any Mobile.
            </Heading>

            <Box color="brand.black1">
              <Text type="lg-regular" mb={6}>
                Indemnify products you love against inflation. Pay as low as{" "}
                <Text type="lg-bold" as="span">
                 500
                </Text>{" "}
                instamentally upon initial deposit settlement using our ussd
                code{" "}
                <Text type="lg-bold" as="span">
                  *000#
                </Text>
                , on any mobile phone. Pay initial amount with ease even when
                product price increase.
              </Text>

              <Link href="/terms" color="brand.primary">
                Terms and conditions apply
              </Link>
            </Box>
          </Box>
        </Flex>
      </Section>

      {/* Earn as a marketer, Earn as a customer */}
      <Section py={20} maxW={breakpoints.xxl}>
        <Flex
          flexDir={{ base: "column", md: "row" }}
          justifyContent="center"
          px={6}
        >
          <Flex
            justifyContent={{ base: "center", md: "flex-start" }}
            flexShrink="0"
            mb={{ base: 5, md: 0 }}
            mr={{ md: 10, lg: 16 }}
            //
          >
            <Image
              src="/images/lg/landing-banner-image-2.jpeg"
              w={{ base: "280px", md: "325px", lg: "425px", xl: "525px" }}
              h={{ base: "335px", md: "400px", lg: "500px", xl: "600px" }}
              // boxShadow="50px 50px 25px rgba(0, 0, 0, .03)"
            />
          </Flex>

          <Box textAlign={{ base: "left", md: "right" }} maxW="600px">
            <Heading type="h3" color="brand.secondary" mb={10}>
              Earn as a marketer, Earn as a customer.
            </Heading>

            <Box color="brand.black1">
              <Text mb={6} type="lg-regular">
                Register as a company marketer and earn a{" "}
                <Text type="lg-bold" as="span">
                  5%
                </Text>{" "}
                commission when the people you refer buy our products, using your referral code.
                As a customer, you can also earn a{" "}
                <Text type="lg-bold" as="span">
                  3%
                </Text>{" "}
                commission when the people you refer to us make a purchase. Commission from referrals are payable into your
                virtual wallet.
              </Text>
            </Box>
          </Box>
        </Flex>
      </Section>

      {/* Online and offline store */}
      <Section py={20} maxW={breakpoints.xxl}>
        <Flex
          flexDir={{ base: "column", md: "row" }}
          justifyContent="center"
          px={6}
        >
          <Flex
            justifyContent={{ base: "center", md: "flex-start" }}
            flexShrink="0"
            mb={{ base: 5, md: 0 }}
            order={{ base: 0, md: 1 }}
            ml={{ md: 10, lg: 16 }}
          >
            <Image
              src="/images/lg/silver-dream-buy-online-offline.jpg"
              w={{ base: "280px", md: "325px", lg: "425px", xl: "525px" }}
              h={{ base: "335px", md: "400px", lg: "500px", xl: "600px" }}
              // boxShadow="-50px 50px 25px rgba(0, 0, 0, .03)"
            />
          </Flex>

          <Box textAlign="left" maxW="600px">
            <Heading type="h3" color="brand.secondary" mb={10} maxW="450px">
              Online and Offline Stores for your Convenience.
            </Heading>

            <Box color="brand.black1">
              <Text type="lg-regular" mb={6}>
                With an average daily offline purchase power of 5640, we remain
                your trusted companion for quality and affordable products. We
                bring quality and affordability closer to your home(s).
              </Text>
            </Box>

            <Box pt={8}>
              <Link mute href="/store">
                <Button variant="primary" mb={8}>
                  Explore our Products
                </Button>
              </Link>

              <Link
                href="/locations"
                d="flex"
                w="fit-content"
                alignItems="center"
                color="brand.primary"
              >
                <Text mb={0} mr={2}>
                  Locate a store near you
                </Text>

             
              </Link>
            </Box>
          </Box>
        </Flex>
      </Section>

      {/* Customer Satisfaction and Guarantee */}
      <Section py={20} maxW={breakpoints.xxl}>
        <Flex
          flexDir={{ base: "column", md: "row" }}
          justifyContent="center"
          px={6}
        >
          <Flex
            justifyContent={{ base: "center", md: "flex-start" }}
            flexShrink="0"
            mb={{ base: 5, md: 0 }}
            mr={{ md: 10, lg: 16 }}
          >
            <Image
              src="/images/lg/customer-satisfaction.jpeg"
              w={{ base: "280px", md: "325px", lg: "425px", xl: "525px" }}
              h={{ base: "335px", md: "400px", lg: "500px", xl: "600px" }}
              // boxShadow="50px 50px 25px rgba(0, 0, 0, .03)"
            />
          </Flex>

          <Box textAlign={{ base: "left", md: "right" }} maxW="600px">
            <Heading type="h3" color="brand.secondary" mb={10}>
              Customer Satisfaction and Guarantee.
            </Heading>

            <Box color="brand.black1" type="lg-regular">
              <Text mb={6} type="lg-regular">
                With over 3 years trading experience, we provide{" "}
                <Text as="span" type="lg-bold">
                  100%
                </Text>{" "}
                quality working products, certified by over{" "}
                <Text as="span" type="lg-bold">
                  1k+
                </Text>{" "}
                customers. Our word is indeed our bond come experience yourself.
              </Text>
            </Box>
          </Box>
        </Flex>
      </Section>

      {/* Customer stories */}
      <Section px={6} py={20} maxW={breakpoints.xxl}>
        <Box as="header" maxW={breakpoints.xl} mx="auto">
          <Heading type="h3" textAlign="center" color="brand.secondary">
            What our customers <br />are saying
          </Heading>

          <Text
            my={16}
            type="md-bold"
            d={{ base: "block", md: "none" }}
            type="md-regular"
          >
            Sliver Dreams is not But I must explain to you how all this mistaken
            idea of denouncing pleasure and praising.
          </Text>
        </Box>

        <Box as="main">
          <Flex overflowX="scroll" justifyContent="center" alignItems="center" px={{ md: 2 }} pb={5}>
            <CustomerReview />
            <CustomerReview />
            <CustomerReview />
          </Flex>
        </Box>
      </Section>

      {/* This Month's pick */}
      <Section py={20} maxW={breakpoints.xxl} textAlign="center">
        <Box maxW={breakpoints.xl} mx="auto" px={6}>
          <Heading type="h3" color="brand.secondary">
            This Month's Pick
          </Heading>

          <Flex flexDir="column" alignItems="center" justifyContent="center">
            <Image
              w={{ base: "315px", md: "650px", lg: "750px", xl: "1024px" }}
              h={{ base: "180px", md: "300px", lg: "380px", xl: "500px" }}
              src="/images/lg/This Month's pick.png"
            />

            <Box mt={4}>
              <Link mute href="/store">
                <Button variant="primary">Explore our Products</Button>
              </Link>
            </Box>
          </Flex>
        </Box>
      </Section>

      {/* Special products */}
      {/* <Section
        bg="brand.secondaryLight"
        py={20}
        maxW={breakpoints.xxl}
        textAlign="center"
      >
        <Box maxW={breakpoints.xl} mx="auto" px={6}>
          <Heading type="h3" color="brand.secondary">
            Special Products
          </Heading>

          <Tab
            activeHeader="Kitchen Appliances"
            secondaryActiveBg
            data={specialProductsTabData}
            bg="brand.secondaryLight"
          />
        </Box>
      </Section> */}
    
              {/* Last Section */}
      <Section>
        <Flex py={10} bg="brand.white" flexDir={{ base: "column", md: "row" }}>
          <Box px={10}>
            <Heading mb={{ base: 0, md: 5 }}>Delivery</Heading>

            <Text>
              Our courier delivery will safely deliver your order right next to
              your door
            </Text>
          </Box>

          <Box px={10} borderLeft={{ base: "0", md: "1px solid #eee" }}>
            <Heading mb={{ base: 0, md: 5 }}>Warranty</Heading>

            <Text>
              Certified equipment with on official guarantee from the
              manufacturer.
            </Text>
          </Box>

          <Box px={10} borderLeft={{ base: "0", md: "1px solid #eee" }}>
            <Heading mb={{ base: 0, md: 5 }}>Payment</Heading>

            <Text>
              You can pay for your purchase in cash, by card, by bank transfer
              or installmentally.
            </Text>
          </Box>

          <Box px={10} borderLeft={{ base: "0", md: "1px solid #eee" }}>
            <Heading mb={{ base: 0, md: 5 }}>Return</Heading>

            <Text>
              Returns are made within 14 days after purchase, in accordance with
              applicable law.
            </Text>
          </Box>
        </Flex>
      </Section>

      </Container>
         
    </Layout>

     
  );
};

export default HomePage;
