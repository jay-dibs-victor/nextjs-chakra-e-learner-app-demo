
//import Layout, { Container } from "components/shared/blocks/Layout";

/*authenticated pages layout*/
import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  SimpleGrid,
  Icon,
  Avatar,
  useColorModeValue,
  Container,
  VStack,
  HStack,
  Circle,
  Divider,
  Center,
  Progress,
  Button,
  Badge,
  IconButton,
  Image,
} from "@chakra-ui/react";
import { Layout, Section } from "components/components/pages";
import { motion } from "framer-motion";
import {
  HiShoppingBag,
  HiHeart,
  HiStar,
  HiChevronRight,
  HiBell,
  HiAcademicCap,
  HiBadgeCheck,
  HiClock,
  HiBriefcase,
  HiCheckCircle,
  HiXCircle,
  HiDotsHorizontal
} from "react-icons/hi";
import Link from "next/link";
import buildSEO from "utils/buildSEO";
import useAuth from "hooks/useAuth";
import { lmsAPI, jobAPI } from "utils/api";

const pageSEO = buildSEO("User Dashboard", "Track your learning progress and career applications.");

const MotionBox = motion(Box);

const StatCard = ({ title, value, icon, color }) => {
  return (
    <MotionBox
      whileHover={{ y: -5 }}
      p={6}
      bg={useColorModeValue("white", "gray.700")}
      rounded="2xl"
      shadow="sm"
      borderWidth="1px"
      borderColor={useColorModeValue("gray.100", "gray.600")}
    >
      <Flex align="center">
        <Circle size="12" bg={`${color}.50`} color={`${color}.500`}>
          <Icon as={icon} w={6} h={6} />
        </Circle>
        <Box ml={4}>
          <Text fontSize="sm" color="gray.500" fontWeight="medium">{title}</Text>
          <Heading size="lg">{value}</Heading>
        </Box>
      </Flex>
    </MotionBox>
  );
};

const CourseProgressCard = ({ id, title, progress, instructor, thumbnail }) => {
  const cardBg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.100", "gray.600");

  return (
    <Box 
      bg={cardBg} 
      p={6} 
      rounded="3xl" 
      shadow="xl" 
      borderWidth="1px" 
      borderColor={borderColor}
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "2xl" }}
    >
      <VStack align="stretch" spacing={5}>
        <Box h="160px" rounded="2xl" position="relative" overflow="hidden">
          <Image 
            src={thumbnail || "/img/herolanding.jpg"} 
            alt={title} 
            objectFit="cover" 
            w="full" 
            h="full" 
            fallbackSrc="/img/herolanding.jpg"
          />
          <Box position="absolute" inset={0} bg="blackAlpha.400" />
          <Center position="absolute" inset={0}>
             <Circle size="12" bg="whiteAlpha.900" color="blue.600" shadow="lg">
               <Icon as={HiAcademicCap} w={6} h={6} />
             </Circle>
          </Center>
        </Box>

        <VStack align="start" spacing={1}>
          <Text fontWeight="black" fontSize="lg" noOfLines={1}>{title}</Text>
          <Text fontSize="sm" color="gray.500" fontWeight="bold">Instructor: {instructor}</Text>
        </VStack>

        <VStack spacing={3} align="stretch">
          <Flex justify="space-between" fontSize="xs" fontWeight="black">
            <Text color="blue.600">{progress}% COMPLETE</Text>
            <Text color="gray.400">{progress === 100 ? "Finished" : "In Progress"}</Text>
          </Flex>
          <Progress value={progress} size="xs" colorScheme="blue" rounded="full" bg="blue.50" />
        </VStack>

        <Link href={`/learn/${id}`}>
          <Button 
            size="lg" 
            w="full" 
            variant="solid" 
            colorScheme="blue" 
            rounded="2xl"
            fontWeight="black"
            rightIcon={<HiChevronRight />}
            _hover={{ transform: "scale(1.02)" }}
          >
            {progress === 100 ? "Review Course" : "Continue Learning"}
          </Button>
        </Link>
      </VStack>
    </Box>
  );
};

const TimelineItem = ({ title, company, status, date, isLast }) => {
  const statusColors = {
    "Accepted": "green",
    "Interview": "blue",
    "Technical": "purple",
    "Applied": "gray",
    "Rejected": "red"
  };

  return (
    <Flex h="100px" position="relative">
      <VStack mr={4} position="relative" h="full">
        <Circle size={4} bg={`${statusColors[status] || "blue"}.500`} zIndex={1} />
        {!isLast && <Box w="2px" bg="gray.100" flex={1} />}
      </VStack>
      <VStack align="start" spacing={1}>
        <HStack>
          <Text fontWeight="black">{title}</Text>
          <Badge colorScheme={statusColors[status] || "blue"} variant="subtle" rounded="full" fontSize="2xs">{status}</Badge>
        </HStack>
        <Text fontSize="sm" color="gray.500" fontWeight="bold">{company} • {date}</Text>
      </VStack>
    </Flex>
  );
};

