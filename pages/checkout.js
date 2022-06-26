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
  Badge,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiCheck,
  HiShoppingCart,
  HiTruck,
  HiCreditCard,
  HiChevronRight,
  HiChevronLeft,
  HiLockClosed,
  HiShieldCheck,
} from "react-icons/hi";
import { Layout, Section, Loader, Empty } from "components/components/pages";
import { Image, TextField } from "components/shared/lib";
import useCart from "hooks/useCart";
import useToast from "hooks/useToast";
import http from "utils/http";
import formatPrice from "utils/formatPrice";
import buildSEO from "utils/buildSEO";

const pageSEO = buildSEO("Secure Checkout", "Complete your premium purchase securely and efficiently");

const steps = [
  { label: "Review Cart", icon: HiShoppingCart },
  { label: "Shipping", icon: HiTruck },
  { label: "Payment", icon: HiCreditCard },
];

const StepIndicator = ({ activeStep }) => {
  return (
    <HStack spacing={0} justify="center" mb={16} position="relative" w="full" maxW="3xl" mx="auto">
      {steps.map((step, idx) => (
        <React.Fragment key={idx}>
          <VStack spacing={3} align="center" position="relative" zIndex={1} flex={1}>
            <Circle
              size="14"
              bg={idx < activeStep ? "green.500" : idx === activeStep ? "blue.600" : "gray.100"}
              color={idx <= activeStep ? "white" : "gray.400"}
              shadow={idx === activeStep ? "xl" : "none"}
              transition="all 0.4s cubic-bezier(.175,.885,.32,1.275)"
              border="4px solid"
              borderColor={idx === activeStep ? "blue.50" : "transparent"}
            >
              <Icon as={idx < activeStep ? HiCheck : step.icon} w={6} h={6} />
            </Circle>
            <Text
              fontSize="xs"
              fontWeight="black"
              color={idx <= activeStep ? "blue.900" : "gray.400"}
              textTransform="uppercase"
              letterSpacing="2px"
            >
              {step.label}
            </Text>
          </VStack>
          {idx < steps.length - 1 && (
             <Box 
               h="2px" 
               flex={1} 
               bg={idx < activeStep ? "green.500" : "gray.200"} 
               mt="-8" 
               mx="-4"
               transition="all 0.4s" 
             />
          )}
        </React.Fragment>
      ))}
    </HStack>
  );
};

