

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
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { 
  HiCreditCard, 
  HiArrowUp, 
  HiArrowDown, 
  HiPlus, 
  HiLightningBolt, 
  HiShieldCheck,
  HiClock
} from "react-icons/hi";
import { motion } from "framer-motion";
import { Button, Modal, TextField } from "components/shared/lib";
import { Layout, Section } from "components/components/pages";
import buildSEO from "utils/buildSEO";
import formatPrice from "utils/formatPrice";

const pageSEO = buildSEO("My Wallet", "Manage your funds, view transactions, and link payment methods");

const MotionBox = motion(Box);

const BalanceCard = ({ label, amount, icon, color }) => (
  <MotionBox
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    bg="white"
    p={8}
    rounded="3xl"
    shadow="xl"
    borderWidth="1px"
    borderColor="gray.50"
    position="relative"
    overflow="hidden"
  >
    <Circle size={12} bg={`${color}.50`} color={`${color}.500`} mb={4}>
       <Icon as={icon} w={6} h={6} />
    </Circle>
    <Stat>
      <StatLabel color="gray.500" fontWeight="bold" textTransform="uppercase" fontSize="xs" letterSpacing="widest">{label}</StatLabel>
      <StatNumber fontSize="3xl" fontWeight="black" color="blue.900">{formatPrice("en-NG", amount, "NGN")}</StatNumber>
      <StatHelpText color="green.500" fontWeight="bold">
        <Icon as={HiArrowUp} mr={1} /> 12% from last month
      </StatHelpText>
    </Stat>
    <Box position="absolute" bottom="-10%" right="-10%" opacity={0.05}>
       <Icon as={icon} w="150px" h="150px" color="blue.900" />
    </Box>
  </MotionBox>
);

const TransactionRow = ({ type, description, date, amount, status }) => (
  <Tr _hover={{ bg: "gray.50" }} transition="background 0.2s">
    <Td>
      <HStack spacing={4}>
        <Circle size={10} bg={type === "credit" ? "green.50" : "red.50"} color={type === "credit" ? "green.500" : "red.500"}>
          <Icon as={type === "credit" ? HiArrowDown : HiArrowUp} />
        </Circle>
        <VStack align="start" spacing={0}>
          <Text fontWeight="black" fontSize="sm">{description}</Text>
          <Text fontSize="xs" color="gray.400">{date}</Text>
        </VStack>
      </HStack>
    </Td>
    <Td>
       <Badge colorScheme={status === "completed" ? "green" : "orange"} variant="subtle" rounded="full" px={3}>
          {status}
       </Badge>
    </Td>
    <Td isNumeric>
      <Text fontWeight="black" color={type === "credit" ? "green.600" : "red.600"}>
        {type === "credit" ? "+" : "-"}{formatPrice("en-NG", amount, "NGN")}
      </Text>
    </Td>
  </Tr>
);

