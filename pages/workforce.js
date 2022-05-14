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
  Circle,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { Layout, Section } from "components/components/pages";
import { motion } from "framer-motion";
import { HiCheckCircle, HiCloudUpload, HiPresentationChartLine, HiShieldCheck } from "react-icons/hi";
import buildSEO from "utils/buildSEO";
import { Image } from "components/shared/blocks/Image";

const pageSEO = buildSEO("Workforce Solutions", "AI-powered workforce management and learning");

const MotionBox = motion(Box);

const SolutionItem = ({ title, desc, icon }) => (
  <HStack align="start" spacing={5} p={6} bg="white" rounded="2xl" shadow="sm" borderWidth="1px" borderColor="gray.100">
    <Circle size="12" bg="blue.50" color="blue.500" flexShrink={0}>
      <Icon as={icon} w={6} h={6} />
    </Circle>
    <VStack align="start" spacing={1}>
      <Text fontWeight="bold" fontSize="lg">{title}</Text>
      <Text color="gray.600" fontSize="sm">{desc}</Text>
    </VStack>
  </HStack>
);

const WorkforcePage = () => {
  const bg = useColorModeValue("gray.50", "gray.900");

  return (
    <Layout SEO={pageSEO}>
      {/* Hero Section */}
      <Box bg="blue.900" py={24} color="white">
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12} align="center">
            <VStack align="start" spacing={6}>
              <Badge colorScheme="blue" variant="solid" px={3} rounded="full">Enterprise</Badge>
              <Heading size="2xl">Transform Your <Text as="span" color="blue.400">Human Capital</Text></Heading>
              <Text fontSize="xl" color="gray.300">
                Leverage our AI-powered SaaS solutions to manage training, evaluate talent, and optimize your workforce performance at scale.
              </Text>
              <HStack spacing={4}>
                <Button size="lg" colorScheme="blue" rounded="full">Request Demo</Button>
                <Button size="lg" variant="outline" color="white" border="2px" rounded="full">Learn More</Button>
              </HStack>
            </VStack>
            <Box>
              <Image src="/img/matchingemployees.jpg" rounded="3xl" shadow="2xl" alt="Workforce Matching" />
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Solutions Grid */}
      <Section py={24} bg={bg}>
        <Container maxW="container.xl">
          <VStack spacing={4} mb={16} textAlign="center">
            <Heading>Everything you need to scale</Heading>
            <Text color="gray.500" maxW="2xl">Our unified platform combines learning management with advanced talent analytics.</Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            <SolutionItem 
              icon={HiCloudUpload}
              title="Cloud-Native LMS"
              desc="Deploy your training programs globally with our high-availability cloud infrastructure."
            />
            <SolutionItem 
              icon={HiPresentationChartLine}
              title="AI Talent Analytics"
              desc="Use advanced algorithms to identify skill gaps and predict future workforce needs."
            />
            <SolutionItem 
              icon={HiShieldCheck}
              title="Vetted Talent Sourcing"
              desc="Access a global pool of pre-screened professionals ready to integrate into your teams."
            />
            <SolutionItem 
              icon={HiCheckCircle}
              title="Automated Compliance"
              desc="Stay ahead of regulatory requirements with automated tracking and reporting."
            />
          </SimpleGrid>
        </Container>
      </Section>

      {/* Key Benefits List */}
      <Section py={24}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={16} align="center">
          <Box>
            <Image src="/img/skillacquisition.jpg" rounded="3xl" shadow="xl" alt="Skill Acquisition" />
          </Box>
          <VStack align="start" spacing={8}>
            <Heading>Why Forward-Thinking Organizations Choose Us</Heading>
            <List spacing={4}>
              {[
                "100% cloud-based infrastructure for global access",
                "Scalable from 10 to 10,000,000+ users",
                "Seamless integration with existing HRIS tools",
                "Advanced data encryption and security protocols",
                "24/7 dedicated enterprise support team",
              ].map((benefit) => (
                <ListItem key={benefit} display="flex" alignItems="center">
                  <ListIcon as={HiCheckCircle} color="green.500" w={6} h={6} />
                  <Text fontSize="lg" fontWeight="medium">{benefit}</Text>
                </ListItem>
              ))}
            </List>
            <Button size="lg" colorScheme="blue" rounded="full">Get Started Today</Button>
          </VStack>
        </SimpleGrid>
      </Section>
    </Layout>
  );
};

export default WorkforcePage;

  