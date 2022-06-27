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
import { HiCube } from "react-icons/hi";
import { LayoutAdmin, ProductsTableSection } from "components/components/pages";
import buildSEO from "utils/buildSEO";

const pageSEO = buildSEO("Product Inventory", "View, edit, and track your entire inventory from a single interface.");

const ProductsPage = () => {
  const cardBg = useColorModeValue("white", "gray.800");

  return (
    <LayoutAdmin SEO={pageSEO} page="products">
      <Box bg={useColorModeValue("gray.50", "gray.900")} minH="100vh" py={10} px={{ base: 4, lg: 12 }}>
        <VStack align="stretch" spacing={10}>
          {/* Header */}
          <VStack align="start" spacing={2}>
            <HStack color="blue.500">
              <Icon as={HiCube} w={6} h={6} />
              <Text fontWeight="black" letterSpacing="widest" fontSize="xs">STOCK MANAGER</Text>
            </HStack>
            <Heading size="2xl" fontWeight="black" letterSpacing="tight">Inventory Control</Heading>
            <Text color="gray.500" fontSize="lg">Manage product details, pricing, and availability across the store.</Text>
          </VStack>

          {/* Table Container */}
          <Box bg={cardBg} p={8} rounded="4xl" shadow="2xl" borderWidth="1px" borderColor={useColorModeValue("gray.100", "gray.700")}>
             <ProductsTableSection mute />
          </Box>
        </VStack>
      </Box>
    </LayoutAdmin>
  );
};

export default ProductsPage;
