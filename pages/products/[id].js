import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Stack,
  Text,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  useColorModeValue,
  Icon,
  Badge,
  HStack,
  Circle,
  Divider,
  Image,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  IconButton,
  Center,
} from "@chakra-ui/react";
import { 
  HiStar, 
  HiShoppingCart, 
  HiHeart, 
  HiTruck, 
  HiShieldCheck, 
  HiRefresh,
  HiChevronLeft,
  HiChevronRight
} from "react-icons/hi";
import { Layout } from "components/components/pages";
import buildSEO from "utils/buildSEO";

const pageSEO = buildSEO("Product Details", "Explore the features and specifications of our premium products.");

import { useRouter } from "next/router";
import { productAPI } from "utils/api";

const ProductDetailPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.100", "gray.700");
  const pageBg = useColorModeValue("gray.50", "gray.900");

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const res = await productAPI.getProduct(id);
          setProduct(res.data);
        } catch (err) {
          console.warn("Product fetch failed, using mock data.");
          setProduct({
            name: "Ergonomic Executive Chair Pro",
            description: "Experience unparalleled comfort with our flagship ergonomic chair.",
            price: 185000,
            category: "Furniture"
          });
        }
      };
      fetchProduct();
    }
  }, [id]);

  if (!product) return null;

  return (
    <Layout SEO={pageSEO}>
      <Box bg={pageBg} minH="100vh" py={20}>
        <Container maxW="full" px={{ base: 6, lg: 24 }}>
          
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={16} mb={20}>
            
            {/* Left: Image Gallery */}
            <VStack spacing={6}>
               <Box 
                 w="full" 
                 h="600px" 
                 bg={cardBg} 
                 rounded="4xl" 
                 overflow="hidden" 
                 shadow="2xl"
                 border="1px solid"
                 borderColor={borderColor}
                 position="relative"
               >
                  <Center h="full">
                     <Image 
                       src="https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                       alt="Product Image"
                       maxH="80%"
                     />
                  </Center>
                  <HStack position="absolute" bottom={8} left={0} right={0} justify="center" spacing={4}>
                     <Circle size={3} bg="blue.500" />
                     <Circle size={3} bg="gray.200" />
                     <Circle size={3} bg="gray.200" />
                  </HStack>
               </Box>
               <HStack spacing={4} w="full">
                  {[1, 2, 3, 4].map((i) => (
                    <Box 
                      key={i} 
                      flex={1} 
                      h="120px" 
                      bg={cardBg} 
                      rounded="2xl" 
                      border="2px solid" 
                      borderColor={i === 1 ? "blue.500" : "transparent"}
                      cursor="pointer"
                      overflow="hidden"
                    >
                       <Image src={`https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80`} />
                    </Box>
                  ))}
               </HStack>
            </VStack>

            {/* Right: Product Info */}
            <VStack align="start" spacing={8}>
               <VStack align="start" spacing={4}>
                  <Badge colorScheme="blue" variant="solid" px={4} py={1} rounded="full">{product.category || "New Arrival"}</Badge>
                  <Heading size="3xl" fontWeight="black">{product.name}</Heading>
                  <HStack spacing={2}>
                     <HStack color="orange.400" spacing={0}>
                        <Icon as={HiStar} /><Icon as={HiStar} /><Icon as={HiStar} /><Icon as={HiStar} /><Icon as={HiStar} />
                     </HStack>
                     <Text fontWeight="bold" color="gray.500">(128 Customer Reviews)</Text>
                  </HStack>
               </VStack>

               <VStack align="start" spacing={2}>
                  <Text fontSize="5xl" fontWeight="black" color="blue.600">₦{product.price?.toLocaleString()}</Text>
                  <Text color="gray.500" fontSize="lg">Includes VAT and 2-year international warranty.</Text>
               </VStack>

               <Text fontSize="lg" color="gray.600" lineHeight="tall">
                 {product.description}
               </Text>

               <Divider borderColor={borderColor} />

               <HStack spacing={6} w="full">
                  <HStack bg={cardBg} rounded="2xl" border="1px solid" borderColor={borderColor} p={2} spacing={4}>
                     <IconButton icon={<Text fontSize="xl">-</Text>} variant="ghost" onClick={() => setQuantity(Math.max(1, quantity - 1))} />
                     <Text fontWeight="black" fontSize="xl" w={8} textAlign="center">{quantity}</Text>
                     <IconButton icon={<Text fontSize="xl">+</Text>} variant="ghost" onClick={() => setQuantity(quantity + 1)} />
                  </HStack>
                  <Button 
                    flex={1} 
                    h={16} 
                    colorScheme="blue" 
                    rounded="2xl" 
                    leftIcon={<HiShoppingCart />} 
                    fontSize="lg" 
                    fontWeight="black"
                    shadow="xl"
                  >
                    Add to Cart
                  </Button>
                  <IconButton icon={<HiHeart />} h={16} w={16} variant="outline" rounded="2xl" colorScheme="red" />
               </HStack>

               <SimpleGrid columns={3} spacing={8} w="full" pt={4}>
                  <VStack align="start" spacing={1}>
                     <Icon as={HiTruck} w={6} h={6} color="blue.500" />
                     <Text fontWeight="bold" fontSize="xs">Free Shipping</Text>
                  </VStack>
                  <VStack align="start" spacing={1}>
                     <Icon as={HiShieldCheck} w={6} h={6} color="blue.500" />
                     <Text fontWeight="bold" fontSize="xs">2Y Warranty</Text>
                  </VStack>
                  <VStack align="start" spacing={1}>
                     <Icon as={HiRefresh} w={6} h={6} color="blue.500" />
                     <Text fontWeight="bold" fontSize="xs">14D Returns</Text>
                  </VStack>
               </SimpleGrid>
            </VStack>

          </SimpleGrid>

          {/* Bottom Tabs: Description, Specs, Reviews */}
          <Box bg={cardBg} p={12} rounded="4xl" shadow="xl" border="1px solid" borderColor={borderColor}>
             <Tabs variant="soft-rounded" colorScheme="blue">
                <TabList mb={12}>
                   <Tab fontWeight="black" px={8}>Description</Tab>
                   <Tab fontWeight="black" px={8}>Specifications</Tab>
                   <Tab fontWeight="black" px={8}>Reviews</Tab>
                </TabList>
                <TabPanels>
                   <TabPanel>
                      <VStack align="start" spacing={6}>
                         <Heading size="lg">Product Overview</Heading>
                         <Text fontSize="lg" color="gray.500" lineHeight="tall">
                            The Ergonomic Executive Chair Pro is the culmination of years of biomechanical research. We've combined premium materials with cutting-edge adjustable components to create a seating experience that adapts to your body in real-time.
                         </Text>
                         <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} w="full">
                            <Box p={6} bg="gray.50" rounded="2xl">
                               <Heading size="sm" mb={4}>Adaptive Lumbar Support</Heading>
                               <Text fontSize="sm" color="gray.500">Self-adjusting lumbar system that tracks your spine's curvature as you move.</Text>
                            </Box>
                            <Box p={6} bg="gray.50" rounded="2xl">
                               <Heading size="sm" mb={4}>4D Adjustable Armrests</Heading>
                               <Text fontSize="sm" color="gray.500">Modify height, width, depth, and angle for perfect wrist alignment.</Text>
                            </Box>
                         </SimpleGrid>
                      </VStack>
                   </TabPanel>
                   <TabPanel>
                      <SimpleGrid columns={2} spacing={10}>
                         <VStack align="stretch" spacing={4}>
                            <HStack justify="space-between"><Text fontWeight="bold">Frame Material</Text><Text color="gray.500">Reinforced Aluminum</Text></HStack>
                            <HStack justify="space-between"><Text fontWeight="bold">Seat Material</Text><Text color="gray.500">High-Density Memory Foam</Text></HStack>
                            <HStack justify="space-between"><Text fontWeight="bold">Gas Lift</Text><Text color="gray.500">Class 4 Heavy Duty</Text></HStack>
                         </VStack>
                         <VStack align="stretch" spacing={4}>
                            <HStack justify="space-between"><Text fontWeight="bold">Max Weight</Text><Text color="gray.500">150kg / 330lbs</Text></HStack>
                            <HStack justify="space-between"><Text fontWeight="bold">Casters</Text><Text color="gray.500">60mm PU Pressure Quiet</Text></HStack>
                            <HStack justify="space-between"><Text fontWeight="bold">Recline</Text><Text color="gray.500">90° - 135° Locking</Text></HStack>
                         </VStack>
                      </SimpleGrid>
                   </TabPanel>
                   <TabPanel>
                      <Heading size="lg" mb={8}>Customer Feedback</Heading>
                      <Text color="gray.500">Reviews module integrated with real user ratings coming soon.</Text>
                   </TabPanel>
                </TabPanels>
             </Tabs>
          </Box>

        </Container>
      </Box>
    </Layout>
  );
};


export async function getServerSideProps() {
  return { props: {} };
}

export default ProductDetailPage;
