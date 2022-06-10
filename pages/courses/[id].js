import React, { useState } from "react";
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
  StackDivider,
  useColorModeValue,
  Icon,
  Badge,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Avatar,
  HStack,
  Circle,
  Divider,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Center,
} from "@chakra-ui/react";
import { 
  HiPlay, 
  HiLockClosed, 
  HiCheckCircle, 
  HiClock, 
  HiUserGroup, 
  HiStar,
  HiChevronRight,
  HiOutlineBookOpen,
  HiGlobeAlt
} from "react-icons/hi";
import { Layout } from "components/components/pages";
import buildSEO from "utils/buildSEO";

const pageSEO = buildSEO("Course Details", "Master high-demand skills with our expert-led curriculum.");

import { useRouter } from "next/router";
import { courseAPI } from "utils/api";

const CourseDetailPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [course, setCourse] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.100", "gray.700");

  useEffect(() => {
    if (id) {
      const fetchCourse = async () => {
        try {
          const res = await courseAPI.getCourse(id);
          setCourse(res.data);
        } catch (err) {
          console.warn("Course fetch failed, using mock data.");
          // Fallback to mock data for demonstration
          setCourse({
            title: "Advanced Full-Stack Engineering with Next.js & Chakra UI",
            description: "Master the art of building high-performance web applications.",
            price: 65000,
            instructor: { name: "Dr. Elena Rodriguez", role: "Architect", avatar: "https://bit.ly/pros-elena" }
          });
        }
      };
      fetchCourse();
    }
  }, [id]);

  if (!course) return null;

  const curriculum = [
    {
      title: "Section 1: Fundamentals & Environment Setup",
      units: [
        { title: "Course Introduction", duration: "05:20", locked: false },
        { title: "Tools of the Trade", duration: "12:45", locked: false },
        { title: "Installing Dependencies", duration: "15:10", locked: true },
      ]
    },
    {
      title: "Section 2: Deep Dive into Architecture",
      units: [
        { title: "Modular Design Patterns", duration: "25:30", locked: true },
        { title: "State Management 101", duration: "32:15", locked: true },
        { title: "Advanced Routing", duration: "18:50", locked: true },
      ]
    }
  ];

  const instructors = [
    {
      name: "Dr. Elena Rodriguez",
      role: "Senior Software Architect",
      bio: "Elena has over 15 years of experience building scalable enterprise systems at Fortune 500 companies.",
      avatar: "https://bit.ly/pros-elena"
    },
    {
      name: "Marcus Thorne",
      role: "UI/UX Expert",
      bio: "Award-winning designer focused on human-centric digital experiences and accessible design systems.",
      avatar: "https://bit.ly/pros-marcus"
    }
  ];

  return (
    <Layout SEO={pageSEO}>
      <Box bg={useColorModeValue("gray.50", "gray.900")} minH="100vh" py={20}>
        <Container maxW="full" px={{ base: 6, lg: 24 }}>
          <Flex direction={{ base: "column", lg: "row" }} gap={12}>
            
            {/* Main Content (Left) */}
            <Box flex="2">
              <VStack align="stretch" spacing={16}>
                
                {/* Hero / Intro */}
                <VStack align="start" spacing={6}>
                  <HStack spacing={4}>
                    <Badge colorScheme="blue" variant="solid" px={3} py={1} rounded="full">Bestseller</Badge>
                    <HStack color="orange.400" spacing={1}>
                      <Icon as={HiStar} />
                      <Text fontWeight="bold">4.9 (2.4k reviews)</Text>
                    </HStack>
                  </HStack>
                  <Heading size="3xl" fontWeight="black" letterSpacing="tight">
                    {course.title}
                  </Heading>
                  <Text fontSize="xl" color="gray.500" maxW="3xl">
                    {course.description}
                  </Text>
                  <HStack spacing={8} pt={4}>
                    <HStack>
                      <Icon as={HiUserGroup} color="blue.500" />
                      <Text fontWeight="bold">12,450 students</Text>
                    </HStack>
                    <HStack>
                      <Icon as={HiGlobeAlt} color="blue.500" />
                      <Text fontWeight="bold">English, Spanish</Text>
                    </HStack>
                    <HStack>
                      <Icon as={HiClock} color="blue.500" />
                      <Text fontWeight="bold">Last updated 05/2022</Text>
                    </HStack>
                  </HStack>
                </VStack>

                <Divider borderColor={borderColor} />

                {/* Curriculum Section */}
                <VStack align="stretch" spacing={8}>
                  <VStack align="start" spacing={2}>
                    <Heading size="xl" fontWeight="black">Course Content</Heading>
                    <Text color="gray.500">12 sections • 84 lectures • 18h 45m total length</Text>
                  </VStack>

                  <Accordion allowMultiple defaultIndex={[0]}>
                    {curriculum.map((section, idx) => (
                      <AccordionItem key={idx} border="none" mb={4}>
                        <h2>
                          <AccordionButton 
                            bg={cardBg} 
                            p={6} 
                            rounded="2xl" 
                            shadow="sm"
                            _hover={{ bg: useColorModeValue("blue.50", "gray.700") }}
                          >
                            <Box flex="1" textAlign="left">
                              <Text fontWeight="black" fontSize="lg">{section.title}</Text>
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} pt={6}>
                          <VStack align="stretch" spacing={4} pl={4}>
                            {section.units.map((unit, uIdx) => (
                              <HStack key={uIdx} justify="space-between" p={3} rounded="xl" _hover={{ bg: "whiteAlpha.50" }}>
                                <HStack spacing={4}>
                                  <Circle size={8} bg={unit.locked ? "gray.100" : "blue.50"} color={unit.locked ? "gray.400" : "blue.500"}>
                                    <Icon as={unit.locked ? HiLockClosed : HiPlay} />
                                  </Circle>
                                  <Text fontWeight="bold" color={unit.locked ? "gray.400" : "inherit"}>
                                    {unit.title}
                                  </Text>
                                  {!unit.locked && <Badge colorScheme="green" variant="subtle" fontSize="2xs">Free Preview</Badge>}
                                </HStack>
                                <Text fontSize="sm" color="gray.400" fontWeight="bold">{unit.duration}</Text>
                              </HStack>
                            ))}
                          </VStack>
                        </AccordionPanel>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </VStack>

                {/* Instructors Section */}
                <VStack align="stretch" spacing={8}>
                  <Heading size="xl" fontWeight="black">Your Instructors</Heading>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
                    {instructors.map((inst, idx) => (
                      <Box key={idx} bg={cardBg} p={8} rounded="3xl" shadow="xl" border="1px solid" borderColor={borderColor}>
                        <HStack spacing={6} mb={6}>
                          <Avatar size="xl" name={inst.name} src={inst.avatar} />
                          <VStack align="start" spacing={0}>
                            <Text fontWeight="black" fontSize="xl">{inst.name}</Text>
                            <Text color="blue.500" fontWeight="bold">{inst.role}</Text>
                          </VStack>
                        </HStack>
                        <Text color="gray.500" lineHeight="tall">{inst.bio}</Text>
                        <Button mt={6} variant="link" colorScheme="blue" rightIcon={<HiChevronRight />}>View Profile</Button>
                      </Box>
                    ))}
                  </SimpleGrid>
                </VStack>

                {/* Related Courses Section */}
                <VStack align="stretch" spacing={10}>
                   <VStack align="start" spacing={2}>
                    <Heading size="xl" fontWeight="black">Students also bought</Heading>
                    <Text color="gray.500">Boost your skills with these highly recommended additions.</Text>
                  </VStack>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
                     {[...Array(4)].map((_, i) => (
                       <Box key={i} bg={cardBg} p={6} rounded="3xl" shadow="lg" border="1px solid" borderColor={borderColor}>
                          <Box h="180px" bg="blue.600" rounded="2xl" mb={6} position="relative" overflow="hidden">
                             <Box position="absolute" inset={0} bgGradient="linear(to-br, blue.400, blue.800)" opacity={0.6} />
                             <Center h="full">
                                <Icon as={HiOutlineBookOpen} color="white" w={12} h={12} />
                             </Center>
                          </Box>
                          <VStack align="start" spacing={3}>
                             <Badge colorScheme="purple">Intermediate</Badge>
                             <Heading size="md" fontWeight="black">Mastering Microservices with Go</Heading>
                             <HStack justify="space-between" w="full">
                                <Text fontWeight="black" fontSize="xl">₦45,000</Text>
                                <Button size="sm" variant="outline" colorScheme="blue" rounded="full">Preview</Button>
                             </HStack>
                          </VStack>
                       </Box>
                     ))}
                  </SimpleGrid>
                  <Center py={8}>
                     <Button variant="ghost" colorScheme="blue" size="lg" fontWeight="black">Load More Courses</Button>
                  </Center>
                </VStack>

              </VStack>
            </Box>

            {/* Sidebar (Right) */}
            <Box flex="1">
               <Box 
                 bg={cardBg} 
                 p={8} 
                 rounded="4xl" 
                 shadow="2xl" 
                 border="1px solid" 
                 borderColor={borderColor} 
                 position="sticky" 
                 top="120px"
                 zIndex={10}
               >
                  <VStack align="stretch" spacing={8}>
                    {/* Video Preview Trigger */}
                    <Box 
                      h="220px" 
                      bgImage="url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80')" 
                      bgSize="cover" 
                      bgPosition="center" 
                      rounded="3xl" 
                      position="relative"
                      cursor="pointer"
                      onClick={onOpen}
                      _hover={{ transform: "scale(1.02)" }}
                      transition="all 0.3s"
                    >
                      <Box position="absolute" inset={0} bg="blackAlpha.600" rounded="3xl" />
                      <Center h="full" position="relative">
                        <VStack spacing={4}>
                           <Circle size={16} bg="white" color="blue.600" shadow="2xl">
                             <Icon as={HiPlay} w={8} h={8} />
                           </Circle>
                           <Text color="white" fontWeight="black">Preview this course</Text>
                        </VStack>
                      </Center>
                    </Box>

                    <VStack align="stretch" spacing={6}>
                       <HStack align="end" spacing={2}>
                          <Text fontSize="4xl" fontWeight="black">₦{course.price?.toLocaleString()}</Text>
                          <Text fontSize="lg" color="gray.400" textDecoration="line-through" mb={2}>₦{(course.price * 1.5).toLocaleString()}</Text>
                       </HStack>
                       <Text color="red.500" fontWeight="bold" fontSize="sm">🔥 45% Off ends in 12 hours!</Text>

                       <VStack spacing={4} pt={4}>
                          <Button w="full" size="lg" h={16} colorScheme="blue" rounded="2xl" fontSize="lg" fontWeight="black" shadow="xl">Enroll Now</Button>
                          <Button w="full" size="lg" h={16} variant="outline" borderColor="blue.500" color="blue.500" rounded="2xl" fontSize="lg" fontWeight="black">Add to Cart</Button>
                       </VStack>
                    </VStack>

                    <VStack align="start" spacing={4} pt={4}>
                       <Text fontWeight="black">This course includes:</Text>
                       <VStack align="start" spacing={2} color="gray.500" fontSize="sm">
                          <HStack><Icon as={HiCheckCircle} color="green.500" /><Text>18.5 hours on-demand video</Text></HStack>
                          <HStack><Icon as={HiCheckCircle} color="green.500" /><Text>12 downloadable resources</Text></HStack>
                          <HStack><Icon as={HiCheckCircle} color="green.500" /><Text>Full lifetime access</Text></HStack>
                          <HStack><Icon as={HiCheckCircle} color="green.500" /><Text>Certificate of completion</Text></HStack>
                       </VStack>
                    </VStack>
                  </VStack>
               </Box>
            </Box>

            {/* Video Preview Modal */}
            <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered>
              <ModalOverlay backdropFilter="blur(10px)" bg="blackAlpha.700" />
              <ModalContent bg="black" rounded="3xl" overflow="hidden">
                <ModalCloseButton color="white" zIndex={10} />
                <ModalBody p={0}>
                  <Box position="relative" pt="56.25%">
                    <iframe
                      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                      title="Course Preview"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </Box>
                </ModalBody>
              </ModalContent>
            </Modal>

          </Flex>
        </Container>
      </Box>
    </Layout>
  );
};

export default CourseDetailPage;
