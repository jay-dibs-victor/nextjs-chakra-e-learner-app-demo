import React from "react";
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  SimpleGrid,
  Icon,
  Container,
  VStack,
  useColorModeValue,
  Circle,
  Divider,
} from "@chakra-ui/react";
import { Layout, Section } from "components/components/pages";
import { motion } from "framer-motion";
import { HiLightningBolt, HiGlobe, HiUsers, HiChip } from "react-icons/hi";
import buildSEO from "utils/buildSEO";
import { Image } from "components/shared/blocks/Image";

const pageSEO = buildSEO("About Ace Trace", "Empowering the future with AI and learning");

const MotionBox = motion(Box);

const Feature = ({ title, text, icon }) => {
  return (
    <VStack align="start" spacing={4}>
      <Circle size="12" bg="blue.50" color="blue.500">
        <Icon as={icon} w={6} h={6} />
      </Circle>
      <Text fontWeight="bold" fontSize="lg">{title}</Text>
      <Text color="gray.600">{text}</Text>
    </VStack>
  );
};

const AboutPage = () => {
  const bg = useColorModeValue("white", "gray.900");

  return (
    <Layout SEO={pageSEO}>
      {/* Hero Section */}
      <Box position="relative" overflow="hidden" bg="blue.900" py={24} color="white">
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12} align="center">
            <VStack align="start" spacing={6}>
              <Badge bg="blue.500" color="white" px={3} py={1} rounded="full" fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
                Our Story
              </Badge>
              <Heading size="2xl" lineHeight="tight">
                Pioneering the Future of <Text as="span" color="blue.400">Workforce Development</Text>
              </Heading>
              <Text fontSize="xl" color="gray.300">
                Ace Trace is a technology powerhouse dedicated to bridging the gap between talent and opportunity through cutting-edge AI solutions.
              </Text>
            </VStack>
            <Box position="relative">
              <Image
                src="/img/herolanding.jpg"
                rounded="3xl"
                shadow="2xl"
                alt="Ace Trace Team"
              />
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Mission Section */}
      <Section py={24}>
        <Container maxW="container.lg" textAlign="center">
          <VStack spacing={8}>
            <Heading size="xl">Empowering 1 Billion People</Heading>
            <Text fontSize="lg" color="gray.600" lineHeight="tall">
              Our mission is to democratize access to high-quality education and meaningful employment. 
              We believe that with the right technology, every individual can reach their full potential, 
              regardless of their background or location.
            </Text>
            <Divider maxW="100px" borderWidth="2px" borderColor="blue.500" />
          </VStack>
        </Container>
      </Section>

      {/* Core Values */}
      <Box bg="gray.50" py={24}>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={12}>
            <Feature
              icon={HiLightningBolt}
              title="Innovation First"
              text="We push the boundaries of what's possible with AI to create smarter learning experiences."
            />
            <Feature
              icon={HiGlobe}
              title="Global Impact"
              text="Our platforms are designed to serve diverse communities across the globe."
            />
            <Feature
              icon={HiUsers}
              title="People Centric"
              text="We build tools that empower human potential, not replace it."
            />
            <Feature
              icon={HiChip}
              title="Tech for Good"
              text="Ethics and social responsibility are at the heart of our algorithmic designs."
            />
          </SimpleGrid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Section py={24}>
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={8} textAlign="center">
          <Box>
            <Heading size="2xl" color="blue.500">100+</Heading>
            <Text fontWeight="medium" color="gray.500">Countries Served</Text>
          </Box>
          <Box>
            <Heading size="2xl" color="blue.500">1M+</Heading>
            <Text fontWeight="medium" color="gray.500">Active Learners</Text>
          </Box>
          <Box>
            <Heading size="2xl" color="blue.500">500+</Heading>
            <Text fontWeight="medium" color="gray.500">Partner Companies</Text>
          </Box>
          <Box>
            <Heading size="2xl" color="blue.500">98%</Heading>
            <Text fontWeight="medium" color="gray.500">Success Rate</Text>
          </Box>
        </SimpleGrid>
      </Section>
    </Layout>
  );
};

const Badge = ({ children, ...rest }) => (
  <Box {...rest}>
    {children}
  </Box>
);

export default AboutPage;

  