import React from "react";
import {
  Box,
  Flex,
  SimpleGrid,
  Heading,
  Text,
  Icon,
  Badge,
  VStack,
  HStack,
  Circle,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Avatar,
  Divider,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  HiShoppingBag,
  HiUsers,
  HiCurrencyDollar,
  HiTrendingUp,
  HiArrowUp,
  HiArrowDown,
  HiViewGrid,
  HiDotsHorizontal,
} from "react-icons/hi";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { LayoutAdmin } from "components/components/pages";
import buildSEO from "utils/buildSEO";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip, Legend);

const MotionBox = motion(Box);

const chartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Gross Revenue",
      data: [42000, 78000, 56000, 91000, 72000, 115000],
      fill: true,
      borderColor: "#3182ce",
      backgroundColor: "rgba(49, 130, 206, 0.1)",
      tension: 0.4,
      pointRadius: 4,
      pointBackgroundColor: "#3182ce",
    },
    {
      label: "Net Profit",
      data: [21000, 39000, 28000, 45500, 36000, 57500],
      fill: true,
      borderColor: "#805ad5",
      backgroundColor: "rgba(128, 90, 213, 0.05)",
      tension: 0.4,
      pointRadius: 4,
      pointBackgroundColor: "#805ad5",
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { 
    legend: { display: false },
    tooltip: {
      backgroundColor: "#1A202C",
      titleFont: { size: 14, weight: "bold" },
      bodyFont: { size: 13 },
      padding: 12,
      cornerRadius: 8,
    }
  },
  scales: {
    y: { 
       beginAtZero: true, 
       grid: { color: "rgba(0,0,0,0.03)", drawBorder: false },
       ticks: { color: "#A0AEC0", font: { size: 12 } }
    },
    x: { 
       grid: { display: false },
       ticks: { color: "#A0AEC0", font: { size: 12 } }
    },
  },
};

const kpiData = [
  { label: "Total Revenue", value: "₦12,845,000", icon: HiCurrencyDollar, color: "blue", change: "+12.5%", up: true },
  { label: "Active Learners", value: "4,820", icon: HiUsers, color: "purple", change: "+8.3%", up: true },
  { label: "Course Sales", value: "1,290", icon: HiShoppingBag, color: "green", change: "+3.1%", up: true },
  { label: "Conversion Rate", value: "24.6%", icon: HiTrendingUp, color: "orange", change: "-1.4%", up: false },
];

const recentOrders = [
  { id: "#TRX-0021", customer: "Adewale Jones", email: "ade@example.com", amount: "₦120,000", status: "Completed", date: "May 15, 2022" },
  { id: "#TRX-0022", customer: "Sarah Connor", email: "sarah@cyber.com", amount: "₦250,000", status: "Processing", date: "May 15, 2022" },
  { id: "#TRX-0023", customer: "Tunde Ednut", email: "tunde@king.com", amount: "₦75,000", status: "Completed", date: "May 14, 2022" },
  { id: "#TRX-0024", customer: "Grace Amadi", email: "grace@africa.com", amount: "₦340,000", status: "Failed", date: "May 14, 2022" },
  { id: "#TRX-0025", customer: "John Wick", email: "john@assassin.com", amount: "₦95,000", status: "Completed", date: "May 14, 2022" },
];

const statusStyles = {
  Completed: { bg: "green.50", color: "green.600" },
  Processing: { bg: "blue.50", color: "blue.600" },
  Failed: { bg: "red.50", color: "red.600" },
};

