import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { HiAcademicCap } from "react-icons/hi";
import { LayoutAdmin, CoursesTableSection } from "components/components/pages";
import buildSEO from "utils/buildSEO";

const pageSEO = buildSEO("Course Management", "Create, edit, and monitor your educational content and student enrollment.");

const CoursesPage = () => {
  const cardBg = useColorModeValue("white", "gray.800");

  return (
    <LayoutAdmin SEO={pageSEO} page="courses">
      <Box bg={useColorModeValue("gray.50", "gray.900")} minH="100vh" py={10} px={{ base: 4, lg: 12 }}>
        <VStack align="stretch" spacing={10}>
          {/* Header */}
          <VStack align="start" spacing={2}>
            <HStack color="blue.500">
              <Icon as={HiAcademicCap} w={6} h={6} />
              <Text fontWeight="black" letterSpacing="widest" fontSize="xs">LMS CONTROLLER</Text>
            </HStack>
            <Heading size="2xl" fontWeight="black" letterSpacing="tight">Educational Catalog</Heading>
            <Text color="gray.500" fontSize="lg">Manage your curriculum, instructors, and student engagement metrics.</Text>
          </VStack>

          {/* Table Container */}
          <Box bg={cardBg} p={8} rounded="4xl" shadow="2xl" borderWidth="1px" borderColor={useColorModeValue("gray.100", "gray.700")}>
             <CoursesTableSection mute />
          </Box>
        </VStack>
      </Box>
    </LayoutAdmin>
  );
};

export default CoursesPage;
