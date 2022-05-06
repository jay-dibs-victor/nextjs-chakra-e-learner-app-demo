import React from "react";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Center,
  Container,
  Stack,
  useColorModeValue,
  Divider,
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
  PageHeader,
  Section,
  Loader,
  Empty,
} from "components/components/pages";
import useCart from "hooks/useCart";
import { HiArrowLeft, HiArrowRight, HiTrash } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import buildSEO from "utils/buildSEO";
import formatPrice from "utils/formatPrice";

const pageSEO = buildSEO("Cart", "Your items in cart");

const MotionBox = motion(Box);

const Table = ({
  rows,
  handleQtyIncrease,
  handleQtyDecrease,
  handleItemDelete,
}) => {
  const bgColor = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Box bg={bgColor} p={{ base: 4, md: 8 }} rounded="2xl" shadow="sm" borderWidth="1px" borderColor={borderColor}>
      {/* Head */}
      <Grid
        templateColumns="3fr 1fr 1fr .5fr"
        display={{ base: "none", md: "grid" }}
        pb={4}
        borderBottom="2px solid"
        borderColor={borderColor}
        mb={4}
      >
        <GridItem>
          <Text fontWeight="bold" color="gray.500" fontSize="sm" textTransform="uppercase">Product</Text>
        </GridItem>
        <GridItem>
          <Text fontWeight="bold" color="gray.500" fontSize="sm" textTransform="uppercase">Quantity</Text>
        </GridItem>
        <GridItem>
          <Text fontWeight="bold" color="gray.500" fontSize="sm" textTransform="uppercase">Price</Text>
        </GridItem>
        <GridItem textAlign="right">
           <Text fontWeight="bold" color="gray.500" fontSize="sm" textTransform="uppercase">Action</Text>
        </GridItem>
      </Grid>

      {/* Body */}
      <AnimatePresence>
        {rows.map((item, index) => (
          <MotionBox
            key={item.id || index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <Grid
              templateColumns={{ base: "1fr", md: "3fr 1fr 1fr .5fr" }}
              py={6}
              borderTop={index !== 0 ? "1px solid" : "none"}
              borderColor={borderColor}
              alignItems="center"
            >
              <GridItem>
                <Flex align="center">
                  <Box rounded="xl" overflow="hidden" shadow="sm" bg="white" p={2}>
                    <Image
                      w="80px"
                      h="80px"
                      src={item.imageUrl}
                      isProduct
                      objectFit="contain"
                    />
                  </Box>

                  <Box ml={5}>
                    <Text mb={1} fontWeight="bold" fontSize="lg">
                      {item.title}
                    </Text>
                    <Text m={0} fontSize="sm" color="gray.500">{item.description}</Text>
                  </Box>
                </Flex>
              </GridItem>

              <GridItem display={{ base: "none", md: "block" }}>
                <Counter
                  qty={item.qty}
                  onQtyIncrease={handleQtyIncrease.bind(null, item)}
                  onQtyDecrease={handleQtyDecrease.bind(null, item)}
                />
              </GridItem>

              <GridItem display={{ base: "none", md: "block" }}>
                <Text m={0} fontWeight="bold" fontSize="lg">
                  {formatPrice("en-NG", item.qtyPrice, "NGN")}
                </Text>
              </GridItem>

              <GridItem display={{ base: "none", md: "block" }} textAlign="right">
                <IconButton
                  onClick={handleItemDelete.bind(null, item.id)}
                  variant="ghost"
                  colorScheme="red"
                  icon={<HiTrash />}
                  rounded="full"
                />
              </GridItem>

              {/* Mobile Only */}
              <GridItem display={{ base: "block", md: "none" }} mt={4}>
                <Flex justifyContent="space-between" alignItems="center">
                  <Counter
                    qty={item.qty}
                    onQtyIncrease={handleQtyIncrease.bind(null, item)}
                    onQtyDecrease={handleQtyDecrease.bind(null, item)}
                  />
                  <Text fontWeight="bold" fontSize="lg">
                    {formatPrice("en-NG", item.qtyPrice, "NGN")}
                  </Text>
                  <IconButton
                    onClick={handleItemDelete.bind(null, item.id)}
                    variant="ghost"
                    colorScheme="red"
                    icon={<HiTrash />}
                    rounded="full"
                  />
                </Flex>
              </GridItem>
            </Grid>
          </MotionBox>
        ))}
      </AnimatePresence>
    </Box>
  );
};

const Cart = () => {
  const cart = useCart();
  const bgColor = useColorModeValue("gray.50", "gray.900");

  const handleQtyIncrease = (item) => cart.increaseQty(item);
  const handleQtyDecrease = (item) => cart.decreaseQty(item);
  const handleItemDelete = (id) => cart.removeItem(id);

  return (
    <Layout SEO={pageSEO} bg={bgColor}>
      <Container maxW="container.xl" py={12}>
        <VStack spacing={8} align="stretch">
          <Box textAlign="center" mb={4}>
            <Heading size="2xl" mb={2}>Your Shopping Cart</Heading>
            <Text color="gray.500">
              {cart?.count || 0} items currently in your bag
            </Text>
          </Box>

          {cart?.isEmpty ? (
            <Empty />
          ) : (
            <>
              <Section>
                {cart?.loading ? (
                  <Loader />
                ) : (
                  cart?.data && (
                    <Table
                      rows={cart?.data}
                      handleQtyIncrease={handleQtyIncrease}
                      handleQtyDecrease={handleQtyDecrease}
                      handleItemDelete={handleItemDelete}
                    />
                  )
                )}
              </Section>

              {/* Summary Section */}
              {!cart?.loading && cart?.data && (
                <Box bg={useColorModeValue("white", "gray.700")} p={8} rounded="2xl" shadow="lg">
                  <Flex
                    direction={{ base: "column", md: "row" }}
                    justify="space-between"
                    align="center"
                    gap={8}
                  >
                    <Box>
                      <Link href="/store" passHref>
                        <Button
                          as="a"
                          leftIcon={<HiArrowLeft />}
                          variant="ghost"
                          colorScheme="blue"
                          rounded="full"
                        >
                          Continue Shopping
                        </Button>
                      </Link>
                    </Box>

                    <HStack spacing={12} align="center">
                      <VStack align="end" spacing={0}>
                        <Text color="gray.500" fontSize="sm">Estimated Total</Text>
                        <Heading size="xl" color="blue.500">
                          {formatPrice("en-NG", cart.total, "NGN")}
                        </Heading>
                      </VStack>

                      <Link href="/checkout" passHref>
                        <Button
                          as="a"
                          size="lg"
                          colorScheme="blue"
                          rightIcon={<HiArrowRight />}
                          rounded="full"
                          px={10}
                          h={16}
                          fontSize="lg"
                          shadow="xl"
                          _hover={{ transform: "scale(1.05)", shadow: "2xl" }}
                          transition="all 0.2s"
                        >
                          Checkout Now
                        </Button>
                      </Link>
                    </HStack>
                  </Flex>
                </Box>
              )}
            </>
          )}
        </VStack>
      </Container>
    </Layout>
  );
};

const VStack = ({ children, ...props }) => <Stack direction="column" {...props}>{children}</Stack>;
const HStack = ({ children, ...props }) => <Stack direction="row" {...props}>{children}</Stack>;

export default Cart;

