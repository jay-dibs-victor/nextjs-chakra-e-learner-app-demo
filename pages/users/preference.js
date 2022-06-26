

import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Icon,
  HStack,
  VStack,
  Divider,
  Switch,
  FormControl,
  FormLabel,
  useColorModeValue,
  Container,
  SimpleGrid,
  Circle,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { 
  HiBell, 
  HiLockClosed, 
  HiCog, 
  HiUser, 
  HiMail, 
  HiGlobe,
  HiChevronRight
} from "react-icons/hi";
import { motion } from "framer-motion";
import { Layout } from "components/components/pages";
import { Button } from "components/shared/lib";
import buildSEO from "utils/buildSEO";
import { useState, useEffect } from "react";
import withAuth from "core/libs/hocs/withAuth";
import http from "utils/http";
import useAuth from "hooks/useAuth";

const pageSEO = buildSEO("Preferences", "Customize your notification and privacy settings");

const MotionBox = motion(Box);

const PreferenceItem = ({ icon, title, description, isChecked, onChange, color = "blue" }) => {
  const borderColor = useColorModeValue("gray.100", "gray.700");
  
  return (
    <Flex 
      justify="space-between" 
      align="center" 
      p={6} 
      borderBottom="1px solid" 
      borderColor={borderColor}
      _last={{ borderBottom: "none" }}
    >
      <HStack spacing={4}>
        <Circle size={10} bg={`${color}.50`} color={`${color}.500`}>
          <Icon as={icon} w={5} h={5} />
        </Circle>
        <VStack align="start" spacing={0}>
          <Text fontWeight="black" fontSize="md">{title}</Text>
          <Text fontSize="sm" color="gray.500">{description}</Text>
        </VStack>
      </HStack>
      <Switch colorScheme={color} isChecked={isChecked} onChange={onChange} size="lg" />
    </Flex>
  );
};

