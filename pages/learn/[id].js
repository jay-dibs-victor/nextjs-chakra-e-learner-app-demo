import React, { useState } from "react";
import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Heading,
  Icon,
  Button,
  IconButton,
  Progress,
  useColorModeValue,
  Circle,
  Divider,
  Collapse,
  Badge,
  Radio,
  RadioGroup,
  Stack as ChakraStack,
  useToast,
} from "@chakra-ui/react";
import {
  HiChevronLeft,
  HiChevronRight,
  HiMenu,
  HiPlay,
  HiDocumentText,
  HiQuestionMarkCircle,
  HiCheckCircle,
  HiLockClosed,
  HiExternalLink,
  HiArrowLeft
} from "react-icons/hi";
import { Layout } from "components/components/pages";
import Link from "next/link";

import { useRouter } from "next/router";
import { courseAPI, lmsAPI } from "utils/api";

const LearnPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [course, setCourse] = useState(null);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const toast = useToast();

  const sidebarBg = useColorModeValue("white", "gray.800");
  const playerBg = useColorModeValue("gray.50", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  useEffect(() => {
    if (id) {
      const fetchCourse = async () => {
        try {
          const res = await courseAPI.getCourse(id);
          setCourse(res.data);
        } catch (err) {
          console.error("Learn fetch failed");
        }
      };
      fetchCourse();
    }
  }, [id]);

  const curriculum = course?.sections || [];
  const [activeUnit, setActiveUnit] = useState({ section: 0, subSection: 0, unit: 0 });

  const currentUnit = curriculum[activeUnit.section]?.subSections[activeUnit.subSection]?.units[activeUnit.unit];

  const handleProgressUpdate = async (sIdx, subIdx, uIdx) => {
    setActiveUnit({ section: sIdx, subSection: subIdx, unit: uIdx });
    try {
      await lmsAPI.updateProgress({
        courseId: id,
        unitId: curriculum[sIdx].subSections[subIdx].units[uIdx]._id,
        progress: Math.round(((sIdx + 1) / curriculum.length) * 100)
      });
    } catch (err) {
      console.error("Progress update failed");
    }
  };

  if (!course) return null;

  const handleQuizSubmit = () => {
    if (quizAnswer === currentUnit.content.correct) {
      toast({
        title: "Correct!",
        status: "success",
        duration: 3000,
      });
    } else {
      toast({
        title: "Try again",
        status: "error",
        duration: 3000,
      });
    }
  };

  return (
    <Box h="100vh" overflow="hidden" display="flex" flexDir="column">

      {/* Top Header */}
      <Flex
        h="80px"
        bg={sidebarBg}
        borderBottom="1px"
        borderColor={borderColor}
        align="center"
        px={8}
        justify="space-between"
        zIndex={20}
      >
        <HStack spacing={6}>
          <Link href="/courses/1">
            <IconButton icon={<HiArrowLeft />} variant="ghost" rounded="full" />
          </Link>
          <VStack align="start" spacing={0}>
            <Text fontSize="xs" color="gray.400" fontWeight="bold">MODULE {activeUnit.section + 1}</Text>
            <Heading size="md" fontWeight="black">{curriculum[activeUnit.section].title}</Heading>
          </VStack>
        </HStack>

        <HStack spacing={8}>
          <VStack align="end" spacing={1}>
            <Text fontSize="xs" fontWeight="bold" color="blue.500">75% COMPLETE</Text>
            <Progress value={75} w="200px" size="xs" colorScheme="blue" rounded="full" />
          </VStack>
          <Button colorScheme="blue" rounded="full" rightIcon={<HiChevronRight />}>Next Lesson</Button>
        </HStack>
      </Flex>

      <Flex flex={1} overflow="hidden">

        {/* Learning Content Area */}
        <Box flex={1} bg={playerBg} position="relative" overflowY="auto">
          <Flex direction="column" minH="full" maxW="4xl" mx="auto" py={12} px={8}>

            {/* Content Player */}
            <Box bg="black" rounded="3xl" shadow="2xl" overflow="hidden" mb={12} position="relative" pt={currentUnit.type === "video" ? "56.25%" : 0}>
              {currentUnit.type === "video" && (
                <iframe
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                  src={`https://www.youtube.com/embed/${currentUnit.content}`}
                  frameBorder="0"
                  allowFullScreen
                />
              )}
              {currentUnit.type === "text" && (
                <Box p={12} bg={sidebarBg} minH="400px">
                  <Heading mb={6}>{currentUnit.title}</Heading>
                  <Text fontSize="lg" lineHeight="tall" color="gray.500">
                    {currentUnit.content}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </Text>
                </Box>
              )}
              {currentUnit.type === "quiz" && (
                <Box p={12} bg={sidebarBg} minH="400px">
                  <VStack align="start" spacing={8}>
                    <Badge colorScheme="blue" variant="solid" px={4} py={1} rounded="full">KNOWLEDGE CHECK</Badge>
                    <Heading size="lg">{currentUnit.content.question}</Heading>
                    <RadioGroup onChange={setQuizAnswer} value={quizAnswer} w="full">
                      <ChakraStack spacing={4}>
                        {currentUnit.content.options.map(opt => (
                          <Box
                            key={opt}
                            p={4}
                            border="2px solid"
                            borderColor={quizAnswer === opt ? "blue.500" : borderColor}
                            rounded="2xl"
                            cursor="pointer"
                            bg={quizAnswer === opt ? "blue.50" : "transparent"}
                          >
                            <Radio value={opt} colorScheme="blue" fontWeight="bold">{opt}</Radio>
                          </Box>
                        ))}
                      </ChakraStack>
                    </RadioGroup>
                    <Button size="lg" colorScheme="blue" rounded="2xl" px={12} onClick={handleQuizSubmit}>Submit Answer</Button>
                  </VStack>
                </Box>
              )}
              {currentUnit.type === "pdf" && (
                <Box p={12} bg={sidebarBg} textAlign="center">
                  <Icon as={HiDocumentText} w={20} h={20} color="red.500" mb={6} />
                  <Heading size="md" mb={6}>Reference Document</Heading>
                  <Button leftIcon={<HiExternalLink />} colorScheme="blue" rounded="full">Download PDF</Button>
                </Box>
              )}
            </Box>

            <VStack align="start" spacing={6}>
              <Heading size="lg" fontWeight="black">{currentUnit.title}</Heading>
              <Divider borderColor={borderColor} />
              <Text color="gray.500" fontSize="lg">
                Detailed description and learning objectives for this unit would go here.
                This immersive environment ensures students focus on the content without distractions.
              </Text>
            </VStack>

          </Flex>
        </Box>

        {/* Sidebar Navigation */}
        <Box
          w={sidebarOpen ? "400px" : "0"}
          bg={sidebarBg}
          borderLeft="1px"
          borderColor={borderColor}
          transition="all 0.3s"
          overflow="hidden"
          display="flex"
          flexDir="column"
        >
          <Box p={6} borderBottom="1px" borderColor={borderColor}>
            <Heading size="sm" fontWeight="black">Course Curriculum</Heading>
          </Box>
          <Box flex={1} overflowY="auto" p={4}>
            <VStack align="stretch" spacing={2}>
              {curriculum.map((section, sIdx) => (
                <VStack key={sIdx} align="stretch" spacing={2}>
                  <Box p={4} bg="gray.50" rounded="xl">
                    <Text fontWeight="black" fontSize="sm">{section.title}</Text>
                  </Box>
                  <VStack align="stretch" spacing={4} pl={2}>
                    {section.subSections?.map((sub, subIdx) => (
                      <VStack key={subIdx} align="stretch" spacing={1}>
                        <Text fontWeight="bold" fontSize="xs" color="gray.400" pl={4}>{sub.title.toUpperCase()}</Text>
                        {sub.units.map((unit, uIdx) => (
                          <HStack
                            key={uIdx}
                            p={4}
                            rounded="xl"
                            cursor="pointer"
                            bg={activeUnit.section === sIdx && activeUnit.subSection === subIdx && activeUnit.unit === uIdx ? "blue.500" : "transparent"}
                            color={activeUnit.section === sIdx && activeUnit.subSection === subIdx && activeUnit.unit === uIdx ? "white" : "inherit"}
                            onClick={() => handleProgressUpdate(sIdx, subIdx, uIdx)}
                            _hover={activeUnit.section === sIdx && activeUnit.subSection === subIdx && activeUnit.unit === uIdx ? {} : { bg: "gray.50" }}
                          >
                            <Icon as={unit.type === "video" ? HiPlay : unit.type === "quiz" ? HiQuestionMarkCircle : HiDocumentText} />
                            <Text fontWeight="bold" fontSize="sm" isTruncated>{unit.title}</Text>
                            {activeUnit.section === sIdx && activeUnit.subSection === subIdx && activeUnit.unit === uIdx && <HiCheckCircle />}
                          </HStack>
                        ))}
                      </VStack>
                    ))}
                  </VStack>
                </VStack>
              ))}
            </VStack>
          </Box>
        </Box>

      </Flex>

      {/* Floating Toggle for Sidebar */}
      <IconButton
        aria-label="Toggle Sidebar"
        icon={<HiMenu />}
        position="fixed"
        bottom={8}
        right={sidebarOpen ? "420px" : 8}
        zIndex={30}
        colorScheme="blue"
        rounded="full"
        shadow="2xl"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      />

    </Box>
  );
};

export default LearnPage;