const WalletPage = () => {
  const transactions = [
    { type: "debit", description: "UI Design Course Enrollment", date: "May 14, 2022", amount: 25000, status: "completed" },
    { type: "credit", description: "Wallet Funding via Paystack", date: "May 12, 2022", amount: 50000, status: "completed" },
    { type: "debit", description: "E-learning Accelerator Monthly Subscription", date: "May 10, 2022", amount: 15000, status: "completed" },
    { type: "credit", description: "Referral Bonus", date: "May 05, 2022", amount: 5000, status: "completed" },
  ];

  return (
    <Layout SEO={pageSEO}>
      <Box bg="gray.50" minH="100vh" pt={12} pb={24}>
        <Container maxW="container.xl">
          <VStack spacing={12} align="stretch">
            {/* Header Section */}
            <Flex justify="space-between" align="end" direction={{ base: "column", md: "row" }} gap={6}>
              <VStack align="start" spacing={2}>
                <HStack color="blue.500">
                  <Icon as={HiCreditCard} w={6} h={6} />
                  <Text fontWeight="black" letterSpacing="widest" fontSize="xs">MY WALLET</Text>
                </HStack>
                <Heading size="2xl" fontWeight="black" letterSpacing="tight">Financial Hub</Heading>
              </VStack>
              
              <HStack spacing={4}>
                 <Button colorScheme="blue" rounded="full" h={14} px={8} leftIcon={<HiPlus />} shadow="xl" _hover={{ transform: "translateY(-2px)", shadow: "2xl" }}>
                    Add Funds
                 </Button>
                 <Button variant="ghost" colorScheme="blue" rounded="full" h={14} px={8} leftIcon={<HiArrowUp />}>
                    Withdraw
                 </Button>
              </HStack>
            </Flex>

            {/* Balance Overview */}
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
              <BalanceCard label="Current Balance" amount={120500} icon={HiLightningBolt} color="blue" />
              <BalanceCard label="Total Spent" amount={450000} icon={HiArrowUp} color="orange" />
              <BalanceCard label="Pending Rewards" amount={15000} icon={HiClock} color="purple" />
            </SimpleGrid>

            {/* Transaction History */}
            <Box bg="white" rounded="3xl" shadow="xl" p={8} borderWidth="1px" borderColor="gray.100">
               <Flex justify="space-between" align="center" mb={8}>
                  <Heading size="md" fontWeight="black">Recent Activity</Heading>
                  <Button variant="link" colorScheme="blue" size="sm">View All Transactions</Button>
               </Flex>
               
               <Box overflowX="auto">
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th fontSize="xs" letterSpacing="widest">Transaction</Th>
                        <Th fontSize="xs" letterSpacing="widest">Status</Th>
                        <Th fontSize="xs" letterSpacing="widest" isNumeric>Amount</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {transactions.map((tx, idx) => (
                        <TransactionRow key={idx} {...tx} />
                      ))}
                    </Tbody>
                  </Table>
               </Box>
            </Box>

            {/* Link New Card Section */}
            <Box bg="blue.900" rounded="3xl" p={12} color="white" position="relative" overflow="hidden">
               <Box position="absolute" top="-20%" right="-10%" w="40%" h="140%" bg="whiteAlpha.100" rounded="full" blur="40px" />
               <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12} alignItems="center" position="relative" zIndex={1}>
                  <VStack align="start" spacing={6}>
                     <HStack color="blue.300">
                        <Icon as={HiShieldCheck} />
                        <Text fontWeight="bold" fontSize="sm">SECURE PAYMENTS</Text>
                     </HStack>
                     <Heading size="xl" fontWeight="black" lineHeight="tight">Link your card for instant funding</Heading>
                     <Text fontSize="lg" opacity={0.8}>
                        Securely save your payment methods to enable one-click funding and faster checkout across the platform.
                     </Text>
                     <Button bg="white" color="blue.900" rounded="full" px={10} h={14} fontWeight="black" _hover={{ bg: "blue.50", transform: "scale(1.05)" }}>
                        Link New Card
                     </Button>
                  </VStack>
                  <Center>
                     <Box 
                        bgGradient="linear(to-br, blue.400, blue.600)" 
                        w="full" 
                        maxW="400px" 
                        h="240px" 
                        rounded="2xl" 
                        p={8} 
                        shadow="2xl"
                        position="relative"
                     >
                        <HStack justify="space-between" align="start">
                           <Icon as={HiCreditCard} w={12} h={12} color="whiteAlpha.800" />
                           <Text fontWeight="black" letterSpacing="widest">PREMIUM</Text>
                        </HStack>
                        <VStack align="start" mt={8} spacing={1}>
                           <Text fontSize="xs" opacity={0.6} textTransform="uppercase">Card Number</Text>
                           <Text fontSize="xl" letterSpacing="widest" fontWeight="bold">**** **** **** 5399</Text>
                        </VStack>
                        <HStack justify="space-between" mt={4}>
                           <VStack align="start" spacing={0}>
                              <Text fontSize="2xs" opacity={0.6} textTransform="uppercase">Expiry</Text>
                              <Text fontSize="sm" fontWeight="bold">12/25</Text>
                           </VStack>
                           <VStack align="end" spacing={0}>
                              <Text fontSize="2xs" opacity={0.6} textTransform="uppercase">Card Holder</Text>
                              <Text fontSize="sm" fontWeight="bold">JOHN DOE</Text>
                           </VStack>
                        </HStack>
                     </Box>
                  </Center>
               </SimpleGrid>
            </Box>
          </VStack>
        </Container>
      </Box>
    </Layout>
  );
};

export default WalletPage;