const AdminDashboard = () => {
  const cardBg = useColorModeValue("white", "gray.800");
  const tableHoverBg = useColorModeValue("gray.50", "whiteAlpha.50");

  return (
    <LayoutAdmin>
      <Box bg={useColorModeValue("gray.50", "gray.900")} minH="100vh" py={10} px={{ base: 4, lg: 12 }}>
        {/* Header */}
        <Flex mb={10} align="center" justify="space-between" direction={{ base: "column", md: "row" }} gap={6}>
          <VStack align="start" spacing={1}>
            <HStack color="blue.500">
               <Icon as={HiViewGrid} />
               <Text fontWeight="black" letterSpacing="widest" fontSize="xs">SYSTEM OVERVIEW</Text>
            </HStack>
            <Heading size="xl" fontWeight="black" letterSpacing="tight">Command Center</Heading>
            <Text color="gray.500" fontSize="md">Performance metrics for May 2022</Text>
          </VStack>
          
          <HStack spacing={4}>
             <Button leftIcon={<HiDotsHorizontal />} variant="ghost" rounded="full">More Actions</Button>
             <Button colorScheme="blue" rounded="full" px={8} shadow="xl">Download Report</Button>
          </HStack>
        </Flex>

        {/* KPI Cards */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} mb={12}>
          {kpiData.map((kpi, i) => (
            <MotionBox
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              bg={cardBg}
              p={6}
              rounded="3xl"
              shadow="xl"
              borderWidth="1px"
              borderColor={useColorModeValue("gray.100", "gray.700")}
              position="relative"
              overflow="hidden"
            >
              <Flex justify="space-between" align="start">
                <VStack align="start" spacing={1}>
                  <Text fontSize="xs" color="gray.400" fontWeight="black" textTransform="uppercase" letterSpacing="widest">{kpi.label}</Text>
                  <Heading size="lg" fontWeight="black">{kpi.value}</Heading>
                  <HStack spacing={1}>
                    <Icon as={kpi.up ? HiArrowUp : HiArrowDown} color={kpi.up ? "green.500" : "red.500"} />
                    <Text fontSize="xs" color={kpi.up ? "green.500" : "red.500"} fontWeight="black">{kpi.change}</Text>
                  </HStack>
                </VStack>
                <Circle size={12} bg={`${kpi.color}.50`} color={`${kpi.color}.500`}>
                  <Icon as={kpi.icon} w={6} h={6} />
                </Circle>
              </Flex>
            </MotionBox>
          ))}
        </SimpleGrid>

        {/* Main Grid */}
        <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={10} mb={12}>
           {/* Chart Container */}
           <Box 
              gridColumn={{ lg: "span 2" }} 
              bg={cardBg} 
              p={8} 
              rounded="4xl" 
              shadow="2xl" 
              borderWidth="1px" 
              borderColor={useColorModeValue("gray.100", "gray.700")}
           >
              <Flex justify="space-between" align="center" mb={8}>
                 <VStack align="start" spacing={0}>
                    <Heading size="md" fontWeight="black">Revenue Analytics</Heading>
                    <Text fontSize="sm" color="gray.500">Gross vs Net Performance</Text>
                 </VStack>
                 <HStack spacing={6}>
                    <HStack spacing={2}>
                       <Circle size={2} bg="blue.500" />
                       <Text fontSize="xs" fontWeight="bold">Gross</Text>
                    </HStack>
                    <HStack spacing={2}>
                       <Circle size={2} bg="purple.500" />
                       <Text fontSize="xs" fontWeight="bold">Net</Text>
                    </HStack>
                 </HStack>
              </Flex>
              <Box h="350px">
                 <Line data={chartData} options={chartOptions} />
              </Box>
           </Box>

           {/* Side Stats */}
           <VStack spacing={8} align="stretch">
              <Box bg="blue.900" p={8} rounded="4xl" color="white" position="relative" overflow="hidden" shadow="xl">
                 <Box position="absolute" top="-10%" right="-10%" w="50%" h="100%" bg="whiteAlpha.100" rounded="full" blur="30px" />
                 <VStack align="start" spacing={6} position="relative" zIndex={1}>
                    <Heading size="md" fontWeight="black">System Health</Heading>
                    <SimpleGrid columns={2} spacing={4} w="full">
                       <VStack align="start">
                          <Text fontSize="2xs" opacity={0.6} fontWeight="black">UPTIME</Text>
                          <Text fontSize="xl" fontWeight="black">99.99%</Text>
                       </VStack>
                       <VStack align="start">
                          <Text fontSize="2xs" opacity={0.6} fontWeight="black">LATENCY</Text>
                          <Text fontSize="xl" fontWeight="black">24ms</Text>
                       </VStack>
                    </SimpleGrid>
                    <Divider borderColor="whiteAlpha.200" />
                    <Button w="full" bg="whiteAlpha.200" _hover={{ bg: "whiteAlpha.300" }} rounded="full" size="sm">Run Diagnostic</Button>
                 </VStack>
              </Box>

              <Box bg={cardBg} p={8} rounded="4xl" shadow="xl" borderWidth="1px" borderColor={useColorModeValue("gray.100", "gray.700")}>
                 <Heading size="sm" fontWeight="black" mb={6}>Real-time Activity</Heading>
                 <VStack align="stretch" spacing={5}>
                    {[
                      { user: "Sarah C.", action: "enrolled in Advanced React", time: "2m ago" },
                      { user: "Tunde E.", action: "purchased Fullstack Pack", time: "15m ago" },
                      { user: "Grace A.", action: "completed Certification", time: "1h ago" },
                    ].map((item, idx) => (
                      <HStack key={idx} spacing={4}>
                         <Avatar size="sm" name={item.user} />
                         <VStack align="start" spacing={0} flex={1}>
                            <Text fontSize="xs" fontWeight="bold">{item.user} <Text as="span" fontWeight="normal" color="gray.500">{item.action}</Text></Text>
                            <Text fontSize="10px" color="blue.500" fontWeight="black">{item.time}</Text>
                         </VStack>
                      </HStack>
                    ))}
                 </VStack>
              </Box>
           </VStack>
        </SimpleGrid>

        {/* Transactions Table */}
        <Box bg={cardBg} p={8} rounded="4xl" shadow="2xl" borderWidth="1px" borderColor={useColorModeValue("gray.100", "gray.700")}>
           <Flex justify="space-between" align="center" mb={10}>
              <VStack align="start" spacing={0}>
                 <Heading size="md" fontWeight="black">Recent Transactions</Heading>
                 <Text fontSize="sm" color="gray.500">Live feed of global payments</Text>
              </VStack>
              <Button size="sm" variant="ghost" colorScheme="blue">View All Logs</Button>
           </Flex>
           
           <TableContainer>
              <Table variant="simple">
                 <Thead>
                    <Tr>
                       <Th fontSize="10px" color="gray.400">ORDER ID</Th>
                       <Th fontSize="10px" color="gray.400">CUSTOMER</Th>
                       <Th fontSize="10px" color="gray.400">AMOUNT</Th>
                       <Th fontSize="10px" color="gray.400">STATUS</Th>
                       <Th fontSize="10px" color="gray.400" isNumeric>DATE</Th>
                    </Tr>
                 </Thead>
                 <Tbody>
                    {recentOrders.map((order) => (
                       <Tr key={order.id} _hover={{ bg: tableHoverBg }} transition="all 0.2s" cursor="pointer">
                          <Td fontWeight="black" fontSize="sm" color="blue.500">{order.id}</Td>
                          <Td>
                             <HStack spacing={3}>
                                <Avatar size="xs" name={order.customer} />
                                <VStack align="start" spacing={0}>
                                   <Text fontSize="sm" fontWeight="bold">{order.customer}</Text>
                                   <Text fontSize="xs" color="gray.500">{order.email}</Text>
                                </VStack>
                             </HStack>
                          </Td>
                          <Td fontWeight="black">{order.amount}</Td>
                          <Td>
                             <Badge 
                                bg={statusStyles[order.status].bg} 
                                color={statusStyles[order.status].color} 
                                rounded="full" 
                                px={4} 
                                py={1} 
                                fontSize="10px"
                                fontWeight="black"
                             >
                                {order.status}
                             </Badge>
                          </Td>
                          <Td isNumeric fontSize="sm" color="gray.500" fontWeight="medium">{order.date}</Td>
                       </Tr>
                    ))}
                 </Tbody>
              </Table>
           </TableContainer>
        </Box>
      </Box>
    </LayoutAdmin>
  );
};

export default AdminDashboard;


