import React, { useEffect } from "react";
import { useRouter } from "next/router";
import {
  Flex,
  Box,
  Stack,
  Heading,
  Text,
  Input,
  Button,
  Checkbox,
  Link as ChakraLink,
  useColorModeValue,
  Icon,
  InputGroup,
  InputLeftElement,
  VStack,
  ScaleFade,
  HStack,
  Badge,
  Divider,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { HiMail, HiLockClosed, HiArrowRight, HiSparkles } from "react-icons/hi";
import Link from "next/link";
import Layout from "components/shared/blocks/Layout";
import http from "utils/http";
import cookie from "utils/cookie";
import useForm from "hooks/useForm";
import useToast from "hooks/useToast";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const initialFieldsProps = [
  {
    id: "email",
    label: "Email Address",
    placeholder: "e.g. john@example.com",
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
];

const SignInPage = () => {
  const router = useRouter();
  const toast = useToast();

  const doSubmit = async (fieldsObj) => {
    try {
      const {
        data: { token },
      } = await http.post("/auth/signin", fieldsObj);

      cookie.setToken(token);
      toast.displayToast({
        title: "Welcome back!",
        description: "You've successfully signed in to your account.",
        status: "success",
      });
      router.push("/authenticated-check");
    } catch (err) {
      toast.displayToast({
        title: "Sign in failed",
        description: err.response?.data?.message || "Please check your credentials and try again.",
        status: "error",
      });
    }
  };

  const form = useForm({ doSubmit, initialFieldsProps });

  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const inputBg = useColorModeValue("gray.50", "gray.900");
  const inputFocusBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.100", "gray.700");

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
          borderColor={borderColor}
        >
          {/* Left: Branding & Content */}
          <Box
            display={{ base: "none", md: "block" }}
            flex={1.2}
            bgImage="url('/img/herolanding.jpg')"
            bgSize="cover"
            bgPosition="center"
            position="relative"
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
                  <Text fontWeight="black" letterSpacing="widest" fontSize="xs">PREMIUM ACCESS</Text>
                </HStack>
                <Heading size="3xl" fontWeight="black" letterSpacing="tight">
                  Start Your <Text as="span" color="blue.300">Transformation</Text>
                </Heading>
              </VStack>

              <VStack align="start" spacing={6}>
                <Text fontSize="xl" fontWeight="medium" opacity={0.9}>
                  Join over 1 million learners and professionals who are shaping the future with our advanced AI-driven platform.
                </Text>
                <HStack spacing={4}>
                  <Badge bg="whiteAlpha.300" color="white" px={3} py={1} rounded="full">LMS</Badge>
                  <Badge bg="whiteAlpha.300" color="white" px={3} py={1} rounded="full">Analytics</Badge>
                  <Badge bg="whiteAlpha.300" color="white" px={3} py={1} rounded="full">Certification</Badge>
                </HStack>
              </VStack>
            </Flex>
          </Box>

          {/* Right: Form */}
          <Box
            flex={1}
            p={{ base: 8, md: 16 }}
            position="relative"
            bg={cardBg}
          >
            <ScaleFade initialScale={0.95} in={true}>
              <VStack spacing={10} align="stretch">
                <VStack align="start" spacing={2}>
                  <Heading size="xl" fontWeight="black" letterSpacing="tight">
                    Welcome Back
                  </Heading>
                  <Text color={"gray.500"} fontSize="lg">
                    Enter your credentials to access your dashboard
                  </Text>
                </VStack>

                <Box
                  as="form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    form.handleSubmit(e);
                  }}
                >
                  <Stack spacing={6}>
                    {initialFieldsProps.map((field) => (
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
                            bg={inputBg}
                            borderWidth="2px"
                            borderColor="transparent"
                            fontSize="md"
                            _focus={{
                              bg: inputFocusBg,
                              borderColor: "blue.400",
                              shadow: "lg",
                            }}
                            name={field.id}
                            onChange={form.handleType}
                          />
                        </InputGroup>
                      </VStack>
                    ))}

                    <HStack justify="space-between" pt={2}>
                      <Checkbox colorScheme="blue" defaultChecked>
                        <Text fontSize="sm" color="gray.500">Remember me</Text>
                      </Checkbox>
                      <Link href="/forgot-password" passHref>
                        <ChakraLink color={"blue.500"} fontSize="sm" fontWeight="bold">
                          Forgot password?
                        </ChakraLink>
                      </Link>
                    </HStack>

                    <Button
                      type="submit"
                      size="lg"
                      colorScheme="blue"
                      h={16}
                      rounded="2xl"
                      fontSize="lg"
                      fontWeight="bold"
                      shadow="xl"
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
                      Sign In
                    </Button>

                    <Flex align="center" pt={4}>
                      <Divider />
                      <Text px={4} color="gray.400" fontSize="xs" fontWeight="bold" textTransform="uppercase">OR</Text>
                      <Divider />
                    </Flex>

                    <VStack spacing={4}>
                      <Text align={"center"} color="gray.500">
                        New to the platform?{" "}
                        <Link href="/signup" passHref>
                          <ChakraLink color={"blue.500"} fontWeight="black">
                            Create an account
                          </ChakraLink>
                        </Link>
                      </Text>
                    </VStack>
                  </Stack>
                </Box>
              </VStack>
            </ScaleFade>
          </Box>
        </Stack>
      </Flex>
    </Layout>
  );
};

export default SignInPage;


