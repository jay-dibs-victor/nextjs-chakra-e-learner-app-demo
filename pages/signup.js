import React from "react";
import { useRouter } from "next/router";
import {
  Flex,
  Box,
  Stack,
  Heading,
  Text,
  Input,
  Button,
  Link as ChakraLink,
  useColorModeValue,
  Icon,
  InputGroup,
  InputLeftElement,
  VStack,
  ScaleFade,
  SimpleGrid,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { HiMail, HiLockClosed, HiUser, HiArrowRight, HiSparkles } from "react-icons/hi";
import Link from "next/link";
import Layout from "components/shared/blocks/Layout";
import http from "utils/http";
import useForm from "hooks/useForm";
import useToast from "hooks/useToast";

const initialFieldsProps = [
  {
    id: "firstName",
    label: "First Name",
    placeholder: "John",
    type: "text",
    icon: HiUser,
  },
  {
    id: "lastName",
    label: "Last Name",
    placeholder: "Doe",
    type: "text",
    icon: HiUser,
  },
  {
    id: "email",
    label: "Email Address",
    placeholder: "john@example.com",
    type: "email",
    icon: HiMail,
  },
  {
    id: "password",
    label: "Password",
    placeholder: "••••••••",
    type: "password",
    icon: HiLockClosed,
  },
  {
    id: "confirmPassword",
    label: "Confirm Password",
    placeholder: "••••••••",
    type: "password",
    icon: HiLockClosed,
  },
];

const SignupPage = () => {
  const router = useRouter();
  const toast = useToast();

  const doSubmit = async (fieldsObj) => {
    try {
      const body = { ...fieldsObj, refCode: router.query.ref };
      await http.post("/auth/signup", body);

      toast.displayToast({
        title: "Account created!",
        description: "Welcome to the community. Please verify your email to get started.",
        status: "success",
      });
      router.push(`/signup/verify?email=${fieldsObj.email}`);
    } catch (err) {
      toast.displayToast({
        title: "Sign up failed",
        description: err.response?.data?.message || "Something went wrong. Please try again.",
        status: "error",
      });
    }
  };

  const form = useForm({ doSubmit, initialFieldsProps });

  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");

  return (
    <Layout>
      <Flex minH={"100vh"} align={"center"} justify={"center"} bg={bgColor} p={4}>
        <Stack
          spacing={0}
          mx={"auto"}
          maxW={"6xl"}
          w="full"
          direction={{ base: "column", md: "row" }}
          rounded="3xl"
          overflow="hidden"
          shadow="2xl"
          bg={cardBg}
          border="1px solid"
          borderColor={useColorModeValue("gray.100", "gray.700")}
        >
          {/* Left: Form */}
          <Box
            flex={1}
            p={{ base: 8, md: 16 }}
            position="relative"
            bg={cardBg}
            order={{ base: 2, md: 1 }}
          >
            <ScaleFade initialScale={0.95} in={true}>
              <VStack spacing={8} align="stretch">
                <VStack align="start" spacing={2}>
                  <Heading size="xl" fontWeight="black" letterSpacing="tight">
                    Join the Future
                  </Heading>
                  <Text color={"gray.500"} fontSize="lg">
                    Create your account to start your journey
                  </Text>
                </VStack>

                <Box
                  as="form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    form.handleSubmit(e);
                  }}
                >
                  <Stack spacing={5}>
                    <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
                      {initialFieldsProps.slice(0, 2).map((field) => (
                        <VStack align="start" key={field.id} spacing={2}>
                          <Text fontWeight="bold" fontSize="sm" color="gray.600">{field.label}</Text>
                          <InputGroup size="lg">
                            <InputLeftElement pointerEvents="none">
                              <Icon as={field.icon} color="blue.400" />
                            </InputLeftElement>
                            <Input
                              type={field.type}
                              placeholder={field.placeholder}
                              rounded="2xl"
                              bg={useColorModeValue("gray.50", "gray.900")}
                              borderWidth="2px"
                              borderColor="transparent"
                              fontSize="md"
                              _focus={{
                                bg: useColorModeValue("white", "gray.800"),
                                borderColor: "blue.400",
                                shadow: "lg",
                              }}
                              name={field.id}
                              onChange={form.handleType}
                            />
                          </InputGroup>
                        </VStack>
                      ))}
                    </SimpleGrid>

                    {initialFieldsProps.slice(2).map((field) => (
                      <VStack align="start" key={field.id} spacing={2}>
                        <Text fontWeight="bold" fontSize="sm" color="gray.600">{field.label}</Text>
                        <InputGroup size="lg">
                          <InputLeftElement pointerEvents="none">
                            <Icon as={field.icon} color="blue.400" />
                          </InputLeftElement>
                          <Input
                            type={field.type}
                            placeholder={field.placeholder}
                            rounded="2xl"
                            bg={useColorModeValue("gray.50", "gray.900")}
                            borderWidth="2px"
                            borderColor="transparent"
                            fontSize="md"
                            _focus={{
                              bg: useColorModeValue("white", "gray.800"),
                              borderColor: "blue.400",
                              shadow: "lg",
                            }}
                            name={field.id}
                            onChange={form.handleType}
                          />
                        </InputGroup>
                      </VStack>
                    ))}

                    <Button
                      type="submit"
                      size="lg"
                      colorScheme="blue"
                      h={16}
                      rounded="2xl"
                      fontSize="lg"
                      fontWeight="bold"
                      shadow="xl"
                      mt={4}
                      rightIcon={<HiArrowRight />}
                      _hover={{
                        transform: "translateY(-2px)",
                        shadow: "2xl",
                      }}
                      _active={{
                        transform: "translateY(0)",
                      }}
                      isLoading={form.formSubmitState.isSubmitting}
                      transition="all 0.2s"
                    >
                      Create Account
                    </Button>

                    <Stack pt={4}>
                      <Text align={"center"} color="gray.500">
                        Already have an account?{" "}
                        <Link href="/signin" passHref>
                          <ChakraLink color={"blue.500"} fontWeight="black">
                            Log In
                          </ChakraLink>
                        </Link>
                      </Text>
                    </Stack>
                  </Stack>
                </Box>
              </VStack>
            </ScaleFade>
          </Box>

          {/* Right: Content */}
          <Box
            display={{ base: "none", md: "block" }}
            flex={1.2}
            bgImage="url('/img/herolanding.jpg')"
            bgSize="cover"
            bgPosition="center"
            position="relative"
            order={{ base: 1, md: 2 }}
          >
            <Box position="absolute" inset={0} bgGradient="linear(to-br, blue.600, blue.900)" opacity={0.85} />
            <Flex
              pos="relative"
              h="full"
              direction="column"
              justify="space-between"
              p={12}
              color="white"
            >
              <VStack align="start" spacing={2}>
                <HStack color="blue.300">
                  <Icon as={HiSparkles} />
                  <Text fontWeight="black" letterSpacing="widest" fontSize="xs">JOIN THE REVOLUTION</Text>
                </HStack>
                <Heading size="3xl" fontWeight="black" letterSpacing="tight">
                  The New Standard of <Text as="span" color="blue.300">Learning</Text>
                </Heading>
              </VStack>

              <VStack align="start" spacing={6}>
                <Text fontSize="xl" fontWeight="medium" opacity={0.9}>
                  Access a global community of experts, premium learning paths, and powerful career-building tools.
                </Text>
                <HStack spacing={4}>
                  <Badge bg="whiteAlpha.300" color="white" px={3} py={1} rounded="full">Free Tier</Badge>
                  <Badge bg="whiteAlpha.300" color="white" px={3} py={1} rounded="full">Networking</Badge>
                  <Badge bg="whiteAlpha.300" color="white" px={3} py={1} rounded="full">Mentorship</Badge>
                </HStack>
              </VStack>
            </Flex>
          </Box>
        </Stack>
      </Flex>
    </Layout>
  );
};

export default SignupPage;


