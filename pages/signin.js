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
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { HiMail, HiLockClosed } from "react-icons/hi";
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
    label: "Email",
    placeholder: "Email address",
    type: "email",
    icon: HiMail,
  },
  {
    id: "password",
    label: "Password",
    placeholder: "Password",
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
        data: {
          data: { token },
        },
      } = await http.post("/auth/signin", fieldsObj);

      cookie.setToken(token);
      toast.displayToast({
        title: "Success",
        description: "You've successfully signed in.",
        status: "success",
      });
      router.push("/signin/auth-check");
    } catch (err) {
      toast.displayToast({
        title: "Error",
        description: err.response?.data?.message || "Invalid credentials",
        status: "error",
      });
    }
  };

  const form = useForm({ doSubmit, initialFieldsProps });

  return (
    <Layout>
      <Flex minH={"100vh"} align={"center"} justify={"center"} bg={useColorModeValue("gray.50", "gray.800")}>
        <Stack spacing={0} mx={"auto"} maxW={"lg"} py={12} px={6} direction={{ base: "column", md: "row" }} w="full" rounded="3xl" overflow="hidden" shadow="2xl">
          {/* Image Side */}
          <Box
            display={{ base: "none", md: "block" }}
            flex={1}
            bgImage="url('/img/auth-bg.png')"
            bgSize="cover"
            bgPosition="center"
            position="relative"
          >
            <Flex
              pos="absolute"
              inset={0}
              bg="blackAlpha.400"
              direction="column"
              justify="center"
              p={12}
              color="white"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Heading size="2xl" mb={4}>Welcome Back</Heading>
                <Text fontSize="xl" opacity={0.9}>
                  Experience learning from a different perspective.
                </Text>
              </motion.div>
            </Flex>
          </Box>

          {/* Form Side */}
          <Box
            flex={1}
            bg={useColorModeValue("white", "gray.700")}
            p={{ base: 8, md: 12 }}
            position="relative"
          >
            <ScaleFade initialScale={0.9} in={true}>
              <Stack spacing={8}>
                <Stack align={"center"}>
                  <Heading fontSize={"3xl"} textAlign={"center"}>
                    Sign in to your account
                  </Heading>
                  <Text fontSize={"lg"} color={"gray.600"}>
                    to enjoy all of our cool <ChakraLink color={"blue.400"}>features</ChakraLink> ✌️
                  </Text>
                </Stack>
                <Box
                  as="form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    form.handleSubmit(e);
                  }}
                >
                  <Stack spacing={4}>
                    {initialFieldsProps.map((field) => (
                      <VStack align="start" key={field.id} spacing={1}>
                        <Text fontWeight="medium" fontSize="sm">{field.label}</Text>
                        <InputGroup>
                          <InputLeftElement pointerEvents="none">
                            <Icon as={field.icon} color="gray.400" />
                          </InputLeftElement>
                          <Input
                            type={field.type}
                            placeholder={field.placeholder}
                            rounded="lg"
                            bg={useColorModeValue("gray.50", "gray.800")}
                            border={0}
                            _focus={{
                              bg: "white",
                              ring: 2,
                              ringColor: "blue.400"
                            }}
                            name={field.id}
                            onChange={form.handleType}
                          />
                        </InputGroup>
                      </VStack>
                    ))}

                    <Stack spacing={10}>
                      <Stack
                        direction={{ base: "column", sm: "row" }}
                        align={"start"}
                        justify={"space-between"}
                      >
                        <Checkbox>Remember me</Checkbox>
                        <Link href="/forgot-password" passHref>
                          <ChakraLink color={"blue.400"}>Forgot password?</ChakraLink>
                        </Link>
                      </Stack>
                      <Button
                        type="submit"
                        bg={"blue.400"}
                        color={"white"}
                        rounded={"lg"}
                        _hover={{
                          bg: "blue.500",
                          transform: "translateY(-2px)",
                          boxShadow: "lg",
                        }}
                        _active={{
                          bg: "blue.600",
                        }}
                        isLoading={form.formSubmitState.isSubmitting}
                        transition="all 0.2s"
                      >
                        Sign in
                      </Button>
                    </Stack>
                    <Stack pt={6}>
                      <Text align={"center"}>
                        Don't have an account?{" "}
                        <Link href="/signup" passHref>
                          <ChakraLink color={"blue.400"}>Sign up</ChakraLink>
                        </Link>
                      </Text>
                    </Stack>
                  </Stack>
                </Box>
              </Stack>
            </ScaleFade>
          </Box>
        </Stack>
      </Flex>
    </Layout>
  );
};

export default SignInPage;

