import React from "react";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Container,
  Stack,
  useColorModeValue,
  Divider,
  VStack,
  HStack,
  Icon,
} from "@chakra-ui/react";
import {
  Button,
  Counter,
  IconButton,
  Text,
  Link,
  Image,
} from "components/shared/lib";
import {
  Layout,
  Section,
  Loader,
  Empty,
} from "components/components/pages";
import useCart from "hooks/useCart";
import { HiArrowLeft, HiArrowRight, HiTrash, HiShoppingCart } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import buildSEO from "utils/buildSEO";
import formatPrice from "utils/formatPrice";

const pageSEO = buildSEO("Your Cart", "Review and manage your shopping cart items");

const MotionBox = motion(Box);

const CartItem = ({
  item,
  index,
  handleQtyIncrease,
  handleQtyDecrease,
  handleItemDelete,
}) => {
  const borderColor = useColorModeValue("gray.100", "gray.600");
  const itemBg = useColorModeValue("white", "gray.800");

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      bg={itemBg}
      p={{ base: 4, md: 6 }}
      rounded="2xl"
      shadow="sm"
      borderWidth="1px"
      borderColor={borderColor}
      mb={4}
      _hover={{ shadow: "md", borderColor: "blue.200" }}
    >
      <Grid
        templateColumns={{ base: "1fr", md: "4fr 2fr 2fr 0.5fr" }}
        gap={6}
        alignItems="center"
      >
        <GridItem>
          <Flex align="center">
            <Box rounded="xl" overflow="hidden" shadow="sm" bg="white" p={2} border="1px solid" borderColor="gray.100">
              <Image
                w="100px"
                h="100px"
                src={item.imageUrl}
                isProduct
                objectFit="contain"
              />
            </Box>
            <VStack align="start" ml={5} spacing={1}>
              <Text fontWeight="bold" fontSize="lg" lineHeight="tight">
                {item.title}
              </Text>
              <Text fontSize="sm" color="gray.500" noOfLines={2}>
                {item.description}
              </Text>
              <Badge colorScheme="blue" variant="subtle" rounded="full" px={2}>
                In Stock
              </Badge>
            </VStack>
          </Flex>
        </GridItem>

        <GridItem>
          <VStack align={{ base: "start", md: "center" }} spacing={1}>
            <Text display={{ base: "block", md: "none" }} fontSize="xs" color="gray.500" fontWeight="bold">QUANTITY</Text>
            <Counter
              qty={item.qty}
              onQtyIncrease={() => handleQtyIncrease(item)}
              onQtyDecrease={() => handleQtyDecrease(item)}
            />
          </VStack>
        </GridItem>

        <GridItem>
          <VStack align={{ base: "start", md: "end" }} spacing={0}>
            <Text display={{ base: "block", md: "none" }} fontSize="xs" color="gray.500" fontWeight="bold">PRICE</Text>
            <Text fontWeight="black" fontSize="xl" color="blue.600">
              {formatPrice("en-NG", item.qtyPrice, "NGN")}
            </Text>
            <Text fontSize="xs" color="gray.400">
              {formatPrice("en-NG", item.price, "NGN")} / unit
            </Text>
          </VStack>
        </GridItem>

        <GridItem textAlign="right">
          <IconButton
            onClick={() => handleItemDelete(item.id)}
            variant="ghost"
            colorScheme="red"
            icon={<HiTrash size={20} />}
            rounded="full"
            aria-label="Remove item"
          />
        </GridItem>
      </Grid>
    </MotionBox>
  );
};

const Badge = ({ children, ...props }) => (
  <Box
    as="span"
    px={2}
    py={0.5}
    fontSize="xs"
    fontWeight="bold"
    {...props}
  >
    {children}
  </Box>
);

