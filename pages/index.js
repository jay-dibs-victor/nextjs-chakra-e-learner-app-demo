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
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Image } from "components/shared/blocks/Image";
import Layout from "components/shared/blocks/Layout";
import { Link } from "components/shared/blocks/Link";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination, EffectFade } from "swiper/core";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/effect-fade/effect-fade.min.css";
import breakpoints from "core/theme/breakpoints";

SwiperCore.use([Autoplay, Pagination, EffectFade]);

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

export const Section = ({ children, bg, ...rest }) => (
  <Box as="section" bg={bg} py={{ base: 16, lg: 24 }} px={{ base: 6, md: 10 }} overflow="hidden" {...rest}>
    <Box maxW={breakpoints.xl} mx="auto">
      {children}
    </Box>
  </Box>
);

const HeroSlide = ({ image, title, subtitle }) => (
  <Box position="relative" h={{ base: "60vh", md: "80vh" }} w="100%" overflow="hidden">
    <Image src={image} w="100%" h="100%" objectFit="cover" />
    {/* Removed backdropFilter="blur(2px)" for performance, slightly darkened bg instead */}
    <Box
      position="absolute" top="0" left="0" w="100%" h="100%"
      bg="rgba(0,0,0,0.65)"
    />
    <Flex
      position="absolute" top="0" left="0" w="100%" h="100%"
      alignItems="center" justifyContent="center" textAlign="center" px={4}
    >
      {/* Removed backdropFilter="blur(10px)" for performance on scroll */}
      <VStack spacing={6} maxW="800px" bg="rgba(0, 0, 0, 0.3)" p={10} rounded="2xl" border="1px solid rgba(255,255,255,0.1)">
        <MotionHeading 
          as="h1" size="2xl" color="white" fontWeight="extrabold"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
        >
          {title}
        </MotionHeading>
        <MotionText 
          fontSize="xl" color="gray.200"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}
        >
          {subtitle}
        </MotionText>
        <MotionBox initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.6 }}>
          <Link mute href="/signup">
            <Button size="lg" colorScheme="blue" px={10} rounded="full" _hover={{ transform: "translateY(-2px)", boxShadow: "xl" }}>
              Get Started
            </Button>
          </Link>
        </MotionBox>
      </VStack>
    </Flex>
  </Box>
);

const CustomerReview = ({ contentText, contentTitle }) => {
  return (
    <MotionBox
      variants={fadeInUp}
      whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
      bg="white" rounded="2xl" p={8} m={4}
      w={{ base: "100%", md: "350px" }}
      boxShadow="0 10px 30px rgba(0,0,0,0.05)"
      borderTop="4px solid" borderColor="blue.500"
    >
      <Text color="gray.600" lineHeight="tall" fontStyle="italic" mb={6}>
        "{contentText}"
      </Text>
      <Flex mt="auto" justifyContent="space-between" alignItems="center">
        <Box>
          <Text fontWeight="bold" color="blue.900" mb={0}>Jame. S. Samuel</Text>
          <Text fontSize="sm" color="gray.500">Lesa Restaurant</Text>
        </Box>
        <Image
          src="/images/lg/customer-satisfaction.jpeg"
          w="50px" h="50px" rounded="full" objectFit="cover" border="2px solid #E2E8F0"
        />
      </Flex>
    </MotionBox>
  );
};

