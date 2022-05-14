import React from "react";
import {
  Box,
  Flex,
  SimpleGrid,
  Heading,
  Text,
  Icon,
  Badge,
  Container,
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
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  HiShoppingBag,
  HiUsers,
  HiCurrencyDollar,
  HiTrendingUp,
  HiArrowUp,
  HiArrowDown,
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
      label: "Revenue",
      data: [4200, 7800, 5600, 9100, 7200, 11500],
      fill: true,
      borderColor: "#4299e1",
      backgroundColor: "rgba(66,153,225,0.12)",
      tension: 0.4,
      pointBackgroundColor: "#4299e1",
    },
    {
      label: "Orders",
      data: [310, 590, 420, 710, 540, 880],
      fill: true,
      borderColor: "#48bb78",
      backgroundColor: "rgba(72,187,120,0.08)",
      tension: 0.4,
      pointBackgroundColor: "#48bb78",
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: { legend: { position: "top" } },
  scales: {
    y: { beginAtZero: true, grid: { color: "rgba(0,0,0,0.04)" } },
    x: { grid: { display: false } },
  },
};

const kpiData = [
  { label: "Total Revenue", value: "$128,450", icon: HiCurrencyDollar, color: "blue", change: "+12.5%", up: true },
  { label: "Total Orders", value: "4,820", icon: HiShoppingBag, color: "green", change: "+8.3%", up: true },
  { label: "Total Customers", value: "1,290", icon: HiUsers, color: "purple", change: "+3.1%", up: true },
  { label: "Avg. Order Value", value: "$26.64", icon: HiTrendingUp, color: "orange", change: "-1.4%", up: false },
];

const recentOrders = [
  { id: "#TRX-0021", customer: "John Doe", amount: "$120.00", status: "Delivered", date: "May 8, 2022" },
  { id: "#TRX-0022", customer: "Jane Smith", amount: "$250.00", status: "Pending", date: "May 8, 2022" },
  { id: "#TRX-0023", customer: "Alex Turner", amount: "$75.00", status: "Delivered", date: "May 9, 2022" },
  { id: "#TRX-0024", customer: "Maria García", amount: "$340.00", status: "Not Delivered", date: "May 9, 2022" },
  { id: "#TRX-0025", customer: "Chris Nolan", amount: "$95.00", status: "Delivered", date: "May 9, 2022" },
];

const statusColor = (s) =>
  s === "Delivered" ? "green" : s === "Pending" ? "yellow" : "red";

const AdminDashboard = () => {
  const cardBg = useColorModeValue("white", "gray.700");
  const bg = useColorModeValue("gray.50", "gray.900");
  const itemHoverBg = useColorModeValue("gray.50", "gray.600");
  const cardBorderColor = useColorModeValue("gray.100", "gray.600");

  return (
    <LayoutAdmin>
      <Box bg={bg} minH="100vh" py={8} px={{ base: 4, md: 8 }}>
        {/* Header */}
        <Flex mb={8} align="center" justify="space-between">
          <Box>
            <Heading size="lg">Admin Dashboard</Heading>
            <Text color="gray.500" mt={1}>Welcome back, Admin — here's what's happening today.</Text>
          </Box>
          <Badge colorScheme="blue" px={4} py={2} rounded="full" fontSize="sm">
            Live View
          </Badge>
        </Flex>

        {/* KPI Cards */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={10}>
          {kpiData.map((kpi, i) => (
            <MotionBox
              key={kpi.label}
              whileHover={{ y: -4 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              p={6}
              bg={cardBg}
              rounded="2xl"
              shadow="sm"
              borderWidth="1px"
              borderColor={cardBorderColor}
            >
              <Flex justify="space-between" align="flex-start">
                <Box>
                  <Text fontSize="sm" color="gray.500" fontWeight="medium">{kpi.label}</Text>
                  <Heading size="xl" mt={1}>{kpi.value}</Heading>
                  <HStack mt={2} spacing={1}>
                    <Icon as={kpi.up ? HiArrowUp : HiArrowDown} color={kpi.up ? "green.400" : "red.400"} w={3} h={3} />
                    <Text fontSize="xs" color={kpi.up ? "green.500" : "red.500"} fontWeight="bold">{kpi.change} this month</Text>
                  </HStack>
                </Box>
                <Circle size="12" bg={`${kpi.color}.50`} color={`${kpi.color}.500`}>
                  <Icon as={kpi.icon} w={6} h={6} />
                </Circle>
              </Flex>
            </MotionBox>
          ))}
        </SimpleGrid>

        {/* Chart + Summary */}
        <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={8} mb={10}>
          <Box
            gridColumn={{ lg: "span 2" }}
            bg={cardBg}
            p={6}
            rounded="2xl"
            shadow="sm"
            borderWidth="1px"
          >
            <Heading size="sm" mb={4}>Revenue & Orders — 2022</Heading>
            <Line data={chartData} options={chartOptions} />
          </Box>

          <Box bg={cardBg} p={6} rounded="2xl" shadow="sm" borderWidth="1px">
            <Heading size="sm" mb={6}>Quick Stats</Heading>
            <VStack align="stretch" spacing={5}>
              {[
                { label: "Products Published", value: "342" },
                { label: "Pending Deliveries", value: "17" },
                { label: "New Customers (Today)", value: "8" },
                { label: "Support Tickets", value: "4" },
                { label: "Refund Requests", value: "2" },
              ].map((stat) => (
                <Flex key={stat.label} justify="space-between" align="center">
                  <Text fontSize="sm" color="gray.500">{stat.label}</Text>
                  <Text fontWeight="bold">{stat.value}</Text>
                </Flex>
              ))}
            </VStack>
          </Box>
        </SimpleGrid>

        {/* Recent Orders Table */}
        <Box bg={cardBg} p={6} rounded="2xl" shadow="sm" borderWidth="1px">
          <Flex justify="space-between" align="center" mb={6}>
            <Heading size="sm">Recent Orders</Heading>
            <Text fontSize="sm" color="blue.500" cursor="pointer" fontWeight="bold">View All →</Text>
          </Flex>
          <TableContainer>
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>Order ID</Th>
                  <Th>Customer</Th>
                  <Th>Date</Th>
                  <Th>Amount</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {recentOrders.map((order) => (
                  <Tr key={order.id} _hover={{ bg: itemHoverBg }} transition="background 0.15s">
                    <Td fontWeight="bold" color="blue.500">{order.id}</Td>
                    <Td>{order.customer}</Td>
                    <Td color="gray.500">{order.date}</Td>
                    <Td fontWeight="bold">{order.amount}</Td>
                    <Td>
                      <Badge colorScheme={statusColor(order.status)} rounded="full" px={3} py={1}>
                        {order.status}
                      </Badge>
                    </Td>
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