const DashboardOverview = () => {
  const auth = useAuth();
  const { me } = auth;
  const [myCourses, setMyCourses] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.100", "gray.600");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [courseRes, jobRes] = await Promise.all([
          lmsAPI.getMyCourses(),
          jobAPI.getApplications()
        ]);
        setMyCourses(courseRes.data);
        setApplications(jobRes.data);
      } catch (err) {
        console.warn("Dashboard fetch failed, using fallbacks.");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const enrolledCourses = myCourses.length > 0 ? myCourses : [
    { course: { title: "Advanced Full-Stack Engineering" }, progress: 75, instructor: { name: "Elena Rodriguez" } },
    { course: { title: "UI/UX Design Masterclass" }, progress: 30, instructor: { name: "Marcus Thorne" } }
  ];

  const jobApplications = applications.length > 0 ? applications : [
    { title: "Senior Frontend Developer", company: "Google", status: "Technical", date: "May 26, 2022" },
    { title: "UI Engineer", company: "Meta", status: "Accepted", date: "May 24, 2022" },
    { title: "React Specialist", company: "ShopZon", status: "Applied", date: "May 20, 2022" }
  ];

  return (
    <Layout SEO={pageSEO} bg={bgColor}>
      <Container maxW="full" px={{ base: 6, lg: 24 }} py={12}>
        {/* Profile Header */}
        <Box mb={12}>
          <Flex align="center" direction={{ base: "column", md: "row" }} textAlign={{ base: "center", md: "left" }}>
            <Avatar
              size="2xl"
              src="/img/avatar.png"
              name={me?.name}
              shadow="2xl"
              borderWidth="4px"
              borderColor="white"
            />
            <Box ml={{ md: 8 }} mt={{ base: 4, md: 0 }}>
              <Heading size="2xl" mb={2} fontWeight="black">Welcome back, {me?.firstName || "Alex"}! 👋</Heading>
              <Text color="gray.500" fontSize="lg" fontWeight="medium">You have {enrolledCourses.length} active courses and {jobApplications.length} job applications.</Text>
            </Box>
          </Flex>
        </Box>

        {/* Performance Metrics */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={12}>
          <StatCard title="Learning Hours" value="48.5h" icon={HiClock} color="blue" />
          <StatCard title="Courses Completed" value={enrolledCourses.filter(c => c.progress === 100).length} icon={HiAcademicCap} color="green" />
          <StatCard title="Job Applications" value={jobApplications.length} icon={HiBriefcase} color="purple" />
          <StatCard title="Skill Badges" value="24" icon={HiBadgeCheck} color="orange" />
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, xl: 3 }} spacing={10}>

          {/* Active Courses (Left/Middle) */}
          <Box gridColumn={{ xl: "span 2" }}>
            <VStack align="stretch" spacing={8}>
              <Flex justify="space-between" align="center">
                <Heading size="lg" fontWeight="black">My Learning Path</Heading>
                <Button variant="link" colorScheme="blue" rightIcon={<HiChevronRight />}>View All Courses</Button>
              </Flex>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                {enrolledCourses.map((c, idx) => (
                  <CourseProgressCard 
                    key={idx}
                    id={c.course?._id || c._id || (idx + 1)}
                    title={c.course?.title || c.title} 
                    progress={c.progress} 
                    instructor={c.course?.instructor?.name || c.instructor?.name || "Expert Instructor"} 
                    thumbnail={c.course?.thumbnail || c.thumbnail}
                  />
                ))}
              </SimpleGrid>

              {/* Recent Activity Table */}
              <Box bg={cardBg} p={8} rounded="3xl" shadow="sm" border="1px solid" borderColor={borderColor}>
                <Heading size="md" mb={6} fontWeight="black">Recent Notifications</Heading>
                <VStack align="stretch" spacing={4} divider={<Divider />}>
                  {[1, 2, 3].map((notif) => (
                    <Flex key={notif} align="center" justify="space-between" py={2}>
                      <HStack spacing={4}>
                        <Circle size={10} bg="blue.50" color="blue.500"><Icon as={HiBell} /></Circle>
                        <VStack align="start" spacing={0}>
                          <Text fontWeight="bold">New lesson added to "React Native Foundations"</Text>
                          <Text fontSize="xs" color="gray.500">2 hours ago</Text>
                        </VStack>
                      </HStack>
                      <Button size="xs" variant="ghost">Dismiss</Button>
                    </Flex>
                  ))}
                </VStack>
              </Box>
            </VStack>
          </Box>

          {/* Job Applications Timeline (Right) */}
          <Box>
            <Box bg={cardBg} p={8} rounded="4xl" shadow="xl" border="1px solid" borderColor={borderColor} minH="600px">
              <VStack align="stretch" spacing={8}>
                <Flex justify="space-between" align="center">
                  <Heading size="lg" fontWeight="black">Job Tracker</Heading>
                  <IconButton icon={<HiDotsHorizontal />} variant="ghost" size="sm" />
                </Flex>

                <VStack align="stretch" spacing={0}>
                  {jobApplications.map((app, idx) => (
                    <TimelineItem
                      key={idx}
                      title={app.title}
                      company={app.company}
                      status={app.status}
                      date={new Date(app.date).toLocaleDateString()}
                      isLast={idx === jobApplications.length - 1}
                    />
                  ))}
                </VStack>

                <Box p={6} bg="blue.600" rounded="3xl" color="white" shadow="lg">
                  <VStack align="start" spacing={4}>
                    <Icon as={HiBadgeCheck} w={8} h={8} />
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="black" fontSize="lg">Hired! 🎊</Text>
                      <Text fontSize="sm" opacity={0.9}>You&apos;ve been accepted at Meta as a UI Engineer. Review your offer letter now.</Text>
                    </VStack>
                    <Button bg="white" color="blue.600" w="full" rounded="2xl" fontWeight="black">Review Offer</Button>
                  </VStack>
                </Box>
              </VStack>
            </Box>
          </Box>

        </SimpleGrid>
      </Container>
    </Layout>
  );
};

export default DashboardOverview;



