
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
  VStack,
  HStack,
  Button,
  Circle,
  Badge,
} from "@chakra-ui/react";
import { Layout, Section } from "components/components/pages";
import { ProductCards } from "components/shared/lib";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination, Navigation, EffectFade } from "swiper/core";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/effect-fade/effect-fade.min.css";
import "swiper/components/navigation/navigation.min.css";
import { motion } from "framer-motion";
import { HiTruck, HiShieldCheck, HiCreditCard, HiRefresh, HiArrowRight, HiSparkles } from "react-icons/hi";

SwiperCore.use([Autoplay, Pagination, Navigation, EffectFade]);

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);

const Feature = ({ title, text, icon }) => {
  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.50", "gray.700");
  const iconBg = useColorModeValue("blue.50", "blue.900");

  return (
    <Stack
      align={"center"}
      textAlign={"center"}
      p={10}
      bg={bg}
      rounded={"3xl"}
      shadow={"xl"}
      borderWidth="1px"
      borderColor={borderColor}
      _hover={{ shadow: "2xl", transform: "translateY(-8px)" }}
      transition={"all 0.4s cubic-bezier(.175,.885,.32,1.275)"}
    >
      <Circle
        size={16}
        bg={iconBg}
        color={"blue.500"}
        mb={4}
      >
        <Icon as={icon} w={8} h={8} />
      </Circle>
      <Text fontWeight="black" fontSize="xl" letterSpacing="tight">{title}</Text>
      <Text color={"gray.500"} fontSize="sm">{text}</Text>
    </Stack>
  );
};

