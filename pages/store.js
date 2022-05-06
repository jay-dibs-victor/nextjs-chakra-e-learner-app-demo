

import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  SimpleGrid,
  Icon,
  Stack,
  useColorModeValue,
  Container,
} from "@chakra-ui/react";
import { Layout, Section } from "components/components/pages";
import { ProductCards } from "components/shared/lib";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination, Navigation, EffectFade } from "swiper/core";
import { motion } from "framer-motion";
import { HiTruck, HiShieldCheck, HiCreditCard, HiRefresh } from "react-icons/hi";

SwiperCore.use([Autoplay, Pagination, Navigation, EffectFade]);

const MotionBox = motion(Box);

const Feature = ({ title, text, icon }) => {
  return (
    <Stack
      align={"center"}
      textAlign={"center"}
      p={8}
      bg={useColorModeValue("white", "gray.700")}
      rounded={"xl"}
      shadow={"sm"}
      _hover={{ shadow: "md", transform: "translateY(-5px)" }}
      transition={"all 0.3s ease"}
    >
      <Flex
        w={16}
        h={16}
        align={"center"}
        justify={"center"}
        color={"white"}
        rounded={"full"}
        bg={"blue.400"}
        mb={1}
      >
        <Icon as={icon} w={8} h={8} />
      </Flex>
      <Text fontWeight={600} fontSize="lg">{title}</Text>
      <Text color={"gray.600"}>{text}</Text>
    </Stack>
  );
};

const StorePage = () => {
  const bannerBg = useColorModeValue("gray.100", "gray.900");

  return (
    <Layout withFooterEmailSection bg={useColorModeValue("gray.50", "gray.800")}>
      {/* Hero Carousel */}
      <Box mb={20}>
        <Swiper
          spaceBetween={0}
          effect={"fade"}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          navigation={true}
          className="main-swiper"
        >
          <SwiperSlide>
            <Box
              h={{ base: "400px", md: "600px" }}
              bgImage="url('/img/banner-1.png')"
              bgSize="cover"
              bgPosition="center"
              display="flex"
              alignItems="center"
            >
              <Container maxW="container.xl">
                <MotionBox
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  maxW="lg"
                  bg="whiteAlpha.800"
                  p={8}
                  rounded="2xl"
                  backdropFilter="blur(10px)"
                >
                  <Heading size="2xl" mb={4} color="gray.800">Premium Home Office</Heading>
                  <Text fontSize="xl" color="gray.700">
                    Transform your workspace with our curated selection of high-end furniture and tech.
                  </Text>
                </MotionBox>
              </Container>
            </Box>
          </SwiperSlide>
          <SwiperSlide>
            <Box
              h={{ base: "400px", md: "600px" }}
              bgImage="url('/img/banner-2.png')"
              bgSize="cover"
              bgPosition="center"
              display="flex"
              alignItems="center"
            >
              <Container maxW="container.xl">
                <MotionBox
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  maxW="lg"
                  bg="blackAlpha.700"
                  p={8}
                  rounded="2xl"
                  backdropFilter="blur(10px)"
                  color="white"
                >
                  <Heading size="2xl" mb={4}>Next-Gen Tech</Heading>
                  <Text fontSize="xl" opacity={0.9}>
                    Stay ahead of the curve with the latest gadgets and accessories for your digital life.
                  </Text>
                </MotionBox>
              </Container>
            </Box>
          </SwiperSlide>
        </Swiper>
      </Box>

      {/* Featured Products */}
      <Section mb={20}>
        <VStack spacing={2} mb={10}>
          <Heading textAlign="center">Latest Collections</Heading>
          <Text color="gray.500">Discover our newest arrivals curated just for you</Text>
        </VStack>
        <ProductCards mb={10} />
      </Section>

      {/* Promotional Section */}
      <Box py={20} bg={"blue.500"} mb={20} color="white">
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} align="center">
            <VStack align="start" spacing={5} justify="center">
              <Heading size="2xl">Summer Sale is Live!</Heading>
              <Text fontSize="xl">Get up to 40% off on selected premium items. Limited time offer.</Text>
            </VStack>
            <Flex justify="center" align="center">
               <Box p={8} border="4px solid white" rounded="3xl">
                  <Heading size="4xl">40% OFF</Heading>
               </Box>
            </Flex>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Another Product Grid */}
      <Section mb={20}>
        <Heading mb={10}>Trending Now</Heading>
        <ProductCards mb={10} />
      </Section>

      {/* Features / Benefits */}
      <Box py={20} bg={useColorModeValue("gray.100", "gray.900")}>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
            <Feature
              icon={HiTruck}
              title={"Fast Delivery"}
              text={"Secure and prompt delivery to your doorstep within 48 hours."}
            />
            <Feature
              icon={HiShieldCheck}
              title={"Secure Warranty"}
              text={"All premium items come with a 2-year comprehensive warranty."}
            />
            <Feature
              icon={HiCreditCard}
              title={"Flexible Payment"}
              text={"Pay via card, wallet, or choose our easy installment plans."}
            />
            <Feature
              icon={HiRefresh}
              title={"14-Day Returns"}
              text={"Easy and hassle-free returns if you're not completely satisfied."}
            />
          </SimpleGrid>
        </Container>
      </Box>
    </Layout>
  );
};

const VStack = ({ children, ...props }) => <Stack direction="column" {...props}>{children}</Stack>;

export default StorePage;

