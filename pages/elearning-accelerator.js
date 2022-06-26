import React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
  SimpleGrid,
  VStack,
  Circle,
  Badge,
  useColorModeValue,
  Container,
  Divider,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Image } from "components/shared/blocks/Image";
import Layout from "components/shared/blocks/Layout";
import { Link } from "components/shared/blocks/Link";
import { 
  HiAcademicCap, 
  HiGlobeAlt, 
  HiPresentationChartLine, 
  HiUserGroup, 
  HiArrowRight, 
  HiLightningBolt,
  HiSparkles
} from "react-icons/hi";

const MotionBox = motion(Box);

const Feature = ({ title, description, icon }) => {
  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.50", "gray.700");

  return (
    <VStack
      align="start"
      spacing={4}
      p={8}
      bg={bg}
      rounded="3xl"
      shadow="xl"
      borderWidth="1px"
      borderColor={borderColor}
      _hover={{ transform: "translateY(-8px)", shadow: "2xl" }}
      transition="all 0.3s cubic-bezier(.175,.885,.32,1.275)"
    >
      <Circle size={14} bg="blue.50" color="blue.500" shadow="inner">
        <Icon as={icon} w={7} h={7} />
      </Circle>
      <VStack align="start" spacing={1}>
        <Heading size="md" fontWeight="black" letterSpacing="tight">{title}</Heading>
        <Text color="gray.500" fontSize="sm" lineHeight="tall">{description}</Text>
      </VStack>
    </VStack>
  );
};


