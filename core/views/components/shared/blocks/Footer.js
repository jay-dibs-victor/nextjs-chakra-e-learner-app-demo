import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
  Input,
  Button,
  VStack,
  Divider,
  Container,
  Circle,
  SimpleGrid,
} from "@chakra-ui/react";
import {
  TiSocialFacebook,
  TiSocialTwitter,
  TiSocialInstagram,
  TiSocialYoutube,
} from "react-icons/ti";
import { 
  HiMail, 
  HiPhone, 
  HiLocationMarker, 
  HiArrowRight 
} from "react-icons/hi";
import Brand from "./Brand";
import { Link } from "./Link";

const Footer = () => {
  return (
    <Box bg="blue.900" color="gray.200" pt={24} pb={12} position="relative" overflow="hidden">
      {/* Background Decor */}
      <Box position="absolute" top="-10%" left="-10%" w="40%" h="140%" bg="blue.800" opacity={0.3} rounded="full" blur="100px" />
      
      <Container maxW="container.xl" position="relative" zIndex={1}>
        <Grid
          templateColumns={{
            base: "1fr",
            lg: "1.5fr 2fr",
          }}
          gap={20}
          mb={20}
        >
          {/* Left Side: Brand & Newsletter */}
          <VStack align="start" spacing={10}>
            <VStack align="start" spacing={6}>
              <Brand size="3xl" color="white" />
              <Text fontSize="lg" color="blue.100" opacity={0.8} maxW="400px" lineHeight="tall">
                Revolutionizing the future of work and learning with AI-powered ecosystems that empower professionals globally.
              </Text>
            </VStack>

            <VStack align="start" spacing={4} w="full" maxW="450px">
              <Heading size="sm" color="white" textTransform="uppercase" letterSpacing="widest">Join our Newsletter</Heading>
              <Text fontSize="sm" color="blue.200">Get the latest updates on career opportunities and tech trends.</Text>
              <HStack w="full" bg="whiteAlpha.100" p={1} rounded="full" border="1px solid" borderColor="whiteAlpha.200">
                <Input 
                  placeholder="Enter your email" 
                  variant="unstyled" 
                  px={6} 
                  fontSize="sm" 
                  color="white"
                  _placeholder={{ color: "whiteAlpha.500" }}
                />
                <Button colorScheme="blue" rounded="full" px={8} h={12} rightIcon={<HiArrowRight />}>
                  Subscribe
                </Button>
              </HStack>
            </VStack>
          </VStack>

          {/* Right Side: Links Grid */}
          <SimpleGrid columns={{ base: 2, md: 3 }} spacing={10} w="full">
            <VStack align="start" spacing={6}>
               <Heading size="xs" color="white" textTransform="uppercase" letterSpacing="widest">Company</Heading>
               <Stack spacing={4}>
                  <FooterLink href="/about">About Ace-Trace</FooterLink>
                  <FooterLink href="/careers">Careers</FooterLink>
                  <FooterLink href="/workforce">Workforce</FooterLink>
                  <FooterLink href="/contact">Contact Us</FooterLink>
               </Stack>
            </VStack>

            <VStack align="start" spacing={6}>
               <Heading size="xs" color="white" textTransform="uppercase" letterSpacing="widest">Solutions</Heading>
               <Stack spacing={4}>
                  <FooterLink href="/elearning-accelerator">E-Learning</FooterLink>
                  <FooterLink href="/store">Courses</FooterLink>
                  <FooterLink href="/talent-sourcing">Talent Sourcing</FooterLink>
                  <FooterLink href="/accelerator">Startup Hub</FooterLink>
               </Stack>
            </VStack>

            <VStack align="start" spacing={6}>
               <Heading size="xs" color="white" textTransform="uppercase" letterSpacing="widest">Support</Heading>
               <Stack spacing={4}>
                  <HStack spacing={3} color="blue.200">
                     <Icon as={HiMail} />
                     <Text fontSize="sm">support@ace-trace.tech</Text>
                  </HStack>
                  <HStack spacing={3} color="blue.200">
                     <Icon as={HiPhone} />
                     <Text fontSize="sm">+234 (0) 800-IMPACT</Text>
                  </HStack>
                  <HStack spacing={3} color="blue.200">
                     <Icon as={HiLocationMarker} />
                     <Text fontSize="sm">Lekki, Lagos, Nigeria</Text>
                  </HStack>
               </Stack>
            </VStack>
          </SimpleGrid>
        </Grid>

        <Divider borderColor="whiteAlpha.200" mb={12} />

        {/* Footer Bottom */}
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
          gap={8}
        >
          <VStack align={{ base: "center", md: "start" }} spacing={1}>
             <Text fontSize="sm" color="whiteAlpha.600">
               © 2022 ImpactXplorer by Ace-Trace. All rights reserved.
             </Text>
             <HStack spacing={6} fontSize="xs" color="whiteAlpha.400" fontWeight="bold" textTransform="uppercase">
                <Link mute href="/privacy">Privacy Policy</Link>
                <Link mute href="/terms">Terms of Service</Link>
                <Link mute href="/cookies">Cookie Settings</Link>
             </HStack>
          </VStack>

          <HStack spacing={4}>
            <SocialLink icon={TiSocialFacebook} />
            <SocialLink icon={TiSocialTwitter} />
            <SocialLink icon={TiSocialInstagram} />
            <SocialLink icon={TiSocialYoutube} />
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

const SocialLink = ({ icon }) => (
  <Link href="#" isExternal>
    <Circle
      size={12}
      bg="whiteAlpha.100"
      color="white"
      transition="all 0.3s cubic-bezier(.175,.885,.32,1.275)"
      _hover={{ bg: "blue.500", transform: "scale(1.1) translateY(-4px)", shadow: "0 10px 20px rgba(0,0,0,0.2)" }}
    >
      <Icon as={icon} boxSize={6} />
    </Circle>
  </Link>
);

const FooterLink = ({ children, href }) => (
  <Link 
    href={href} 
    mute 
    fontSize="sm" 
    color="blue.100" 
    opacity={0.7} 
    _hover={{ opacity: 1, color: "white", transform: "translateX(4px)" }} 
    transition="all 0.2s"
  >
    {children}
  </Link>
);

export default Footer;

