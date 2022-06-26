

import React from "react";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  Icon,
  HStack,
  VStack,
  Divider,
  Badge,
  Circle,
  useColorModeValue,
  SimpleGrid,
  Container,
  ButtonGroup,
} from "@chakra-ui/react";
import { 
  HiPencilAlt, 
  HiTrash, 
  HiPlus, 
  HiUserCircle, 
  HiCreditCard, 
  HiMap, 
  HiShieldCheck 
} from "react-icons/hi";
import { motion } from "framer-motion";
import { Button, Modal, TextField } from "components/shared/lib";
import { Layout, Section } from "components/components/pages";
import useForm from "hooks/useForm";
import buildSEO from "utils/buildSEO";
import http from "utils/http";
import useAuth from "hooks/useAuth";
import { useEffect, useState } from "react";
import withAuth from "core/libs/hocs/withAuth";

const pageSEO = buildSEO("User Profile", "Manage your account preferences and security settings");

const MotionBox = motion(Box);

const PopModal = ({
  heading,
  initialFieldsProps,
  doSubmit,
  renderTrigger,
  submitButtonText,
}) => {
  const { formProps, handleType, fieldsProps, renderSubmitBtn } = useForm({
    doSubmit,
    initialFieldsProps,
  });

  return (
    <Modal renderTrigger={renderTrigger}>
      {({ handleClose }) => (
        <VStack as="form" {...formProps} spacing={8} align="stretch" p={4}>
          <VStack align="start" spacing={1}>
            <Heading size="md" fontWeight="black">{heading}</Heading>
            <Text fontSize="sm" color="gray.500">Please provide the updated information below.</Text>
          </VStack>

          <VStack spacing={4}>
            {fieldsProps.map((field) => (
              <TextField {...field} key={field.id} onChange={handleType} variant="filled" rounded="xl" />
            ))}
          </VStack>

          <Flex justifyContent="flex-end">
            <ButtonGroup spacing={3}>
              <Button variant="ghost" rounded="full" onClick={handleClose}>
                Cancel
              </Button>
              {renderSubmitBtn({
                text: submitButtonText || "Save Changes",
                variant: "primary",
                rounded: "full",
                px: 8,
              })}
            </ButtonGroup>
          </Flex>
        </VStack>
      )}
    </Modal>
  );
};

const Card = ({ heading, data, subHeading, onEdit, icon, color }) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.100", "gray.700");

  const handleRemove = async () => {
    const yes = confirm("Are you sure you want to remove this information?");
    if (yes) {
      await http.get("/me");
      location.reload();
    }
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      bg={cardBg}
      rounded="3xl"
      shadow="xl"
      borderWidth="1px"
      borderColor={borderColor}
      p={8}
      position="relative"
      overflow="hidden"
    >
      <Box position="absolute" top={0} left={0} w="full" h="4px" bg={`${color}.500`} />
      
      <Flex justify="space-between" align="start" mb={8}>
        <HStack spacing={4}>
          <Circle size={12} bg={`${color}.50`} color={`${color}.500`}>
            <Icon as={icon} w={6} h={6} />
          </Circle>
          <VStack align="start" spacing={0}>
             <Heading size="sm" fontWeight="black">{heading}</Heading>
             <Text fontSize="xs" color="gray.400" fontWeight="bold" textTransform="uppercase">{subHeading}</Text>
          </VStack>
        </HStack>
        
        <HStack spacing={2}>
           <PopModal
             heading={`Edit ${heading}`}
             initialFieldsProps={data}
             doSubmit={onEdit}
             renderTrigger={({ handleOpen }) => (
                <Button variant="ghost" size="sm" rounded="full" colorScheme={color} onClick={handleOpen} leftIcon={<HiPencilAlt />}>
                   Edit
                </Button>
             )}
             submitButtonText="Update"
           />
           <Button variant="ghost" size="sm" rounded="full" colorScheme="red" onClick={handleRemove} leftIcon={<HiTrash />}>
              Remove
           </Button>
        </HStack>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
        {data.map((item, index) => (
          <VStack align="start" key={index} spacing={1}>
            <Text fontSize="xs" fontWeight="black" color="gray.400" textTransform="uppercase" letterSpacing="widest">
              {item.label}
            </Text>
            <Text fontWeight="medium" fontSize="md" color="blue.900">
              {item.value}
            </Text>
          </VStack>
        ))}
      </SimpleGrid>
    </MotionBox>
  );
};