const HomePage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <Box w="100%">
        <Swiper effect="fade" autoplay={{ delay: 5000, disableOnInteraction: false }} pagination={{ clickable: true }} loop>
          <SwiperSlide>
            <HeroSlide 
              image="/img/herolanding.jpg" 
              title="Empowering Careers & Entrepreneurship" 
              subtitle="Online learning and capacity building for remote jobs, office roles, and the modern workforce."
            />
          </SwiperSlide>
          <SwiperSlide>
            <HeroSlide 
              image="/img/matchingemployees.jpg" 
              title="Hiring the Best Candidates" 
              subtitle="Powered by AI and expert knowledge to evaluate personality traits and ensure the perfect fit."
            />
          </SwiperSlide>
        </Swiper>
      </Box>

      {/* Intro Section - One Click Away */}
      <Section bg="gray.50">
        <MotionFlex 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
          direction="column" align="center" textAlign="center" maxW="900px" mx="auto"
        >
          <Heading size="xl" color="blue.900" mb={6}>ONE CLICK AWAY TO FINDING YOUR DREAM JOB OR CREATE ONE</Heading>
          <Text fontSize="lg" color="gray.600" mb={10}>
            Learn at your own pace, hire a reputable vetted responsive employer and lots more...
            Looking to build entrepreneurship programs that ensure a conscious approach towards developing ideas into startups? Leverage ImpactXplorer to build intelligent processes that assess, train, and support entrepreneurs on their path towards building scalable businesses.
          </Text>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link mute href="/signup">
              <Button size="lg" colorScheme="blue" rounded="full" px={12}>
                GET STARTED
              </Button>
            </Link>
          </motion.div>
        </MotionFlex>
      </Section>

      {/* Alternating Feature Layouts */}
      <Section>
        {/* Growth Programmes */}
        <MotionFlex 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          direction={{ base: "column", lg: "row" }} align="center" justify="space-between" mb={32}
        >
          <MotionBox variants={fadeInUp} flex={1} pr={{ lg: 16 }} mb={{ base: 10, lg: 0 }}>
            <Heading size="xl" color="blue.900" mb={6}>Growth Programmes.</Heading>
            <Text fontSize="lg" color="gray.600" mb={8}>
              For entities looking to design effective programs and activities (which can be delivered on-site or remotely) to empower entrepreneurs with relevant business skills, networking opportunities and tailored support on their entrepreneurial journey.
            </Text>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link mute href="/signup"><Button colorScheme="blue" variant="outline" rounded="full">Learn more</Button></Link>
            </motion.div>
          </MotionBox>
          <MotionBox variants={fadeInUp} flex={1}>
            <Box rounded="3xl" overflow="hidden" boxShadow="2xl">
              <Image src="/img/skillacquisition.jpg" w="100%" h="400px" objectFit="cover" />
            </Box>
          </MotionBox>
        </MotionFlex>

        {/* Employment Support */}
        <MotionFlex 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          direction={{ base: "column-reverse", lg: "row" }} align="center" justify="space-between" mb={32}
        >
          <MotionBox variants={fadeInUp} flex={1}>
            <Box rounded="3xl" overflow="hidden" boxShadow="2xl">
              <Image src="/img/proworker.jpg" w="100%" h="400px" objectFit="cover" />
            </Box>
          </MotionBox>
          <MotionBox variants={fadeInUp} flex={1} pl={{ lg: 16 }} mb={{ base: 10, lg: 0 }}>
            <Heading size="xl" color="blue.900" mb={6}>Job Seekers and Manpower Finders</Heading>
            <Text fontSize="lg" color="gray.600" mb={8}>
              For organizations who are invested in human capital development, and are looking to establish highly effective career development programs designed to empower people with in-demand skills and have them subsequently integrated into decent and dignified jobs.
            </Text>
          </MotionBox>
        </MotionFlex>

        {/* Talent Sourcing */}
        <MotionFlex 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          direction={{ base: "column", lg: "row" }} align="center" justify="space-between" mb={32}
        >
          <MotionBox variants={fadeInUp} flex={1} pr={{ lg: 16 }} mb={{ base: 10, lg: 0 }}>
            <Heading size="xl" color="blue.900" mb={6}>Talent Sourcing & Work Opportunities.</Heading>
            <Text fontSize="lg" color="gray.600" mb={8}>
              Quickly find skilled talent for businesses in your entrepreneurship programs. Allow recruiters to automatically recruit talents who meet their requirements, directly from your program.
            </Text>
          </MotionBox>
          <MotionBox variants={fadeInUp} flex={1}>
            <Box rounded="3xl" overflow="hidden" boxShadow="2xl">
              <Image src="/img/talentsource.jpg" w="100%" h="400px" objectFit="cover" />
            </Box>
          </MotionBox>
        </MotionFlex>

        {/* Adapt Training */}
        <MotionFlex 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          direction={{ base: "column-reverse", lg: "row" }} align="center" justify="space-between" mb={32}
        >
          <MotionBox variants={fadeInUp} flex={1}>
            <Box rounded="3xl" overflow="hidden" boxShadow="2xl">
              <Image src="/img/matchingemployees.jpg" w="100%" h="400px" objectFit="cover" />
            </Box>
          </MotionBox>
          <MotionBox variants={fadeInUp} flex={1} pl={{ lg: 16 }} mb={{ base: 10, lg: 0 }}>
            <Heading size="xl" color="blue.900" mb={6}>Adapt or Create New Training Programmes.</Heading>
            <Text fontSize="lg" color="gray.600" mb={8}>
              Leverage our pre-built project-based online programmes that cover top skills in technology, business, digital marketing as well as life skills and soft skills, or upload your own training programmes.
            </Text>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link mute href="/store">
                <Button colorScheme="blue" rounded="full">Explore our Programmes</Button>
              </Link>
            </motion.div>
          </MotionBox>
        </MotionFlex>

        {/* Guarantee Satisfaction */}
        <MotionFlex 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          direction={{ base: "column", lg: "row" }} align="center" justify="space-between"
        >
          <MotionBox variants={fadeInUp} flex={1} pr={{ lg: 16 }} mb={{ base: 10, lg: 0 }}>
            <Heading size="xl" color="blue.900" mb={6}>Guarantee Customer Satisfaction.</Heading>
            <Text fontSize="lg" color="gray.600" mb={8}>
              With over a 100% satisfaction rate and 1k+ successfully placed individuals, we ensure a premium experience for every learner and recruiter on the platform.
            </Text>
          </MotionBox>
          <MotionBox variants={fadeInUp} flex={1}>
            <Box rounded="3xl" overflow="hidden" boxShadow="2xl">
              <Image src="/img/herolanding.jpg" w="100%" h="400px" objectFit="cover" />
            </Box>
          </MotionBox>
        </MotionFlex>
      </Section>

      {/* About & Customer Stories */}
      <Section bg="blue.900" textAlign="center">
        <MotionBox initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}>
          <Heading color="blue.300" size="sm" letterSpacing="widest" textTransform="uppercase" mb={4}>About Ace-Trace</Heading>
          <Text color="gray.200" fontSize="lg" maxW="800px" mx="auto" mb={16}>
            ACE-TRACE is a technology company that develops AI-powered SaaS solutions for learning and workforce development. Governments, social impact organizations, businesses, and individuals leverage our cutting-edge digital platforms to run their learning and workforce management programs.
          </Text>
          
          <Heading color="white" size="xl" mb={10}>PEOPLE, TECHNOLOGY, INNOVATION.</Heading>
        </MotionBox>

        <MotionFlex 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          direction={{ base: "column", md: "row" }} justify="center" align="stretch" flexWrap="wrap"
        >
          <CustomerReview contentText="Leverage our cutting-edge technology solutions to develop and optimize your learning and workforce management processes quickly." />
          <CustomerReview contentText="The platform has completely transformed how we source talent. The AI matching is remarkably accurate." />
          <CustomerReview contentText="Building our entrepreneurship programs on this platform saved us months of development time." />
        </MotionFlex>
      </Section>

      {/* Want Technology to Work For You */}
      <Section bg="gray.100" textAlign="center">
        <MotionFlex initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} direction="column" align="center">
          <Heading size="xl" color="blue.900" mb={6}>WANT TECHNOLOGY TO WORK FOR YOU? WE CAN HELP</Heading>
          <Text fontSize="lg" color="gray.600" maxW="800px" mx="auto" mb={16}>
            Some of the fastest and most scalable ways to solve the world's biggest problems are digital. We have built and continue to build platforms that allow forward-thinking organizations to improve efficiency, increase knowledge and do good.
          </Text>
        </MotionFlex>
      </Section>

      {/* Final CTA */}
      <Section bg="white" textAlign="center">
        <MotionFlex initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} direction="column" align="center">
          <Heading size="xl" color="blue.900" mb={6}>Speak with a representative</Heading>
          <Text fontSize="lg" color="gray.600" maxW="700px" mb={10}>
            If you'd like to talk about your needs and explore how best we can be of help to you, please schedule a meeting with us. We have solutions for government agencies, businesses, non-profits, students, and job seekers.
          </Text>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link mute href="/signup"><Button size="lg" colorScheme="blue" px={12} rounded="full" boxShadow="xl">Contact Us</Button></Link>
          </motion.div>
        </MotionFlex>
      </Section>

    </Layout>
  );
};

export default HomePage;
