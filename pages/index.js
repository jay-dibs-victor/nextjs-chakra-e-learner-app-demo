import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Center,
  SimpleGrid,
  VStack,
  HStack,
  Icon,
  Badge,
  Circle,
  useColorModeValue,
  Container,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { Image } from "components/shared/blocks/Image";
import Layout from "components/shared/blocks/Layout";
import { Link } from "components/shared/blocks/Link";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination, EffectFade, Navigation } from "swiper/core";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/effect-fade/effect-fade.min.css";
import "swiper/components/navigation/navigation.min.css";
import breakpoints from "core/theme/breakpoints";
import { 
  HiArrowRight, 
  HiSparkles, 
  HiLightningBolt, 
  HiShieldCheck, 
  HiChatAlt2, 
  HiUserGroup,
  HiGlobe,
  HiBriefcase,
  HiAcademicCap,
  HiFire
} from "react-icons/hi";

SwiperCore.use([Autoplay, Pagination, EffectFade, Navigation]);

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export const Section = ({ children, bg, ...rest }) => (
  <Box as="section" bg={bg} py={{ base: 20, lg: 32 }} px={{ base: 6, md: 10 }} overflow="hidden" {...rest}>
    <Container maxW="container.xl">
      {children}
    </Container>
  </Box>
);

const HeroSlide = ({ image, title, subtitle, badge }) => (
  <Box position="relative" h={{ base: "70vh", md: "90vh" }} w="100%" overflow="hidden">
    <Image src={image} w="100%" h="100%" objectFit="cover" alt="Hero Slide Image" />
    <Box
      position="absolute" top="0" left="0" w="100%" h="100%"
      bgGradient="linear(to-r, blackAlpha.800, blackAlpha.400)"
    />
    <Flex
      position="absolute" top="0" left="0" w="100%" h="100%"
      alignItems="center" px={{ base: 6, md: 24 }}
    >
      <VStack spacing={8} maxW="900px" align="start">
        <MotionBox
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge colorScheme="blue" variant="solid" px={4} py={1} rounded="full" fontSize="sm" letterSpacing="widest">{badge}</Badge>
        </MotionBox>
        <MotionHeading 
          as="h1" size="4xl" color="white" fontWeight="black" lineHeight="1.1" letterSpacing="tight"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
        >
          {title}
        </MotionHeading>
        <MotionText 
          fontSize="xl" color="whiteAlpha.900" maxW="xl" fontWeight="medium"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}
        >
          {subtitle}
        </MotionText>
        <MotionBox initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.6 }}>
          <HStack spacing={4}>
            <Link mute href="/signup">
              <Button size="lg" colorScheme="blue" px={12} h={16} rounded="full" shadow="2xl" rightIcon={<HiArrowRight />} _hover={{ transform: "scale(1.05)", shadow: "dark-lg" }}>
                Get Started
              </Button>
            </Link>
            <Link mute href="/about">
              <Button size="lg" variant="outline" color="white" borderColor="whiteAlpha.400" px={10} h={16} rounded="full" _hover={{ bg: "whiteAlpha.200" }}>
                Learn More
              </Button>
            </Link>
          </HStack>
        </MotionBox>
      </VStack>
    </Flex>
  </Box>
);

const FeatureCard = ({ icon, title, description, color }) => (
  <MotionBox
    variants={fadeInUp}
    bg="white"
    p={10}
    rounded="3xl"
    shadow="xl"
    borderWidth="1px"
    borderColor="gray.50"
    _hover={{ transform: "translateY(-12px)", shadow: "2xl", borderColor: `${color}.200` }}
    transition="all 0.4s cubic-bezier(.175,.885,.32,1.275)"
  >
    <Circle size={16} bg={`${color}.50`} color={`${color}.500`} mb={8} shadow="inner">
      <Icon as={icon} w={8} h={8} />
    </Circle>
    <Heading size="md" mb={4} fontWeight="black" letterSpacing="tight">{title}</Heading>
    <Text color="gray.500" fontSize="md" lineHeight="tall">{description}</Text>
  </MotionBox>
);

const CustomerReview = ({ contentText, name, role, color }) => {
  return (
    <MotionBox
      variants={fadeInUp}
      bg={useColorModeValue("white", "gray.800")}
      rounded="3xl"
      p={10}
      m={4}
      w={{ base: "100%", md: "400px" }}
      shadow="xl"
      borderWidth="1px"
      borderColor={useColorModeValue("gray.50", "gray.700")}
      position="relative"
    >
      <Icon as={HiChatAlt2} w={12} h={12} color={`${color}.100`} position="absolute" top={6} right={8} zIndex={0} />
      <VStack align="start" spacing={6} position="relative" zIndex={1}>
        <Text color="gray.600" fontSize="lg" lineHeight="tall" fontStyle="italic">
          &quot;{contentText}&quot;
        </Text>
        <HStack spacing={4}>
          <Circle size={12} bg={`${color}.500`} color="white">
            <Icon as={HiUserGroup} />
          </Circle>
          <VStack align="start" spacing={0}>
            <Text fontWeight="black" color="blue.900" fontSize="md">{name}</Text>
            <Text fontSize="xs" color="gray.400" fontWeight="bold" textTransform="uppercase">{role}</Text>
          </VStack>
        </HStack>
      </VStack>
    </MotionBox>
  );
};

