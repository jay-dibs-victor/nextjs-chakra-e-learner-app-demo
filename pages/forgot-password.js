import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { HiMail, HiArrowLeft } from "react-icons/hi";
import Link from "next/link";
import Layout from "components/shared/blocks/Layout";
import http from "utils/http";
import useForm from "hooks/useForm";
import useToast from "hooks/useToast";
import buildSEO from "utils/buildSEO";

const pageSEO = buildSEO(
  "Forgot Password",
  "One easy click away to getting your dream job"
);

const initialFieldsProps = [
  {
    id: "email",
    label: "Email",
    placeholder: "Enter your email...",
    type: "email",
    icon: HiMail,
  },
];

const ForgotPasswordPage = () => {
  const router = useRouter();
  const toast = useToast();
  const [emailAddress, setEmailAddress] = useState("");

  const doSubmit = async (fieldsObj) => {
    try {
      await http.post("/auth/forgot-password", fieldsObj);
      setEmailAddress(fieldsObj.email);
      toast.displayToast({
        title: "Email sent.",
        description: "We've sent you a password reset link.",
        status: "success",
      });
    } catch (err) {
      toast.displayToast({
        title: "Error",
        description: err.response?.data?.message || "Something went wrong",
        status: "error",
      });
    }
  };

  const form = useForm({ doSubmit, initialFieldsProps });
  const inputBg = useColorModeValue("gray.50", "gray.800");

  return (
    <Layout SEO={pageSEO}>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
        bgImage="url('/img/auth-bg.png')"
        bgSize="cover"
        bgPosition="center"
      >
        <Box
          position="absolute"
          inset={0}
          bg={useColorModeValue("blackAlpha.400", "blackAlpha.700")}
          backdropFilter="blur(10px)"
        />
        
        <ScaleFade initialScale={0.9} in={true}>
          <Box
            maxW={"md"}
            w="full"
            bg={useColorModeValue("white", "gray.700")}
            rounded={"2xl"}
            boxShadow={"2xl"}
            p={8}
            position="relative"
            zIndex={1}
          >
            <Stack spacing={4}>
              <Stack align={"center"} mb={4}>
                <Heading fontSize={"2xl"}>Forgot your password?</Heading>
                <Text fontSize={"md"} color={"gray.600"} textAlign="center">
                  You&apos;ll get an email with a reset link shortly.
                </Text>
              </Stack>

              {form.formSubmitState.hasSubmitted ? (
                <VStack spacing={4} py={4}>
                  <Box p={4} bg="green.50" rounded="lg" color="green.600" w="full" textAlign="center">
                    <Text fontWeight="bold">Email Sent!</Text>
                    <Text fontSize="sm">Please check <b>{emailAddress}</b> for instructions.</Text>
                  </Box>
                  <Button
                    leftIcon={<HiArrowLeft />}
                    variant="ghost"
                    onClick={() => router.push("/signin")}
                  >
                    Back to Login
                  </Button>
                </VStack>
              ) : (
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
                            bg={inputBg}
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

                    <Stack spacing={6} pt={2}>
                      <Button
                        type="submit"
                        bg={"blue.400"}
                        color={"white"}
                        rounded={"lg"}
                        _hover={{
                          bg: "blue.500",
                        }}
                        isLoading={form.formSubmitState.isSubmitting}
                      >
                        Send Reset Link
                      </Button>
                      <Link href="/signin" passHref>
                        <Button
                          as="a"
                          variant="link"
                          colorScheme="blue"
                          size="sm"
                          leftIcon={<HiArrowLeft />}
                        >
                          Back to Login
                        </Button>
                      </Link>
                    </Stack>
                  </Stack>
                </Box>
              )}
            </Stack>
          </Box>
        </ScaleFade>
      </Flex>
    </Layout>
  );
};

export default ForgotPasswordPage;

  