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
} from "@chakra-ui/react";
import {
  TiSocialFacebook,
  TiSocialTwitter,
  TiSocialInstagram,
  TiSocialYoutube,
} from "react-icons/ti";
import Brand from "./Brand";
import { Link } from "./Link";
import { Container } from "./Layout";

const Footer = () => {
  return (
    <Box bg="blue.900" color="gray.200" pt={16} pb={8}>
      <Container>
        <Grid
          templateColumns={{
            base: "1fr",
            md: "1fr 1fr",
            lg: "2fr 1fr 1fr 1.5fr",
          }}
          gap={10}
          mb={12}
        >
          {/* Brand & Socials */}
          <GridItem>
            <Box maxW="300px">
              <Brand size="2xl" color="white" mb={4} />
              <Text fontSize="sm" color="gray.400" mb={6} lineHeight="tall">
                Empowering the modern workforce with AI-driven learning and recruitment solutions.
              </Text>

              <HStack spacing={4}>
                <SocialLink icon={TiSocialFacebook} />
                <SocialLink icon={TiSocialTwitter} />
                <SocialLink icon={TiSocialInstagram} />
                <SocialLink icon={TiSocialYoutube} />
              </HStack>
            </Box>
          </GridItem>

          {/* Quick Links */}
          <GridItem>
            <Heading as="h6" size="sm" color="white" textTransform="uppercase" letterSpacing="wider" mb={6}>
              Company
            </Heading>
            <Stack spacing={3}>
              <FooterLink>About Us</FooterLink>
              <FooterLink>Careers</FooterLink>
              <FooterLink>Our Programs</FooterLink>
              <FooterLink>Contact</FooterLink>
            </Stack>
          </GridItem>

          {/* Resources */}
          <GridItem>
            <Heading as="h6" size="sm" color="white" textTransform="uppercase" letterSpacing="wider" mb={6}>
              Resources
            </Heading>
            <Stack spacing={3}>
              <FooterLink>Help Center</FooterLink>
              <FooterLink>Success Stories</FooterLink>
              <FooterLink>API Documentation</FooterLink>
              <FooterLink>Blog</FooterLink>
            </Stack>
          </GridItem>

          {/* Legal */}
          <GridItem>
            <Heading as="h6" size="sm" color="white" textTransform="uppercase" letterSpacing="wider" mb={6}>
              Legal
            </Heading>
            <Stack spacing={3}>
              <FooterLink>Terms of Service</FooterLink>
              <FooterLink>Privacy Policy</FooterLink>
              <FooterLink>Cookie Policy</FooterLink>
            </Stack>
          </GridItem>
        </Grid>

        {/* Copyright */}
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
          borderTop="1px solid"
          borderColor="whiteAlpha.200"
          pt={8}
        >
          <Text fontSize="sm" color="gray.500" mb={{ base: 4, md: 0 }}>
            © {new Date().getFullYear()} Ace-Trace LLC. All rights reserved.
          </Text>
        </Flex>
      </Container>
    </Box>
  );
};

const SocialLink = ({ icon }) => (
  <Link href="#" isExternal>
    <Flex
      align="center" justify="center"
      w={10} h={10}
      rounded="full" bg="whiteAlpha.100" color="white"
      transition="all 0.3s"
      _hover={{ bg: "blue.500", color: "white", transform: "translateY(-2px)" }}
    >
      <Icon as={icon} boxSize={5} />
    </Flex>
  </Link>
);

const FooterLink = ({ children }) => (
  <Link mute fontSize="sm" color="gray.400" _hover={{ color: "white", textDecoration: "none" }} transition="color 0.2s">
    {children}
  </Link>
);

export default Footer;