const HomePage = () => {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  
  return (
    <Layout>
      {/* Hero Section */}
      <Box w="100%">
        <Swiper 
          effect="fade" 
          autoplay={{ delay: 6000, disableOnInteraction: false }} 
          pagination={{ clickable: true }} 
          navigation={true}
          loop
        >
          <SwiperSlide>
            <HeroSlide 
              badge="REVOLUTIONIZING WORK"
              image="/img/herolanding.jpg" 
              title="Empowering Careers & The Modern Workforce" 
              subtitle="The all-in-one platform for remote jobs, professional training, and high-impact capacity building."
            />
          </SwiperSlide>
          <SwiperSlide>
            <HeroSlide 
              badge="AI-POWERED HIRING"
              image="/img/matchingemployees.jpg" 
              title="Match With The Best Candidates Instantly" 
              subtitle="Our advanced AI evaluates personality traits and professional skills to ensure the perfect culture fit."
            />
          </SwiperSlide>
        </Swiper>
      </Box>

      {/* Intro Stats Section */}
      <Section py={20}>
         <SimpleGrid columns={{ base: 2, md: 4 }} spacing={10}>
            <VStack align="start" spacing={1}>
               <Heading color="blue.500" size="2xl" fontWeight="black">1M+</Heading>
               <Text fontWeight="bold" color="gray.500" fontSize="sm" textTransform="uppercase">Active Learners</Text>
            </VStack>
            <VStack align="start" spacing={1}>
               <Heading color="blue.500" size="2xl" fontWeight="black">50k+</Heading>
               <Text fontWeight="bold" color="gray.500" fontSize="sm" textTransform="uppercase">Hired Talents</Text>
            </VStack>
            <VStack align="start" spacing={1}>
               <Heading color="blue.500" size="2xl" fontWeight="black">98%</Heading>
               <Text fontWeight="bold" color="gray.500" fontSize="sm" textTransform="uppercase">Satisfaction Rate</Text>
            </VStack>
            <VStack align="start" spacing={1}>
               <Heading color="blue.500" size="2xl" fontWeight="black">200+</Heading>
               <Text fontWeight="bold" color="gray.500" fontSize="sm" textTransform="uppercase">Enterprise Partners</Text>
            </VStack>
         </SimpleGrid>
      </Section>

      {/* Main Value Proposition */}
      <Section bg="gray.50" rounded={{ base: "none", lg: "100px" }} mx={{ base: 0, lg: 8 }}>
        <MotionFlex 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
          direction="column" align="center" textAlign="center" maxW="1000px" mx="auto"
        >
          <Badge colorScheme="blue" mb={6} px={4} py={1} rounded="full">WHY IMPACTXPLORER?</Badge>
          <Heading size="3xl" color="blue.900" mb={8} fontWeight="black" letterSpacing="tight">
            One Click Away From Your <Text as="span" color="blue.500">Dream Career</Text>
          </Heading>
          <Text fontSize="xl" color="gray.600" mb={12} lineHeight="tall">
            ImpactXplorer is the intelligent gateway to global opportunities. Whether you&apos;re an entrepreneur scaling a startup or a professional seeking your next big break, our AI-driven ecosystem provides the assessment, training, and support you need to succeed.
          </Text>
          <HStack spacing={6}>
            <Link mute href="/signup">
              <Button size="lg" colorScheme="blue" rounded="full" px={16} h={16} shadow="xl">
                GET STARTED NOW
              </Button>
            </Link>
          </HStack>
        </MotionFlex>
      </Section>

      {/* Interactive Feature Grid */}
      <Section>
        <VStack spacing={4} mb={16} textAlign="center">
           <Heading size="2xl" fontWeight="black">Comprehensive Solutions</Heading>
           <Text color="gray.500" fontSize="xl" maxW="2xl">Everything you need to thrive in the modern digital economy</Text>
        </VStack>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          <FeatureCard 
            color="blue"
            icon={HiLightningBolt}
            title="Growth Programmes"
            description="Scalable frameworks designed to empower entrepreneurs with high-impact skills and global networking opportunities."
          />
          <FeatureCard 
            color="purple"
            icon={HiBriefcase}
            title="Talent Sourcing"
            description="AI-powered recruitment that matches vetted candidates with forward-thinking organizations in real-time."
          />
          <FeatureCard 
            color="green"
            icon={HiAcademicCap}
            title="Professional Training"
            description="Project-based online learning covering technology, marketing, and essential soft skills for the modern workplace."
          />
          <FeatureCard 
            color="orange"
            icon={HiGlobe}
            title="Remote Work Hub"
            description="Access a curated board of high-paying remote opportunities from companies across the globe."
          />
          <FeatureCard 
            color="red"
            icon={HiShieldCheck}
            title="Verified Credentials"
            description="Blockchain-backed certifications that give you instant credibility with top-tier recruiters and partners."
          />
          <FeatureCard 
            color="cyan"
            icon={HiFire}
            title="Startup Accelerator"
            description="Direct mentorship and funding pathways for high-potential startups within our global ecosystem."
          />
        </SimpleGrid>
      </Section>

      {/* Feature Highlight Sections */}
      <Section bg="blue.900" color="white" rounded={{ base: "none", lg: "100px" }} mx={{ base: 0, lg: 8 }}>
         <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={20} alignItems="center">
            <MotionBox
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            >
               <VStack align="start" spacing={8}>
                  <Badge colorScheme="blue" variant="solid" px={3} rounded="full">GLOBAL REACH</Badge>
                  <Heading size="3xl" fontWeight="black" lineHeight="1.1">PEOPLE. TECHNOLOGY. INNOVATION.</Heading>
                  <Text fontSize="xl" opacity={0.8} lineHeight="tall">
                    ACE-TRACE develops cutting-edge AI SaaS solutions that bridge the gap between education and employment. We provide governments and NGOs with the digital infrastructure to manage workforce development at scale.
                  </Text>
                  <SimpleGrid columns={2} spacing={8} w="full">
                     <VStack align="start">
                        <Text color="blue.300" fontWeight="black" fontSize="2xl">100%</Text>
                        <Text fontSize="sm" fontWeight="bold" opacity={0.6} textTransform="uppercase">Satisfaction</Text>
                     </VStack>
                     <VStack align="start">
                        <Text color="blue.300" fontWeight="black" fontSize="2xl">24/7</Text>
                        <Text fontSize="sm" fontWeight="bold" opacity={0.6} textTransform="uppercase">Expert Support</Text>
                     </VStack>
                  </SimpleGrid>
                  <Button size="lg" colorScheme="blue" rounded="full" px={10} rightIcon={<HiArrowRight />}>Discover Our Vision</Button>
               </VStack>
            </MotionBox>
            <MotionBox
               initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            >
               <Box rounded="4xl" overflow="hidden" shadow="dark-lg" transform="rotate(2deg)" border="8px solid rgba(255,255,255,0.1)">
                  <Image src="/img/skillacquisition.jpg" w="100%" h="600px" objectFit="cover" alt="Skill Acquisition Feature" />
               </Box>
            </MotionBox>
         </SimpleGrid>
      </Section>

      {/* Social Proof Section */}
      <Section py={32}>
        <VStack spacing={4} mb={20} textAlign="center">
           <Badge colorScheme="blue" px={4} py={1} rounded="full">SUCCESS STORIES</Badge>
           <Heading size="2xl" fontWeight="black">Voices of the Community</Heading>
        </VStack>
        <MotionFlex 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          justify="center" align="stretch" flexWrap="wrap"
        >
          <CustomerReview 
            color="blue"
            name="James S. Samuel"
            role="CEO, LESA RESTAURANT"
            contentText="The talent sourcing platform has completely transformed how we build our team. The AI matching is remarkably accurate." 
          />
          <CustomerReview 
            color="purple"
            name="Sarah Jenkins"
            role="DIRECTOR, EDU-TECH"
            contentText="Leverage our cutting-edge technology solutions to develop and optimize your learning and workforce management processes quickly." 
          />
          <CustomerReview 
            color="green"
            name="Michael Chen"
            role="FOUNDER, TECH-START"
            contentText="Building our entrepreneurship programs on this platform saved us months of development time. Truly a game changer." 
          />
        </MotionFlex>
      </Section>

      {/* Final CTA / Contact */}
      <Section bg="gray.100" textAlign="center" roundedTop="100px">
        <MotionFlex initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} direction="column" align="center" maxW="3xl" mx="auto">
          <Circle size={20} bg="blue.500" color="white" mb={10} shadow="2xl">
             <Icon as={HiSparkles} w={10} h={10} />
          </Circle>
          <Heading size="3xl" color="blue.900" mb={8} fontWeight="black">Ready To Scale Your Future?</Heading>
          <Text fontSize="xl" color="gray.600" mb={12}>
            Join thousands of professionals and organizations leveraging technology to solve the world&apos;s biggest challenges. Speak with a representative today.
          </Text>
          <HStack spacing={6}>
            <Link mute href="/signup">
              <Button size="lg" colorScheme="blue" px={16} h={16} rounded="full" shadow="2xl" fontSize="xl" fontWeight="black">
                JOIN NOW
              </Button>
            </Link>
            <Link mute href="/contact">
              <Button size="lg" variant="ghost" color="blue.600" px={10} h={16} rounded="full" fontWeight="bold">
                Contact Sales
              </Button>
            </Link>
          </HStack>
        </MotionFlex>
      </Section>

    </Layout>
  );
};

export default HomePage;