const ElearningAcceleratorPage = () => {
  const bgColor = useColorModeValue("gray.50", "gray.900");

  return (
    <Layout>
      {/* Hero Section */}
      <Box 
        position="relative" 
        overflow="hidden" 
        bg="blue.900" 
        pt={{ base: 20, lg: 32 }} 
        pb={{ base: 24, lg: 40 }}
        color="white"
      >
        <Box 
          position="absolute" 
          top="-10%" 
          right="-5%" 
          w="50%" 
          h="120%" 
          bgGradient="radial(blue.600, transparent)" 
          opacity={0.4} 
          rounded="full" 
          blur="80px" 
        />
        <Container maxW="container.xl" position="relative" zIndex={1}>
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={16} alignItems="center">
            <VStack align="start" spacing={8}>
              <HStack spacing={3}>
                <Badge colorScheme="blue" variant="solid" px={3} rounded="full" textTransform="uppercase">New for 2022</Badge>
                <HStack color="blue.300" spacing={1}>
                  <Icon as={HiSparkles} />
                  <Text fontWeight="black" fontSize="xs" letterSpacing="widest">PREMIUM PROGRAM</Text>
                </HStack>
              </HStack>
              <VStack align="start" spacing={4}>
                <Heading size="3xl" fontWeight="black" lineHeight="1.1" letterSpacing="tight">
                  The Future of <Text as="span" color="blue.300">Online Learning</Text> SaaS
                </Heading>
                <Text fontSize="xl" opacity={0.8} fontWeight="medium">
                  ImpactXplorer provides the tools and infrastructure to help instructors and organizations build robust, global online learning programs at scale.
                </Text>
              </VStack>
              <Stack direction={{ base: "column", sm: "row" }} spacing={4} w="full">
                <Link mute href="/signup">
                  <Button size="lg" colorScheme="blue" h={16} px={12} rounded="full" shadow="2xl" rightIcon={<HiArrowRight />}>
                    Launch Your Program
                  </Button>
                </Link>
                <Button size="lg" variant="ghost" color="white" border="1px solid" borderColor="whiteAlpha.300" h={16} px={10} rounded="full" _hover={{ bg: "whiteAlpha.200" }}>
                  View Demo
                </Button>
              </Stack>
            </VStack>
            <MotionBox
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1 }}
            >
              <Box rounded="4xl" overflow="hidden" shadow="dark-lg" border="12px solid" borderColor="whiteAlpha.100">
                <Image src="/img/herolanding.jpg" w="100%" h="500px" objectFit="cover" alt="E-learning Accelerator Hero" />
              </Box>
            </MotionBox>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Intro Context */}
      <Box py={24} bg={bgColor}>
        <Container maxW="3xl" textAlign="center">
           <VStack spacing={8}>
             <Heading size="xl" fontWeight="black" letterSpacing="tight">One Click To Scale Your Impact</Heading>
             <Text fontSize="lg" color="gray.600" lineHeight="tall">
               Whether you&apos;re creating structured certificate programs or simple &quot;how-to&quot; courses, our platform enables you to offer your classes to millions of participants online with zero friction. Leverage our intelligent processes to assess, train, and support learners globally.
             </Text>
             <Divider w="40px" borderColor="blue.500" borderBottomWidth="4px" rounded="full" />
           </VStack>
        </Container>
      </Box>

      {/* Core Features */}
      <Box pb={32} bg={bgColor}>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
            <Feature 
              icon={HiLightningBolt}
              title="Fast Deployment"
              description="Go from course concept to a fully functional global LMS in less than 24 hours."
            />
            <Feature 
              icon={HiUserGroup}
              title="Global Community"
              description="Integrate seamlessly with our existing network of 1M+ active learners and mentors."
            />
            <Feature 
              icon={HiPresentationChartLine}
              title="AI Analytics"
              description="Understand learner behavior and optimize course completion rates with deep AI insights."
            />
            <Feature 
              icon={HiGlobeAlt}
              title="Scalable Infrastructure"
              description="Built on cloud-native technology that scales automatically with your participant growth."
            />
          </SimpleGrid>
        </Container>
      </Box>

      {/* The Brief / Testimonial */}
      <Box py={24} bg="blue.900" position="relative" overflow="hidden">
        <Box position="absolute" bottom="-10%" left="-5%" w="40%" h="100%" bg="whiteAlpha.50" rounded="full" blur="60px" />
        <Container maxW="container.xl">
           <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={16} alignItems="center">
              <VStack align="start" spacing={6} color="white">
                <Heading size="2xl" fontWeight="black" letterSpacing="tight">The Learna Experience</Heading>
                 <Text fontSize="xl" opacity={0.8}>
                   &quot;Learna allows me the flexibility I need while also providing the tools that help me create comprehensive courses that are engaging and fulfilling for my participants. It&apos;s the new standard for digital education.&quot;
                 </Text>
                <HStack spacing={4}>
                  <Circle size={12} bg="blue.500" shadow="lg">
                    <Icon as={HiAcademicCap} w={6} h={6} color="white" />
                  </Circle>
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="black" fontSize="md">Prof. Johnathan Smith</Text>
                    <Text fontSize="xs" fontWeight="bold" opacity={0.6} textTransform="uppercase">Founder, EduScale</Text>
                  </VStack>
                </HStack>
              </VStack>
              <SimpleGrid columns={2} spacing={6} w="full">
                 <Box p={8} bg="whiteAlpha.100" rounded="3xl" backdropFilter="blur(10px)" border="1px solid" borderColor="whiteAlpha.200">
                    <Heading size="xl" color="blue.300" fontWeight="black">150+</Heading>
                    <Text color="white" fontWeight="bold" fontSize="sm" opacity={0.7} mt={1}>ENTERPRISE TOOLS</Text>
                 </Box>
                 <Box p={8} bg="whiteAlpha.100" rounded="3xl" backdropFilter="blur(10px)" border="1px solid" borderColor="whiteAlpha.200">
                    <Heading size="xl" color="blue.300" fontWeight="black">99.9%</Heading>
                    <Text color="white" fontWeight="bold" fontSize="sm" opacity={0.7} mt={1}>UPTIME GUARANTEE</Text>
                 </Box>
                 <Box p={8} bg="whiteAlpha.100" rounded="3xl" backdropFilter="blur(10px)" border="1px solid" borderColor="whiteAlpha.200">
                    <Heading size="xl" color="blue.300" fontWeight="black">256-bit</Heading>
                    <Text color="white" fontWeight="bold" fontSize="sm" opacity={0.7} mt={1}>SSL SECURITY</Text>
                 </Box>
                 <Box p={8} bg="whiteAlpha.100" rounded="3xl" backdropFilter="blur(10px)" border="1px solid" borderColor="whiteAlpha.200">
                    <Heading size="xl" color="blue.300" fontWeight="black">API</Heading>
                    <Text color="white" fontWeight="bold" fontSize="sm" opacity={0.7} mt={1}>READY ACCESS</Text>
                 </Box>
              </SimpleGrid>
           </SimpleGrid>
        </Container>
      </Box>

      {/* Final CTA */}
      <Box py={32} textAlign="center" bg={bgColor}>
        <Container maxW="3xl">
           <VStack spacing={10}>
             <Circle size={20} bg="blue.500" color="white" shadow="2xl">
                <Icon as={HiAcademicCap} w={10} h={10} />
             </Circle>
             <VStack spacing={4}>
               <Heading size="2xl" fontWeight="black" letterSpacing="tight">Ready to Transform Your Knowledge into a Global Academy?</Heading>
               <Text fontSize="xl" color="gray.500">Join the elite organizations leveraging ACE-TRACE to power the next generation of online learning.</Text>
             </VStack>
             <Button size="lg" colorScheme="blue" h={16} px={16} rounded="full" shadow="2xl" fontSize="xl" fontWeight="black" rightIcon={<HiArrowRight />}>
               Get Started for Free
             </Button>
           </VStack>
        </Container>
      </Box>
    </Layout>
  );
};

export default ElearningAcceleratorPage;