
//import Layout, { Container } from "components/shared/blocks/Layout";

/*authenticated pages layout*/
import React from "react";
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  SimpleGrid,
  Icon,
  Avatar,
  useColorModeValue,
  Container,
  VStack,
  HStack,
  Circle,
  Divider,
} from "@chakra-ui/react";
import { Layout, Section } from "components/components/pages";
import { motion } from "framer-motion";
import { HiShoppingBag, HiHeart, HiStar, HiChevronRight, HiBell } from "react-icons/hi";
import Link from "next/link";
import buildSEO from "utils/buildSEO";
import useAuth from "hooks/useAuth";

const pageSEO = buildSEO("User Dashboard", "Manage your orders and profile");

const MotionBox = motion(Box);

const StatCard = ({ title, value, icon, color }) => {
  return (
    <MotionBox
      whileHover={{ y: -5 }}
      p={6}
      bg={useColorModeValue("white", "gray.700")}
      rounded="2xl"
      shadow="sm"
      borderWidth="1px"
      borderColor={useColorModeValue("gray.100", "gray.600")}
    >
      <Flex align="center">
        <Circle size="12" bg={`${color}.50`} color={`${color}.500`}>
          <Icon as={icon} w={6} h={6} />
        </Circle>
        <Box ml={4}>
          <Text fontSize="sm" color="gray.500" fontWeight="medium">{title}</Text>
          <Heading size="lg">{value}</Heading>
        </Box>
      </Flex>
    </MotionBox>
  );
};

const DashboardOverview = () => {
  const auth = useAuth();
  const { me } = auth;
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const cardBg = useColorModeValue("white", "gray.700");
  const itemHoverBg = useColorModeValue("gray.50", "gray.600");

  return (
    <Layout SEO={pageSEO} bg={bgColor}>
      <Container maxW="container.xl" py={12}>
        {/* Profile Header */}
        <Box mb={10}>
          <Flex align="center" direction={{ base: "column", md: "row" }} textAlign={{ base: "center", md: "left" }}>
            <Avatar
              size="2xl"
              src="/img/avatar.png"
              name={me?.name}
              shadow="xl"
              borderWidth="4px"
              borderColor="white"
            />
            <Box ml={{ md: 8 }} mt={{ base: 4, md: 0 }}>
              <Heading size="xl" mb={1}>Welcome back, {me?.firstName || "Guest"}!</Heading>
              <Text color="gray.500" fontSize="lg">Manage your account settings and track your orders</Text>
            </Box>
          </Flex>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={10}>
          <StatCard title="Total Orders" value="12" icon={HiShoppingBag} color="blue" />
          <StatCard title="Wishlist Items" value="24" icon={HiHeart} color="red" />
          <StatCard title="Loyalty Points" value="1,250" icon={HiStar} color="yellow" />
          <StatCard title="Notifications" value="3" icon={HiBell} color="purple" />
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10}>
          {/* Recent Orders */}
          <Box bg={cardBg} p={8} rounded="2xl" shadow="sm" borderWidth="1px">
            <Flex justify="space-between" align="center" mb={6}>
              <Heading size="md">Recent Orders</Heading>
              <Link href="/users/orders" passHref>
                <Text color="blue.500" cursor="pointer" fontSize="sm" fontWeight="bold">View All</Text>
              </Link>
            </Flex>
            <VStack align="stretch" spacing={4}>
              {[1, 2, 3].map((order) => (
                <Flex key={order} align="center" justify="space-between" py={2}>
                  <HStack spacing={4}>
                    <Box p={2} bg="gray.50" rounded="lg">
                      <Icon as={HiShoppingBag} color="gray.400" />
                    </Box>
                    <VStack align="start" spacing={0}>
                      <Text fontWeight="bold">Order #TRX-12{order}45</Text>
                      <Text fontSize="xs" color="gray.500">Placed on May {order + 2}, 2022</Text>
                    </VStack>
                  </HStack>
                  <Text fontWeight="bold" color="blue.600">$120.00</Text>
                </Flex>
              ))}
            </VStack>
          </Box>

          {/* Account Quick Links */}
          <Box bg={cardBg} p={8} rounded="2xl" shadow="sm" borderWidth="1px">
            <Heading size="md" mb={6}>Account Settings</Heading>
            <VStack align="stretch" spacing={2}>
              {[
                { label: "Personal Information", desc: "Update your name and email", href: "/users/profile" },
                { label: "Shipping Addresses", desc: "Manage your delivery locations", href: "/users/profile" },
                { label: "Payment Methods", desc: "Your cards and digital wallets", href: "/users/wallet" },
                { label: "Account Preferences", desc: "Security and notification settings", href: "/users/preference" },
              ].map((link) => (
                <Link key={link.label} href={link.href} passHref>
                  <Flex
                    p={4}
                    rounded="xl"
                    _hover={{ bg: itemHoverBg }}
                    transition="all 0.2s"
                    cursor="pointer"
                    align="center"
                    justify="space-between"
                  >
                    <VStack align="start" spacing={0}>
                      <Text fontWeight="bold">{link.label}</Text>
                      <Text fontSize="xs" color="gray.500">{link.desc}</Text>
                    </VStack>
                    <Icon as={HiChevronRight} color="gray.300" />
                  </Flex>
                </Link>
              ))}
            </VStack>
          </Box>
        </SimpleGrid>
      </Container>
    </Layout>
  );
};

export default DashboardOverview;

  