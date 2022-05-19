


import React from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { HiShoppingBag } from "react-icons/hi";
import { LayoutAdmin, OrdersTableSection } from "components/components/pages";
import buildSEO from "utils/buildSEO";

const pageSEO = buildSEO("Order Management", "Track and manage all platform transactions and fulfillment.");

const OrdersPage = () => {
  const cardBg = useColorModeValue("white", "gray.800");

  return (
    <LayoutAdmin SEO={pageSEO} page="orders">
      <Box bg={useColorModeValue("gray.50", "gray.900")} minH="100vh" py={10} px={{ base: 4, lg: 12 }}>
        <VStack align="stretch" spacing={10}>
          {/* Header */}
          <VStack align="start" spacing={2}>
            <HStack color="blue.500">
              <Icon as={HiShoppingBag} w={6} h={6} />
              <Text fontWeight="black" letterSpacing="widest" fontSize="xs">FULFILLMENT HUB</Text>
            </HStack>
            <Heading size="2xl" fontWeight="black" letterSpacing="tight">Orders & Revenue</Heading>
            <Text color="gray.500" fontSize="lg">Monitor real-time sales performance and order status.</Text>
          </VStack>

          {/* Table Container */}
          <Box bg={cardBg} p={8} rounded="4xl" shadow="2xl" borderWidth="1px" borderColor={useColorModeValue("gray.100", "gray.700")}>
             <OrdersTableSection />
          </Box>
        </VStack>
      </Box>
    </LayoutAdmin>
  );
};

export default OrdersPage;

