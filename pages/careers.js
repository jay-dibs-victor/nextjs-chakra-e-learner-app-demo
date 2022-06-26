import React from "react";
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  SimpleGrid,
  Icon,
  Button,
  Container,
  VStack,
  HStack,
  Badge,
  useColorModeValue,
  Divider,
} from "@chakra-ui/react";
import { Layout, Section } from "components/components/pages";
import { motion } from "framer-motion";
import { HiBriefcase, HiMap, HiClock, HiArrowRight } from "react-icons/hi";
import buildSEO from "utils/buildSEO";

const pageSEO = buildSEO("Careers at Ace Trace", "Join our mission to transform the future of work");

const MotionBox = motion(Box);

const JobCard = ({ title, location, type, category }) => {
  return (
    <MotionBox
      whileHover={{ scale: 1.02 }}
      p={6}
      bg={useColorModeValue("white", "gray.700")}
      rounded="2xl"
      shadow="sm"
      borderWidth="1px"
      borderColor={useColorModeValue("gray.100", "gray.600")}
      cursor="pointer"
    >
      <Flex justify="space-between" align="center">
        <VStack align="start" spacing={2}>
          <Badge colorScheme="blue" variant="subtle" px={2} rounded="md">
            {category}
          </Badge>
          <Heading size="md">{title}</Heading>
          <HStack spacing={4} color="gray.500" fontSize="sm">
            <HStack>
              <Icon as={HiMap} />
              <Text>{location}</Text>
            </HStack>
            <HStack>
              <Icon as={HiClock} />
              <Text>{type}</Text>
            </HStack>
          </HStack>
        </VStack>
        <Icon as={HiArrowRight} w={6} h={6} color="blue.500" />
      </Flex>
    </MotionBox>
  );
};

const CareersPage = () => {
  const bg = useColorModeValue("gray.50", "gray.900");

  return (
    <Layout SEO={pageSEO}>
      {/* Hero Section */}
      <Box bg="blue.900" py={24} color="white" textAlign="center">
        <Container maxW="container.lg">
          <VStack spacing={6}>
            <Heading size="2xl">Build the Future of <Text as="span" color="blue.400">AI Education</Text></Heading>
            <Text fontSize="xl" color="gray.300">
              We&apos;re looking for passionate individuals to join our global team and help us build 
              technologies that empower the next generation of workers.
            </Text>
            <Button size="lg" colorScheme="blue" px={10} rounded="full">
              View Open Roles
            </Button>
          </VStack>
        </Container>
      </Box>

      {/* Why Join Us */}
      <Section py={20}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={12}>
          <VStack align="start" spacing={4}>
            <Heading size="md">Remote-First Culture</Heading>
            <Text color="gray.600">Work from anywhere in the world. We value output and creativity over office presence.</Text>
          </VStack>
          <VStack align="start" spacing={4}>
            <Heading size="md">Growth Opportunities</Heading>
            <Text color="gray.600">We invest in our people with learning stipends and clear career progression paths.</Text>
          </VStack>
          <VStack align="start" spacing={4}>
            <Heading size="md">Inclusive Environment</Heading>
            <Text color="gray.600">We celebrate diversity and believe that different perspectives lead to better solutions.</Text>
          </VStack>
        </SimpleGrid>
      </Section>

      <Divider />

      {/* Job Board */}
      <Box bg={bg} py={20}>
        <Container maxW="container.md">
          <VStack spacing={12} align="stretch">
            <Box textAlign="center">
              <Heading mb={4}>Current Openings</Heading>
              <Text color="gray.500">Find your next challenge at Ace Trace</Text>
            </Box>

            <Stack spacing={6}>
              <Text fontWeight="bold" color="blue.600" textTransform="uppercase" letterSpacing="widest" fontSize="xs">Engineering</Text>
              <JobCard category="Engineering" title="Senior Frontend Engineer" location="Remote" type="Full-time" />
              <JobCard category="Engineering" title="AI/ML Research Scientist" location="Hybrid (Lagos)" type="Full-time" />
              
              <Text fontWeight="bold" color="blue.600" textTransform="uppercase" letterSpacing="widest" fontSize="xs" mt={8}>Product & Design</Text>
              <JobCard category="Design" title="Senior UI/UX Designer" location="Remote" type="Full-time" />
              <JobCard category="Product" title="Product Manager (LMS)" location="Remote" type="Full-time" />
              
              <Text fontWeight="bold" color="blue.600" textTransform="uppercase" letterSpacing="widest" fontSize="xs" mt={8}>Operations</Text>
              <JobCard category="Operations" title="Customer Success Specialist" location="Remote" type="Contract" />
            </Stack>

            <Box textAlign="center" mt={8}>
              <Text color="gray.500">Don&apos;t see a role for you? <Text as="span" color="blue.500" fontWeight="bold" cursor="pointer">Send us your CV anyway!</Text></Text>
            </Box>
          </VStack>
        </Container>
      </Box>
    </Layout>
  );
};

export default CareersPage;

  