const PreferencePage = () => {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const auth = useAuth();
  
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!auth.me) return;
        const res = await http.get("/users/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        if (res.data.preferences) {
          setEmailNotifications(res.data.preferences.emailNotifications ?? true);
        }
      } catch (err) {
        console.error("Failed to fetch preferences", err);
      }
    };
    fetchProfile();
  }, [auth.me]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await http.put("/users/preferences", {
        emailNotifications,
        theme: "system"
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert("Preferences saved successfully!");
    } catch (err) {
      console.error("Failed to update preferences", err);
      alert("Failed to save preferences.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Layout SEO={pageSEO}>
      <Box bg={bgColor} minH="100vh" pt={12} pb={24}>
        <Container maxW="container.lg">
          <VStack spacing={12} align="stretch">
            {/* Header */}
            <VStack align="start" spacing={2}>
              <HStack color="blue.500">
                <Icon as={HiCog} w={6} h={6} />
                <Text fontWeight="black" letterSpacing="widest" fontSize="xs">USER PREFERENCES</Text>
              </HStack>
              <Heading size="2xl" fontWeight="black" letterSpacing="tight">Settings & Privacy</Heading>
              <Text color="gray.500" fontSize="lg">Control how you interact with the platform and manage your digital footprint.</Text>
            </VStack>

            <Tabs variant="soft-rounded" colorScheme="blue">
              <TabList bg={cardBg} p={2} rounded="full" shadow="sm" border="1px solid" borderColor="gray.100" w="fit-content">
                <Tab px={8} py={3} fontWeight="bold"><Icon as={HiBell} mr={2} /> Notifications</Tab>
                <Tab px={8} py={3} fontWeight="bold"><Icon as={HiLockClosed} mr={2} /> Security</Tab>
                <Tab px={8} py={3} fontWeight="bold"><Icon as={HiGlobe} mr={2} /> Language</Tab>
              </TabList>

              <TabPanels mt={10}>
                {/* Notifications Panel */}
                <TabPanel p={0}>
                  <MotionBox
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    bg={cardBg}
                    rounded="3xl"
                    shadow="xl"
                    overflow="hidden"
                    borderWidth="1px"
                    borderColor="gray.100"
                  >
                    <Box p={8} bg="blue.900" color="white">
                       <Heading size="md" fontWeight="black">Alert Preferences</Heading>
                       <Text opacity={0.7} fontSize="sm">Stay updated with what&apos;s happening in your academy.</Text>
                    </Box>
                    <VStack align="stretch" spacing={0}>
                      <PreferenceItem 
                        icon={HiMail} 
                        title="Email Notifications" 
                        description="Receive weekly summaries and course updates via email."
                        isChecked={emailNotifications}
                        onChange={(e) => setEmailNotifications(e.target.checked)}
                      />
                    </VStack>
                    <Box p={6} bg="gray.50">
                       <Button variant="primary" rounded="full" px={10} isLoading={isSaving} onClick={handleSave}>Save Notification Settings</Button>
                    </Box>
                  </MotionBox>
                </TabPanel>

                {/* Security Panel */}
                <TabPanel p={0}>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
                     <MotionBox
                       initial={{ opacity: 0, scale: 0.95 }}
                       animate={{ opacity: 1, scale: 1 }}
                       bg={cardBg}
                       rounded="3xl"
                       p={8}
                       shadow="xl"
                       borderWidth="1px"
                       borderColor="gray.100"
                     >
                        <VStack align="start" spacing={6}>
                           <Circle size={12} bg="red.50" color="red.500">
                              <Icon as={HiLockClosed} w={6} h={6} />
                           </Circle>
                           <VStack align="start" spacing={2}>
                              <Heading size="md" fontWeight="black">Two-Factor Auth</Heading>
                              <Text fontSize="sm" color="gray.500">Add an extra layer of security to your account by enabling 2FA.</Text>
                           </VStack>
                           <Button colorScheme="red" variant="outline" rounded="full" w="full" h={12}>Enable 2FA</Button>
                        </VStack>
                     </MotionBox>

                     <MotionBox
                       initial={{ opacity: 0, scale: 0.95 }}
                       animate={{ opacity: 1, scale: 1 }}
                       transition={{ delay: 0.1 }}
                       bg={cardBg}
                       rounded="3xl"
                       p={8}
                       shadow="xl"
                       borderWidth="1px"
                       borderColor="gray.100"
                     >
                        <VStack align="start" spacing={6}>
                           <Circle size={12} bg="green.50" color="green.500">
                              <Icon as={HiUser} w={6} h={6} />
                           </Circle>
                           <VStack align="start" spacing={2}>
                              <Heading size="md" fontWeight="black">Account Privacy</Heading>
                              <Text fontSize="sm" color="gray.500">Decide who can see your course progress and certificates.</Text>
                           </VStack>
                           <Button colorScheme="green" variant="outline" rounded="full" w="full" h={12}>Manage Privacy</Button>
                        </VStack>
                     </MotionBox>
                  </SimpleGrid>
                </TabPanel>
              </TabPanels>
            </Tabs>

            {/* Support CTA */}
            <Box bg="blue.900" rounded="4xl" p={12} color="white" position="relative" overflow="hidden">
               <Box position="absolute" top="-20%" right="-10%" w="40%" h="140%" bg="whiteAlpha.100" rounded="full" blur="40px" />
               <HStack justify="space-between" align="center" direction={{ base: "column", md: "row" }} gap={10}>
                  <VStack align="start" spacing={6} maxW="2xl">
                     <Heading size="xl" fontWeight="black">Need help with your account?</Heading>
                     <Text fontSize="lg" opacity={0.8}>
                        Our support team is available 24/7 to help you with any issues regarding your profile or security settings.
                     </Text>
                     <Button bg="white" color="blue.900" rounded="full" px={10} h={14} fontWeight="black" rightIcon={<HiChevronRight />}>
                        Visit Help Center
                     </Button>
                  </VStack>
                  <Icon as={HiCog} w="200px" h="200px" opacity={0.1} />
               </HStack>
            </Box>
          </VStack>
        </Container>
      </Box>
    </Layout>
  );
};

export default withAuth(PreferencePage);

