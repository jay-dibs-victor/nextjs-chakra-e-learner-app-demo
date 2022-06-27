import React, { useState, useEffect } from "react";
import {
  Box,
  SimpleGrid,
  Skeleton,
  VStack,
  Text,
  Badge,
  Image,
  useColorModeValue,
  Flex,
  Circle,
  Icon,
  Button,
} from "@chakra-ui/react";
import { productAPI, courseAPI } from "utils/api";
import Link from "next/link";
import { HiAcademicCap, HiChevronRight } from "react-icons/hi";

const CardSkeleton = () => (
  <Box bg="white" p={4} rounded="2xl" shadow="sm" border="1px solid" borderColor="gray.100">
    <Skeleton height="200px" rounded="xl" mb={4} />
    <Skeleton height="20px" width="70%" mb={2} />
    <Skeleton height="15px" width="40%" />
  </Box>
);

const Cards = ({ data, type }) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.700", "white");

  if (data === "loading") {
    return (
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={8}>
        {[...Array(8)].map((_, i) => <CardSkeleton key={i} />)}
      </SimpleGrid>
    );
  }

  return (
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={8}>
      {data.map((item, idx) => {
        const id = item._id || item.id || idx;
        const href = type === "courses"
          ? `/courses/${id}`
          : `/products/${id}`;
        
        const categoryLabel = typeof item.category === "object"
          ? item.category?.name
          : (item.category || (type === "courses" ? "Course" : "Product"));

        return (
          <Link key={id} href={href} passHref legacyBehavior>
            <Box
              as="a"
              bg={cardBg}
              rounded="4xl"
              overflow="hidden"
              shadow="xl"
              borderWidth="1px"
              borderColor={borderColor}
              transition="all 0.4s cubic-bezier(.175,.885,.32,1.275)"
              _hover={{ transform: "translateY(-10px) scale(1.02)", shadow: "2xl" }}
              cursor="pointer"
              display="block"
              textDecoration="none"
              position="relative"
            >
              {/* Image Section */}
              <Box h="220px" position="relative" overflow="hidden">
                <Image
                  src={item.image || item.thumbnail || "/img/herolanding.jpg"}
                  alt={item.title || item.name}
                  objectFit="cover"
                  w="full"
                  h="full"
                  fallbackSrc="/img/herolanding.jpg"
                />
                <Box 
                  position="absolute" 
                  top={4} 
                  left={4} 
                  zIndex={1}
                >
                  <Badge 
                    px={3} 
                    py={1} 
                    rounded="full" 
                    bg="whiteAlpha.900" 
                    color="blue.600" 
                    shadow="md" 
                    fontSize="xs" 
                    fontWeight="black"
                    textTransform="uppercase"
                  >
                    {categoryLabel}
                  </Badge>
                </Box>
                {type === "courses" && (
                   <Box position="absolute" bottom={4} right={4} zIndex={1}>
                     <Circle size={8} bg="blue.500" color="white" shadow="lg">
                       <Icon as={HiAcademicCap} />
                     </Circle>
                   </Box>
                )}
              </Box>

              {/* Content Section */}
              <VStack p={6} align="start" spacing={3}>
                <Text 
                  fontWeight="black" 
                  fontSize="lg" 
                  color={textColor} 
                  noOfLines={2} 
                  lineHeight="shorter"
                >
                  {item.title || item.name}
                </Text>
                
                <Flex justify="space-between" align="center" w="full">
                  <Text fontWeight="black" fontSize="xl" color="blue.500">
                    ₦{item.price?.toLocaleString() || "0"}
                  </Text>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    colorScheme="blue" 
                    rounded="xl" 
                    rightIcon={<HiChevronRight />}
                    px={0}
                  >
                    {type === "courses" ? "Enroll" : "Details"}
                  </Button>
                </Flex>
              </VStack>
            </Box>
          </Link>
        );
      })}
    </SimpleGrid>
  );
};

export const ProductCards = ({ type = "products" }) => {
  const [data, setData] = useState("loading");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = type === "courses"
          ? await courseAPI.getCourses()
          : await productAPI.getProducts();
        if (res.data && res.data.length > 0) {
          setData(res.data);
        } else {
          throw new Error("Empty data");
        }
      } catch (err) {
        console.warn(`${type} fetch failed, using mock data.`);
        const mockData = type === "courses" ? [
          { title: "Full-Stack Web Development", price: 85000, image: "/img/coding.png", category: "Development" },
          { title: "Advanced Digital Marketing", price: 65000, image: "/img/marketing.png", category: "Marketing" },
          { title: "Mastering UI/UX Design", price: 75000, image: "/img/design.png", category: "Design" },
        ] : [
          { name: "Ergonomic Desk", price: 120000, image: "/img/coding.png", category: "Furniture" },
          { name: "Mechanical Keyboard", price: 45000, image: "/img/marketing.png", category: "Tech" },
        ];
        setTimeout(() => setData(mockData), 1500);
      }
    };
    fetchData();
  }, [type]);

  return <Cards data={data} type={type} />;
};
