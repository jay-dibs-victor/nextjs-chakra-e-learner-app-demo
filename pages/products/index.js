import React from "react";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Container,
  VStack,
  HStack,
  Button,
  Badge,
  useColorModeValue,
  Icon,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { Layout, Section } from "components/components/pages";
import { ProductCards } from "components/shared/lib";
import { HiChevronRight, HiFilter, HiSortDescending } from "react-icons/hi";
import buildSEO from "utils/buildSEO";

const pageSEO = buildSEO("Products Catalog", "Browse our collection of premium office and tech products.");

const ProductsPage = () => {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");

  return (
    <Layout SEO={pageSEO} bg={bgColor}>
      <Box py={20}>
        <Container maxW="full" px={{ base: 6, lg: 24 }}>

          <VStack align="stretch" spacing={12}>

            {/* Header / Breadcrumbs */}
            <VStack align="start" spacing={4}>
              <Breadcrumb spacing="8px" separator={<HiChevronRight color="gray.500" />}>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" color="gray.500">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink href="#" fontWeight="bold">Products</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
              <Heading size="3xl" fontWeight="black">Our Collections</Heading>
              <Text fontSize="xl" color="gray.500">View Our courses available.</Text>
            </VStack>

            {/* Filter Bar */}
            <HStack justify="space-between" bg={cardBg} p={4} rounded="2xl" shadow="sm" border="1px solid" borderColor="gray.100">
              <HStack spacing={4}>
                <Button leftIcon={<HiFilter />} variant="ghost" rounded="xl">Filters</Button>
                <Badge colorScheme="blue" variant="subtle" px={3} py={1} rounded="full">Office Furniture x</Badge>
                <Badge colorScheme="blue" variant="subtle" px={3} py={1} rounded="full">Tech Gadgets x</Badge>
              </HStack>
              <Button rightIcon={<HiSortDescending />} variant="ghost" rounded="xl">Sort by: Popularity</Button>
            </HStack>

            {/* Products Grid */}
            <Section>
              <ProductCards />
            </Section>

            {/* Pagination / Load More */}
            <VStack py={12}>
              <Button size="lg" h={16} px={12} colorScheme="blue" rounded="full" fontWeight="black" shadow="xl">Load More Products</Button>
              <Text color="gray.500" mt={4}>Showing 12 of 156 products</Text>
            </VStack>

          </VStack>
        </Container>
      </Box>
    </Layout>
  );
};

export default ProductsPage;