const CartItem = ({ item }) => (
  <Flex align="center" justify="space-between" py={5} borderBottom="1px solid" borderColor="gray.50" _last={{ borderBottom: "none" }}>
    <HStack spacing={5}>
      <Box p={3} bg="gray.50" rounded="2xl" shadow="sm">
        <Image w="70px" h="70px" src={item.imageUrl} isProduct objectFit="contain" alt={item.title} />
      </Box>
      <VStack align="start" spacing={0}>
        <Text fontWeight="black" fontSize="lg" letterSpacing="tight">{item.title}</Text>
        <Badge colorScheme="blue" variant="subtle" rounded="full" px={2} fontSize="2xs">Qty: {item.qty}</Badge>
      </VStack>
    </HStack>
    <Text fontWeight="black" fontSize="lg">{formatPrice("en-NG", item.qtyPrice, "NGN")}</Text>
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
    name: "John Doe",
    email: "john@example.com",
    phone: "+234 812 345 6789",
    address: "15 Admiralty Way, Lekki Phase 1",
    state: "Lagos",
  });

  const nextStep = () => setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setActiveStep((prev) => Math.max(prev - 1, 0));

  const handlePlaceOrder = async () => {
    try {
      toast.displayToast({
        title: "Order Secured!",
        description: "Your premium order has been processed successfully.",
        status: "success",
      });
      cart.resetCart();
      router.push("/store");
    } catch (err) {
      toast.displayToast({ title: "Checkout Failed", description: err.message, status: "error" });
    }
  };

  if (cart?.isEmpty) return <Layout SEO={pageSEO}><Container py={32}><Empty title="Your cart is empty" description="Add some premium products to your cart before checking out." /></Container></Layout>;

  return (
    <Layout SEO={pageSEO} bg={bgColor}>
      <Section pt={12} pb={24}>
        <StepIndicator activeStep={activeStep} />

        <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={12}>
          {/* Main Wizard */}
          <Box gridColumn={{ base: "span 1", lg: "span 2" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Box bg={cardBg} p={{ base: 6, md: 12 }} rounded="3xl" shadow="2xl" borderWidth="1px" borderColor="gray.100">
                  {activeStep === 0 && (
                    <VStack align="stretch" spacing={8}>
                      <VStack align="start" spacing={1}>
                        <Heading size="lg" fontWeight="black">Review Your Order</Heading>
                        <Text color="gray.500">Confirm the items in your cart before proceeding</Text>
                      </VStack>
                      <Divider />
                      <Stack spacing={2}>
                        {cart.data?.map((item) => <CartItem key={item.id} item={item} />)}
                      </Stack>
                    </VStack>
                  )}

                  {activeStep === 1 && (
                    <VStack align="stretch" spacing={8}>
                      <VStack align="start" spacing={1}>
                        <Heading size="lg" fontWeight="black">Shipping Destination</Heading>
                        <Text color="gray.500">Where should we deliver your premium selection?</Text>
                      </VStack>
                      <Divider />
                      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
                        <TextField label="Full Legal Name" value={formData.name} variant="filled" rounded="xl" />
                        <TextField label="Contact Email" value={formData.email} variant="filled" rounded="xl" />
                        <TextField label="Phone Number" value={formData.phone} variant="filled" rounded="xl" />
                        <TextField label="Delivery Address" value={formData.address} variant="filled" rounded="xl" />
                        <TextField label="State / Region" value={formData.state} variant="filled" rounded="xl" />
                      </SimpleGrid>
                    </VStack>
                  )}

                  {activeStep === 2 && (
                    <VStack align="stretch" spacing={8}>
                      <VStack align="start" spacing={1}>
                        <Heading size="lg" fontWeight="black">Secure Payment</Heading>
                        <Text color="gray.500">Choose your preferred method of secure payment</Text>
                      </VStack>
                      <Divider />
                      <Stack spacing={4}>
                         <Box p={8} border="2px solid" borderColor="blue.500" bg="blue.50" rounded="2xl" cursor="pointer" shadow="lg" transition="all 0.2s" _hover={{ shadow: "xl" }}>
                            <HStack spacing={6}>
                               <Circle size={16} bg="white" shadow="md">
                                  <Icon as={HiCreditCard} w={10} h={10} color="blue.500" />
                               </Circle>
                               <VStack align="start" spacing={1}>
                                  <Text fontWeight="black" fontSize="xl">Pay via Paystack</Text>
                                  <Text fontSize="md" color="blue.600">Securely pay with Credit/Debit Cards or Bank Transfer</Text>
                               </VStack>
                               <Icon as={HiCheck} ml="auto" color="blue.500" w={8} h={8} />
                            </HStack>
                         </Box>
                      </Stack>
                    </VStack>
                  )}

                  <Flex justify="space-between" mt={16}>
                    <Button
                      size="lg"
                      leftIcon={<HiChevronLeft />}
                      onClick={prevStep}
                      disabled={activeStep === 0}
                      variant="ghost"
                      rounded="full"
                      px={8}
                    >
                      Back
                    </Button>
                    {activeStep < steps.length - 1 ? (
                      <Button
                        size="lg"
                        rightIcon={<HiChevronRight />}
                        onClick={nextStep}
                        colorScheme="blue"
                        px={12}
                        rounded="full"
                        shadow="xl"
                        _hover={{ transform: "translateY(-2px)", shadow: "2xl" }}
                      >
                        Continue to {steps[activeStep + 1].label}
                      </Button>
                    ) : (
                      <Button
                        colorScheme="blue"
                        px={16}
                        h={16}
                        onClick={handlePlaceOrder}
                        size="lg"
                        rounded="full"
                        shadow="2xl"
                        fontSize="xl"
                        fontWeight="black"
                        leftIcon={<HiLockClosed />}
                        _hover={{ transform: "scale(1.02)", shadow: "dark-lg" }}
                      >
                        Securely Place Order
                      </Button>
                    )}
                  </Flex>
                </Box>
              </motion.div>
            </AnimatePresence>
          </Box>

          {/* Sidebar Summary */}
          <Box>
            <VStack spacing={8} position="sticky" top="120px">
               <Box bg={cardBg} p={10} rounded="3xl" shadow="2xl" w="full" borderWidth="1px" borderColor="gray.100">
                  <Heading size="md" mb={8} fontWeight="black" letterSpacing="tight" textTransform="uppercase" fontSize="xs" color="gray.400">Order Summary</Heading>
                  <VStack align="stretch" spacing={6}>
                    <Flex justify="space-between">
                      <Text color="gray.500" fontWeight="medium">Items Subtotal</Text>
                      <Text fontWeight="black">{formatPrice("en-NG", cart.total, "NGN")}</Text>
                    </Flex>
                    <Flex justify="space-between">
                      <Text color="gray.500" fontWeight="medium">Shipping & Handling</Text>
                      <Text fontWeight="black" color="green.500">FREE</Text>
                    </Flex>
                    <Divider />
                    <Flex justify="space-between" align="center">
                      <VStack align="start" spacing={0}>
                         <Text fontSize="md" fontWeight="black">Total Amount</Text>
                         <Text fontSize="xs" color="gray.400">Including VAT</Text>
                      </VStack>
                      <Heading size="xl" color="blue.600" fontWeight="black" letterSpacing="tighter">
                        {formatPrice("en-NG", cart.total, "NGN")}
                      </Heading>
                    </Flex>
                  </VStack>
               </Box>
               
               <VStack bg="blue.50" p={6} rounded="2xl" w="full" align="start" spacing={4}>
                  <HStack color="blue.600">
                     <Icon as={HiShieldCheck} w={6} h={6} />
                     <Text fontWeight="bold" fontSize="sm">ImpactXplorer Guarantee</Text>
                  </HStack>
                  <Text fontSize="xs" color="blue.700">
                     Your transaction is protected by 256-bit SSL encryption. All payments are processed securely by our trusted partners.
                  </Text>
               </VStack>
            </VStack>
          </Box>
        </SimpleGrid>
      </Section>
    </Layout>
  );
};

export default CheckoutPage;


