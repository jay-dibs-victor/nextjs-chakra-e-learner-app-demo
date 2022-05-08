import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  SimpleGrid,
  Button,
  useColorModeValue,
  Icon,
  HStack,
  VStack,
  Divider,
  Circle,
  ScaleFade,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiCheck,
  HiShoppingCart,
  HiTruck,
  HiCreditCard,
  HiChevronRight,
  HiChevronLeft,
} from "react-icons/hi";
import { Layout, Section, Loader, Empty } from "components/components/pages";
import { Image, TextField } from "components/shared/lib";
import useCart from "hooks/useCart";
import useToast from "hooks/useToast";
import http from "utils/http";
import formatPrice from "utils/formatPrice";
import buildSEO from "utils/buildSEO";

const pageSEO = buildSEO("Checkout", "Complete your purchase securely");

const steps = [
  { label: "Review Cart", icon: HiShoppingCart },
  { label: "Shipping", icon: HiTruck },
  { label: "Payment", icon: HiCreditCard },
];

const StepIndicator = ({ activeStep }) => {
  return (
    <HStack spacing={4} justify="center" mb={12}>
      {steps.map((step, idx) => (
        <React.Fragment key={idx}>
          <VStack spacing={2} align="center">
            <Circle
              size="12"
              bg={idx <= activeStep ? "blue.500" : "gray.200"}
              color={idx <= activeStep ? "white" : "gray.400"}
              shadow={idx === activeStep ? "lg" : "none"}
              transition="all 0.3s"
            >
              <Icon as={idx < activeStep ? HiCheck : step.icon} w={6} h={6} />
            </Circle>
            <Text
              fontSize="xs"
              fontWeight="bold"
              color={idx <= activeStep ? "gray.700" : "gray.400"}
              textTransform="uppercase"
              letterSpacing="tighter"
            >
              {step.label}
            </Text>
          </VStack>
          {idx < steps.length - 1 && (
            <Box h="2px" w="12" bg={idx < activeStep ? "blue.500" : "gray.200"} mt="-6" transition="all 0.3s" />
          )}
        </React.Fragment>
      ))}
    </HStack>
  );
};

const CartItem = ({ item }) => (
  <Flex align="center" justify="space-between" py={4}>
    <HStack spacing={4}>
      <Box p={2} bg="white" rounded="lg" shadow="sm">
        <Image w="60px" h="60px" src={item.imageUrl} isProduct objectFit="contain" />
      </Box>
      <VStack align="start" spacing={0}>
        <Text fontWeight="bold">{item.title}</Text>
        <Text fontSize="sm" color="gray.500">{item.qty} Piece{item.qty > 1 ? "s" : ""}</Text>
      </VStack>
    </HStack>
    <Text fontWeight="bold">{formatPrice("en-NG", item.qtyPrice, "NGN")}</Text>
  </Flex>
);

