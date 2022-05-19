import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  useColorModeValue,
  Container,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { 
  HiUsers, 
  HiShieldCheck, 
  HiUserGroup, 
  HiIdentification 
} from "react-icons/hi";
import {
  LayoutAdmin,
  CustomersTableSection,
  MarketersTableSection,
  AdministratorsTableSection,
} from "components/components/pages";
import buildSEO from "utils/buildSEO";
import usePageTab from "hooks/usePageTab";

const pageSEO = buildSEO("User Management", "Manage your platform's customers, marketers, and staff.");

const UsersPage = () => {
  const tabs = [
    { heading: "Customers", icon: HiUserGroup },
    { heading: "Marketers", icon: HiIdentification },
    { heading: "Staff", icon: HiShieldCheck },
  ];

  const pageTab = usePageTab(tabs);
  const cardBg = useColorModeValue("white", "gray.800");

  return (
    <LayoutAdmin SEO={pageSEO} page="users">
      <Box bg={useColorModeValue("gray.50", "gray.900")} minH="100vh" py={10} px={{ base: 4, lg: 12 }}>
        <VStack align="stretch" spacing={10}>
          {/* Header */}
          <VStack align="start" spacing={2}>
            <HStack color="blue.500">
              <Icon as={HiUsers} w={6} h={6} />
              <Text fontWeight="black" letterSpacing="widest" fontSize="xs">USER DIRECTORY</Text>
            </HStack>
            <Heading size="2xl" fontWeight="black" letterSpacing="tight">Community Management</Heading>
            <Text color="gray.500" fontSize="lg">View and manage all active accounts across the platform.</Text>
          </VStack>

          {/* Tabbed Interface */}
          <Tabs variant="soft-rounded" colorScheme="blue" index={pageTab.index}>
            <TabList bg={cardBg} p={2} rounded="full" shadow="sm" border="1px solid" borderColor={useColorModeValue("gray.100", "gray.700")} w="fit-content" mb={10}>
              {tabs.map((tab, idx) => (
                <Tab 
                  key={tab.heading} 
                  px={8} 
                  py={3} 
                  fontWeight="bold"
                  onClick={() => pageTab.setIndex(idx)}
                >
                  <Icon as={tab.icon} mr={2} />
                  {tab.heading}
                </Tab>
              ))}
            </TabList>

            <TabPanels>
              <TabPanel p={0}>
                <Box bg={cardBg} p={8} rounded="4xl" shadow="2xl" borderWidth="1px" borderColor={useColorModeValue("gray.100", "gray.700")}>
                   <CustomersTableSection mute />
                </Box>
              </TabPanel>
              <TabPanel p={0}>
                <Box bg={cardBg} p={8} rounded="4xl" shadow="2xl" borderWidth="1px" borderColor={useColorModeValue("gray.100", "gray.700")}>
                   <MarketersTableSection mute />
                </Box>
              </TabPanel>
              <TabPanel p={0}>
                <Box bg={cardBg} p={8} rounded="4xl" shadow="2xl" borderWidth="1px" borderColor={useColorModeValue("gray.100", "gray.700")}>
                   <AdministratorsTableSection mute />
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Box>
    </LayoutAdmin>
  );
};

export default UsersPage;