const StorePage = () => {
  const bgColor = useColorModeValue("gray.50", "gray.900");

  return (
    <Layout withFooterEmailSection bg={bgColor}>
      {/* Hero Carousel */}
      <Box mb={24} position="relative">
        <Swiper
          spaceBetween={0}
          effect={"fade"}
          pagination={{ 
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={{ 
            delay: 5000, 
            disableOnInteraction: false 
          }}
          navigation={true}
          className="main-swiper"
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
        >
          <SwiperSlide>
            <Box
              h={{ base: "500px", md: "800px" }}
              bgImage="url('/img/banner-1.png')"
              bgSize="cover"
              bgPosition="center"
              display="flex"
              alignItems="center"
              position="relative"
            >
              <Box position="absolute" inset={0} bgGradient="linear(to-r, blackAlpha.700, transparent)" />
              <Container maxW="full" px={{ base: 6, lg: 24 }} position="relative" zIndex={1}>
                <VStack
                  align="start"
                  spacing={8}
                  maxW="2xl"
                  p={{ base: 6, md: 0 }}
                >
                  <Badge colorScheme="blue" variant="solid" px={4} py={1} rounded="full" letterSpacing="widest">NEW COLLECTION 2022</Badge>
                  <VStack align="start" spacing={4}>
                    <Heading size="4xl" color="white" lineHeight="1" fontWeight="black" letterSpacing="tight">
                      Elevate Your <Text as="span" color="blue.400">Home Office</Text>
                    </Heading>
                    <Text fontSize="xl" color="whiteAlpha.900" fontWeight="medium" maxW="lg">
                      Discover the perfect balance of ergonomics and aesthetics with our new premium series.
                    </Text>
                  </VStack>
                  <Button
                    size="lg"
                    colorScheme="blue"
                    rightIcon={<HiArrowRight />}
                    rounded="full"
                    px={12}
                    h={16}
                    fontSize="lg"
                    shadow="2xl"
                    _hover={{ transform: "translateY(-4px)", shadow: "dark-lg" }}
                  >
                    Shop Collection
                  </Button>
                </VStack>
              </Container>
            </Box>
          </SwiperSlide>
          <SwiperSlide>
            <Box
              h={{ base: "500px", md: "800px" }}
              bgImage="url('/img/banner-2.png')"
              bgSize="cover"
              bgPosition="center"
              display="flex"
              alignItems="center"
              position="relative"
            >
              <Box position="absolute" inset={0} bgGradient="linear(to-r, blackAlpha.800, transparent)" />
              <Container maxW="full" px={{ base: 6, lg: 24 }} position="relative" zIndex={1}>
                <VStack
                  align="start"
                  spacing={8}
                  maxW="2xl"
                  p={{ base: 6, md: 0 }}
                >
                   <HStack color="blue.400">
                    <Icon as={HiSparkles} />
                    <Text fontWeight="bold" letterSpacing="widest">EXCLUSIVE TECH</Text>
                  </HStack>
                  <VStack align="start" spacing={4}>
                    <Heading size="4xl" color="white" lineHeight="1" fontWeight="black" letterSpacing="tight">
                      The Next Gen <Text as="span" color="blue.400">Workspace</Text>
                    </Heading>
                    <Text fontSize="xl" color="whiteAlpha.900" fontWeight="medium" maxW="lg">
                      Cutting-edge gadgets and seamless integration for the high-performance professional.
                    </Text>
                  </VStack>
                  <Button
                    size="lg"
                    colorScheme="blue"
                    rightIcon={<HiArrowRight />}
                    rounded="full"
                    px={12}
                    h={16}
                    fontSize="lg"
                    shadow="2xl"
                    _hover={{ transform: "translateY(-4px)", shadow: "dark-lg" }}
                  >
                    Explore Gadgets
                  </Button>
                </VStack>
              </Container>
            </Box>
          </SwiperSlide>
        </Swiper>
      </Box>

      {/* Featured Products */}
      <Box px={{ base: 6, lg: 12 }}>
        <Section mb={24} maxW="full">
          <VStack spacing={3} mb={16} textAlign="center">
            <Badge colorScheme="blue" variant="subtle" px={4} py={1} rounded="full">Editor&apos;s Choice</Badge>
            <Heading size="2xl" fontWeight="black">Latest Collections</Heading>
            <Text color="gray.500" fontSize="lg">Discover our newest arrivals curated for the modern minimalist</Text>
          </VStack>
          <ProductCards mb={12} maxW="full" />
        </Section>
      </Box>

      {/* Promotional Section */}
      <Box py={24} bg={"blue.600"} mb={24} position="relative" overflow="hidden">
        <Box position="absolute" top="-10%" right="-5%" w="40%" h="120%" bg="whiteAlpha.100" rounded="full" blur="80px" />
        <Container maxW="full" px={{ base: 6, lg: 24 }} position="relative">
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={16}>
            <VStack align="start" spacing={8} justify="center" color="white">
              <VStack align="start" spacing={2}>
                <Text fontWeight="bold" letterSpacing="widest" opacity={0.8}>SEASONAL EVENT</Text>
                <Heading size="3xl" fontWeight="black">Summer Sale is Live!</Heading>
              </VStack>
              <Text fontSize="xl" opacity={0.9}>
                Upgrade your lifestyle with up to <Text as="span" fontWeight="bold" color="blue.200">40% off</Text> on selected premium items. Offer ends soon.
              </Text>
              <Button size="lg" bg="white" color="blue.600" rounded="full" px={12} h={14} fontWeight="bold" _hover={{ bg: "blue.50", transform: "scale(1.05)" }} transition="all 0.2s">
                Claim Offer
              </Button>
            </VStack>
            <Flex justify="center" align="center">
               <MotionBox
                 animate={{ scale: [1, 1.05, 1] }}
                 transition={{ duration: 4, repeat: Infinity }}
                 p={12}
                 border="8px solid white"
                 rounded="full"
                 textAlign="center"
                 color="white"
                 bg="whiteAlpha.100"
                 backdropFilter="blur(10px)"
               >
                  <Text fontSize="xl" fontWeight="bold">UP TO</Text>
                  <Heading size="4xl" fontWeight="black">40%</Heading>
                  <Text fontSize="2xl" fontWeight="black">OFF</Text>
               </MotionBox>
            </Flex>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Trending Section */}
      <Box px={{ base: 6, lg: 12 }}>
        <Section mb={24} maxW="full">
          <HStack mb={12} justify="space-between" align="end">
            <VStack align="start" spacing={1}>
              <Heading size="xl" fontWeight="black">Trending Now</Heading>
              <Text color="gray.500">Most loved products by our community this week</Text>
            </VStack>
            <Button variant="link" colorScheme="blue" rightIcon={<HiArrowRight />}>Explore All</Button>
          </HStack>
          <ProductCards mb={10} maxW="full" />
        </Section>
      </Box>

      {/* Features Grid */}
      <Box py={24} bg={useColorModeValue("white", "gray.800")} borderTop="1px solid" borderColor={useColorModeValue("gray.100", "gray.700")}>
        <Container maxW="full" px={{ base: 6, lg: 24 }}>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
            <Feature
              icon={HiTruck}
              title={"Express Delivery"}
              text={"Secure and prompt delivery to your doorstep within 48 hours, guaranteed."}
            />
            <Feature
              icon={HiShieldCheck}
              title={"Global Warranty"}
              text={"All premium items come with a 2-year comprehensive international warranty."}
            />
            <Feature
              icon={HiCreditCard}
              title={"Flexible Payment"}
              text={"Multiple secure payment options including major cards and installment plans."}
            />
            <Feature
              icon={HiRefresh}
              title={"Easy Returns"}
              text={"Not satisfied? No problem. Enjoy hassle-free returns within 14 days of purchase."}
            />
          </SimpleGrid>
        </Container>
      </Box>
    </Layout>
  );
};

export default StorePage;