const Cart = () => {
  const cart = useCart();
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const summaryBg = useColorModeValue("white", "gray.800");

  const handleQtyIncrease = (item) => cart.increaseQty(item);
  const handleQtyDecrease = (item) => cart.decreaseQty(item);
  const handleItemDelete = (id) => cart.removeItem(id);

  return (
    <Layout SEO={pageSEO} bg={bgColor}>
      <Container maxW="container.xl" py={16}>
        <VStack spacing={12} align="stretch">
          <Flex justify="space-between" align="end" borderBottom="2px solid" borderColor="blue.500" pb={4}>
            <VStack align="start" spacing={1}>
              <Heading size="2xl">Shopping Bag</Heading>
              <HStack color="gray.500">
                <Icon as={HiShoppingCart} />
                <Text fontWeight="medium">
                  {cart?.count || 0} {cart?.count === 1 ? "item" : "items"} ready for checkout
                </Text>
              </HStack>
            </VStack>
            <Link href="/store" passHref>
              <Button
                as="a"
                leftIcon={<HiArrowLeft />}
                variant="ghost"
                colorScheme="blue"
                rounded="full"
                display={{ base: "none", md: "flex" }}
              >
                Back to Store
              </Button>
            </Link>
          </Flex>

          {cart?.isEmpty ? (
            <Empty />
          ) : (
            <Grid templateColumns={{ base: "1fr", lg: "1fr 350px" }} gap={10}>
              <GridItem>
                {cart?.loading ? (
                  <Loader />
                ) : (
                  <AnimatePresence>
                    {cart?.data?.map((item, index) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        index={index}
                        handleQtyIncrease={handleQtyIncrease}
                        handleQtyDecrease={handleQtyDecrease}
                        handleItemDelete={handleItemDelete}
                      />
                    ))}
                  </AnimatePresence>
                )}
              </GridItem>

              <GridItem>
                <VStack
                  spacing={6}
                  align="stretch"
                  position="sticky"
                  top="100px"
                  bg={summaryBg}
                  p={8}
                  rounded="3xl"
                  shadow="2xl"
                  borderWidth="1px"
                  borderColor={useColorModeValue("gray.100", "gray.700")}
                >
                  <Heading size="md">Order Summary</Heading>
                  
                  <VStack spacing={4} align="stretch">
                    <Flex justify="space-between">
                      <Text color="gray.500">Subtotal</Text>
                      <Text fontWeight="bold">{formatPrice("en-NG", cart.total, "NGN")}</Text>
                    </Flex>
                    <Flex justify="space-between">
                      <Text color="gray.500">Shipping</Text>
                      <Text color="green.500" fontWeight="bold">FREE</Text>
                    </Flex>
                    <Divider />
                    <Flex justify="space-between" align="center">
                      <Text fontSize="lg" fontWeight="bold">Total</Text>
                      <VStack align="end" spacing={0}>
                        <Text fontSize="2xl" fontWeight="black" color="blue.500">
                          {formatPrice("en-NG", cart.total, "NGN")}
                        </Text>
                        <Text fontSize="xs" color="gray.400">Including all taxes</Text>
                      </VStack>
                    </Flex>
                  </VStack>

                  <Link href="/checkout" passHref>
                    <Button
                      as="a"
                      size="lg"
                      colorScheme="blue"
                      rightIcon={<HiArrowRight />}
                      rounded="full"
                      w="full"
                      h={16}
                      fontSize="xl"
                      shadow="xl"
                      _hover={{ transform: "translateY(-2px)", shadow: "2xl" }}
                      _active={{ transform: "translateY(0)" }}
                      transition="all 0.2s"
                    >
                      Checkout Now
                    </Button>
                  </Link>

                  <VStack spacing={2} pt={4}>
                    <HStack fontSize="xs" color="gray.500">
                      <Icon as={HiArrowLeft} />
                      <Text>Easy 14-day returns</Text>
                    </HStack>
                    <HStack fontSize="xs" color="gray.500">
                      <Icon as={HiArrowRight} />
                      <Text>Secure SSL encryption</Text>
                    </HStack>
                  </VStack>
                </VStack>
              </GridItem>
            </Grid>
          )}
        </VStack>
      </Container>
    </Layout>
  );
};

export default Cart;


