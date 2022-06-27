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
import { HiCollection } from "react-icons/hi";
import { LayoutAdmin, CategoriesTableSection } from "components/components/pages";
import buildSEO from "utils/buildSEO";

const pageSEO = buildSEO("Category Management", "Organize and classify your products into meaningful groups.");

const CategoriesPage = () => {
  const cardBg = useColorModeValue("white", "gray.800");

  return (
    <LayoutAdmin SEO={pageSEO} page="categories">
      <Box bg={useColorModeValue("gray.50", "gray.900")} minH="100vh" py={10} px={{ base: 4, lg: 12 }}>
        <VStack align="stretch" spacing={10}>
          {/* Header */}
          <VStack align="start" spacing={2}>
            <HStack color="blue.500">
              <Icon as={HiCollection} w={6} h={6} />
              <Text fontWeight="black" letterSpacing="widest" fontSize="xs">TAXONOMY MANAGER</Text>
            </HStack>
            <Heading size="2xl" fontWeight="black" letterSpacing="tight">Product Categories</Heading>
            <Text color="gray.500" fontSize="lg">Maintain the hierarchy and structure of your product catalog.</Text>
          </VStack>

          {/* Table Container */}
          <Box bg={cardBg} p={8} rounded="4xl" shadow="2xl" borderWidth="1px" borderColor={useColorModeValue("gray.100", "gray.700")}>
             <CategoriesTableSection mute />
          </Box>
        </VStack>
      </Box>
    </LayoutAdmin>
  );
};

export default CategoriesPage;
