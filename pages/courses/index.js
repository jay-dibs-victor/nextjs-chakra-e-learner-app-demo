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
import { HiChevronRight, HiFilter, HiSortDescending, HiAcademicCap } from "react-icons/hi";
import buildSEO from "utils/buildSEO";

const pageSEO = buildSEO("Courses Catalog", "Master high-demand skills with our expert-led online courses.");

const CoursesPage = () => {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.100", "gray.700");

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
                  <BreadcrumbLink href="#" fontWeight="bold">Courses</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
              <HStack spacing={4}>
                 <Icon as={HiAcademicCap} w={10} h={10} color="blue.500" />
                 <Heading size="3xl" fontWeight="black">Learning Library</Heading>
              </HStack>
              <Text fontSize="xl" color="gray.500">Structured learning paths designed by industry leaders.</Text>
            </VStack>

            {/* Specialized Filter Bar for Courses */}
            <HStack justify="space-between" bg={cardBg} p={5} rounded="3xl" shadow="xl" border="1px solid" borderColor={borderColor}>
               <HStack spacing={6}>
                  <Button leftIcon={<HiFilter />} variant="solid" colorScheme="blue" rounded="2xl" px={6}>All Categories</Button>
                  <HStack spacing={3} d={{ base: "none", md: "flex" }}>
                    <Badge colorScheme="purple" variant="subtle" px={4} py={2} rounded="full" cursor="pointer" _hover={{ bg: "purple.100" }}>Development</Badge>
                    <Badge colorScheme="green" variant="subtle" px={4} py={2} rounded="full" cursor="pointer" _hover={{ bg: "green.100" }}>Design</Badge>
                    <Badge colorScheme="orange" variant="subtle" px={4} py={2} rounded="full" cursor="pointer" _hover={{ bg: "orange.100" }}>Marketing</Badge>
                    <Badge colorScheme="red" variant="subtle" px={4} py={2} rounded="full" cursor="pointer" _hover={{ bg: "red.100" }}>Business</Badge>
                  </HStack>
               </HStack>
               <HStack spacing={4}>
                  <Text fontWeight="bold" fontSize="sm" color="gray.400" d={{ base: "none", lg: "block" }}>SORT BY</Text>
                  <Button rightIcon={<HiSortDescending />} variant="outline" borderColor={borderColor} rounded="2xl">Newest First</Button>
               </HStack>
            </HStack>

            {/* Courses Grid */}
            <Section>
               <ProductCards type="courses" />
            </Section>

            {/* Specialized CTA for the Course page */}
            <Box py={16} bg="blue.600" rounded="4xl" color="white" textAlign="center" shadow="2xl" position="relative" overflow="hidden">
               <Box position="absolute" top="-20%" left="-10%" w="40%" h="140%" bg="whiteAlpha.100" rounded="full" blur="80px" />
               <VStack spacing={6} position="relative" zIndex={1}>
                  <Heading size="xl" fontWeight="black">Not sure where to start?</Heading>
                  <Text fontSize="lg" maxW="2xl" mx="auto" opacity={0.9}>
                    Take our specialized learning path quiz to find the perfect course tailored to your current skills and career goals.
                  </Text>
                  <Button size="lg" bg="white" color="blue.600" rounded="full" px={12} h={16} fontWeight="black" _hover={{ transform: "scale(1.05)" }}>
                    Start Skill Quiz
                  </Button>
               </VStack>
            </Box>

          </VStack>
        </Container>
      </Box>
    </Layout>
  );
};

export default CoursesPage;