const CheckoutPage = () => {
  const cart = useCart();
  const router = useRouter();
  const toast = useToast();
  const [activeStep, setActiveStep] = useState(0);
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");

  const [formData, setFormData] = useState({
    name: "Test User",
    email: "user@example.com",
    phone: "+234 800 000 000",
    address: "123 Business St, Lagos",
    state: "Lagos",
  });

  const nextStep = () => setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setActiveStep((prev) => Math.max(prev - 1, 0));

  const handlePlaceOrder = async () => {
    try {
      // Simulate order placement
      toast.displayToast({
        title: "Order Received",
        description: "Your order has been placed successfully!",
        status: "success",
      });
      cart.resetCart();
      router.push("/store");
    } catch (err) {
      toast.displayToast({ title: "Error", description: err.message, status: "error" });
    }
  };

  if (cart?.isEmpty) return <Layout SEO={pageSEO}><Container py={20}><Empty /></Container></Layout>;

  return (
    <Layout SEO={pageSEO} bg={bgColor}>
      <Container maxW="container.xl" py={12}>
        <StepIndicator activeStep={activeStep} />

        <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={10}>
          {/* Main Wizard */}
          <GridItem colSpan={{ base: 1, lg: 2 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Box bg={cardBg} p={8} rounded="2xl" shadow="sm" borderWidth="1px">
                  {activeStep === 0 && (
                    <VStack align="stretch" spacing={6}>
                      <Heading size="md">Review Your Items</Heading>
                      <Divider />
                      <Stack spacing={4}>
                        {cart.data?.map((item) => <CartItem key={item.id} item={item} />)}
                      </Stack>
                    </VStack>
                  )}

                  {activeStep === 1 && (
                    <VStack align="stretch" spacing={6}>
                      <Heading size="md">Shipping Information</Heading>
                      <Divider />
                      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                        <TextField label="Full Name" value={formData.name} />
                        <TextField label="Email" value={formData.email} />
                        <TextField label="Phone" value={formData.phone} />
                        <TextField label="Address" value={formData.address} />
                        <TextField label="State" value={formData.state} />
                      </SimpleGrid>
                    </VStack>
                  )}

                  {activeStep === 2 && (
                    <VStack align="stretch" spacing={6}>
                      <Heading size="md">Payment Method</Heading>
                      <Divider />
                      <SimpleGrid columns={1} spacing={4}>
                         <Box p={6} border="2px solid" borderColor="blue.500" bg="blue.50" rounded="xl" cursor="pointer">
                            <HStack spacing={4}>
                               <Icon as={HiCreditCard} w={8} h={8} color="blue.500" />
                               <VStack align="start" spacing={0}>
                                  <Text fontWeight="bold">Credit / Debit Card</Text>
                                  <Text fontSize="sm" color="gray.500">Pay securely with your card via Paystack</Text>
                               </VStack>
                            </HStack>
                         </Box>
                      </SimpleGrid>
                    </VStack>
                  )}

                  <Flex justify="space-between" mt={12}>
                    <Button
                      leftIcon={<HiChevronLeft />}
                      onClick={prevStep}
                      disabled={activeStep === 0}
                      variant="ghost"
                    >
                      Back
                    </Button>
                    {activeStep < steps.length - 1 ? (
                      <Button
                        rightIcon={<HiChevronRight />}
                        onClick={nextStep}
                        colorScheme="blue"
                        px={10}
                      >
                        Next Step
                      </Button>
                    ) : (
                      <Button
                        colorScheme="green"
                        px={10}
                        onClick={handlePlaceOrder}
                        size="lg"
                        shadow="xl"
                        _hover={{ transform: "scale(1.05)" }}
                      >
                        Place Order
                      </Button>
                    )}
                  </Flex>
                </Box>
              </motion.div>
            </AnimatePresence>
          </GridItem>

          {/* Sidebar Summary */}
          <GridItem>
            <Box bg={cardBg} p={8} rounded="2xl" shadow="lg" position="sticky" top="100px">
              <Heading size="md" mb={6}>Order Summary</Heading>
              <VStack align="stretch" spacing={4}>
                <Flex justify="space-between">
                  <Text color="gray.500">Subtotal</Text>
                  <Text fontWeight="bold">{formatPrice("en-NG", cart.total, "NGN")}</Text>
                </Flex>
                <Flex justify="space-between">
                  <Text color="gray.500">Shipping</Text>
                  <Text fontWeight="bold" color="green.500">FREE</Text>
                </Flex>
                <Divider />
                <Flex justify="space-between" align="center">
                  <Text fontSize="lg" fontWeight="bold">Total</Text>
                  <Heading size="lg" color="blue.500">
                    {formatPrice("en-NG", cart.total, "NGN")}
                  </Heading>
                </Flex>
              </VStack>
            </Box>
          </GridItem>
        </SimpleGrid>
      </Container>
    </Layout>
  );
};

const GridItem = ({ children, ...props }) => <Box {...props}>{children}</Box>;

export default CheckoutPage;