const SettingsPage = () => {
  const cardBg = useColorModeValue("white", "gray.800");
  const [profileData, setProfileData] = useState(null);
  const auth = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!auth.me) return;
        const res = await http.get("/users/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setProfileData(res.data);
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };
    fetchProfile();
  }, [auth.me]);

  const accountInfoCardData = [
    {
      id: "address",
      label: "Default Shipping Address",
      value: profileData?.address || "Not set",
    },
    {
      id: "phone",
      label: "Phone Contact",
      value: profileData?.phone || "Not set",
    },
  ];

  const cardDetailsCardData = [
    {
      id: "paymentMethod.cardName",
      label: "Name on Card",
      value: profileData?.paymentMethod?.cardName || "Not set",
    },
    {
      id: "paymentMethod.cardType",
      label: "Payment Network",
      value: profileData?.paymentMethod?.cardType || "Not set",
    },
    {
      id: "paymentMethod.cardNumber",
      label: "Masked Number",
      value: profileData?.paymentMethod?.cardNumber || "Not set",
    },
  ];

  const handleUpdate = async (fieldsObj) => {
    try {
      // Reconstruct nested object if needed
      const payload = {};
      Object.keys(fieldsObj).forEach(key => {
        if (key.startsWith("paymentMethod.")) {
          if (!payload.paymentMethod) payload.paymentMethod = {};
          payload.paymentMethod[key.split(".")[1]] = fieldsObj[key];
        } else {
          payload[key] = fieldsObj[key];
        }
      });

      const res = await http.put("/users/profile", payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setProfileData(res.data);
    } catch (err) {
      console.error("Failed to update profile", err);
    }
  };

  return (
    <Layout SEO={pageSEO}>
      <Box bg="gray.50" minH="100vh" pt={12} pb={24}>
        <Container maxW="container.lg">
          <VStack spacing={12} align="stretch">
            {/* Header Section */}
            <Flex justify="space-between" align="end">
              <VStack align="start" spacing={2}>
                <HStack color="blue.500">
                  <Icon as={HiUserCircle} w={6} h={6} />
                  <Text fontWeight="black" letterSpacing="widest" fontSize="xs">USER SETTINGS</Text>
                </HStack>
                <Heading size="2xl" fontWeight="black" letterSpacing="tight">Profile & Preferences</Heading>
              </VStack>
              
              <HStack bg="blue.50" px={4} py={2} rounded="2xl" color="blue.600">
                 <Icon as={HiShieldCheck} />
                 <Text fontSize="sm" fontWeight="bold">Verified Account</Text>
              </HStack>
            </Flex>

            <Divider borderColor="gray.200" />

            {/* Content Sections */}
            <VStack spacing={10} align="stretch">
              <VStack align="stretch" spacing={6}>
                 <Flex justify="space-between" align="center">
                    <Heading size="md" fontWeight="black">Shipping Information</Heading>
                    <PopModal
                      heading="Add New Address"
                      initialFieldsProps={accountInfoCardData.map(i => ({...i, value: ""}))}
                      doSubmit={handleUpdate}
                      renderTrigger={({ handleOpen }) => (
                         <Button leftIcon={<HiPlus />} colorScheme="blue" rounded="full" size="sm" px={6} onClick={handleOpen}>
                            Add Address
                         </Button>
                      )}
                    />
                 </Flex>
                 <Card
                   icon={HiMap}
                   color="blue"
                   heading="Primary Residence"
                   subHeading="Main Delivery Point"
                   data={accountInfoCardData}
                   onEdit={handleUpdate}
                 />
              </VStack>

              <VStack align="stretch" spacing={6}>
                 <Flex justify="space-between" align="center">
                    <Heading size="md" fontWeight="black">Payment Methods</Heading>
                    <PopModal
                      heading="Add Payment Method"
                      initialFieldsProps={cardDetailsCardData.map(i => ({...i, value: ""}))}
                      doSubmit={handleUpdate}
                      renderTrigger={({ handleOpen }) => (
                         <Button leftIcon={<HiPlus />} colorScheme="purple" rounded="full" size="sm" px={6} onClick={handleOpen}>
                            Add Card
                         </Button>
                      )}
                    />
                 </Flex>
                 <Card
                   icon={HiCreditCard}
                   color="purple"
                   heading="Default Payment Card"
                   subHeading="Secure Billing Information"
                   data={cardDetailsCardData}
                   onEdit={handleUpdate}
                 />
              </VStack>
            </VStack>

            {/* Security Tip */}
            <Box bg="blue.900" rounded="3xl" p={10} color="white" position="relative" overflow="hidden">
               <Box position="absolute" top="-20%" right="-10%" w="40%" h="140%" bg="whiteAlpha.100" rounded="full" blur="40px" />
               <VStack align="start" spacing={6} position="relative" zIndex={1}>
                  <Heading size="lg" fontWeight="black">Security Reminder</Heading>
                  <Text fontSize="lg" opacity={0.8} maxW="2xl">
                     Keep your account information secure. We will never ask for your full credit card number or password via email or SMS.
                  </Text>
                  <Button variant="outline" color="white" borderColor="whiteAlpha.400" rounded="full" px={10} _hover={{ bg: "whiteAlpha.200" }}>
                     Manage Security Settings
                  </Button>
               </VStack>
            </Box>
          </VStack>
        </Container>
      </Box>
    </Layout>
  );
};

export default withAuth(SettingsPage);

