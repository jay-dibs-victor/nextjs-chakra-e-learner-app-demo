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
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { HiMail, HiLockClosed, HiUser } from "react-icons/hi";
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
    label: "Email",
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
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
      });
      router.push(`/signup/verify?email=${fieldsObj.email}`);
    } catch (err) {
      toast.displayToast({
        title: "Error",
        description: err.response?.data?.message || "Something went wrong",
        status: "error",
      });
    }
  };

  const form = useForm({ doSubmit, initialFieldsProps });

  return (
    <Layout>
      <Flex minH={"100vh"} align={"center"} justify={"center"} bg={useColorModeValue("gray.50", "gray.800")}>
        <Stack spacing={0} mx={"auto"} maxW={"lg"} py={12} px={6} direction={{ base: "column", md: "row" }} w="full" maxW="1200px" rounded="3xl" overflow="hidden" shadow="2xl">
          
          {/* Form Side */}
          <Box
            flex={1}
            bg={useColorModeValue("white", "gray.700")}
            p={{ base: 8, md: 12 }}
            position="relative"
            order={{ base: 2, md: 1 }}
          >
            <ScaleFade initialScale={0.9} in={true}>
              <Stack spacing={8}>
                <Stack align={"center"}>
                  <Heading fontSize={"3xl"} textAlign={"center"}>
                    Create your account
                  </Heading>
                  <Text fontSize={"lg"} color={"gray.600"}>
                    to start your journey with us 🚀
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
                    <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4}>
                      {initialFieldsProps.slice(0, 2).map((field) => (
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
                    </SimpleGrid>

                    {initialFieldsProps.slice(2).map((field) => (
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

                    <Stack spacing={10} pt={4}>
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
                        Sign up
                      </Button>
                    </Stack>
                    <Stack pt={6}>
                      <Text align={"center"}>
                        Already a user?{" "}
                        <Link href="/signin" passHref>
                          <ChakraLink color={"blue.400"}>Login</ChakraLink>
                        </Link>
                      </Text>
                    </Stack>
                  </Stack>
                </Box>
              </Stack>
            </ScaleFade>
          </Box>

          {/* Image Side */}
          <Box
            display={{ base: "none", md: "block" }}
            flex={1}
            bgImage="url('/img/auth-bg.png')"
            bgSize="cover"
            bgPosition="center"
            position="relative"
            order={{ base: 1, md: 2 }}
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
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Heading size="2xl" mb={4}>Join the Community</Heading>
                <Text fontSize="xl" opacity={0.9}>
                  Create your account today and get access to exclusive features and premium tools.
                </Text>
              </motion.div>
            </Flex>
          </Box>

        </Stack>
      </Flex>
    </Layout>
  );
};

export default SignupPage;

  