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
} from "@chakra-ui/react";
import { productAPI, courseAPI } from "utils/api";

const CardSkeleton = () => (
  <Box bg="white" p={4} rounded="2xl" shadow="sm" border="1px solid" borderColor="gray.100">
    <Skeleton height="200px" rounded="xl" mb={4} />
    <Skeleton height="20px" width="70%" mb={2} />
    <Skeleton height="15px" width="40%" />
  </Box>
);

const Cards = ({ data }) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.100", "gray.700");

  if (data === "loading") {
    return (
      <SimpleGrid columns={{ base: 2, md: 4, lg: 6 }} spacing={6}>
        {[...Array(6)].map((_, i) => <CardSkeleton key={i} />)}
      </SimpleGrid>
    );
  }

  return (
    <SimpleGrid columns={{ base: 2, md: 4, lg: 6 }} spacing={6}>
      {data.map((item, idx) => (
        <Box
          key={idx}
          bg={cardBg}
          p={4}
          rounded="3xl"
          shadow="md"
          border="1px solid"
          borderColor={borderColor}
          _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
          transition="all 0.3s"
          cursor="pointer"
        >
          <Box h="200px" bg="gray.50" rounded="2xl" mb={4} overflow="hidden">
            <Image
              src={item.image || item.thumbnail}
              alt={item.title || item.name}
              objectFit="cover"
              w="full"
              h="full"
            />
          </Box>
          <VStack align="start" spacing={1}>
            <Badge colorScheme="blue" variant="subtle" rounded="full">{item.category}</Badge>
            <Text fontWeight="black" noOfLines={2}>{item.title || item.name}</Text>
            <Text fontWeight="black" color="blue.600">&#8358;{item.price?.toLocaleString()}</Text>
          </VStack>
        </Box>
      ))}
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

  return <Cards data={data} />;
};
