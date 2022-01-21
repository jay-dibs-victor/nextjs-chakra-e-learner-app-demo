import React , { useState} from "react"
import { useRouter } from "next/router";
import { Flex } from "@chakra-ui/react";
import { Link, Text } from "components/shared/lib";
import { 
    Form, //Layout
 } from "../core/views/components/components/pages/Form/Form";

import Layout, { Container } from "components/shared/blocks/Layout";

import http from "utils/http";
import cookie from "utils/cookie";
import useForm from "hooks/useForm";


import {
    Box,
    Button,
 
    Grid,
    GridItem,
    Heading,
    HStack,
    Icon,
    Input,
    Stack,
    Center,
  
  } from "@chakra-ui/react";
  


const initialFieldsProps = [
  {
    id: "email",
    label: "Email",
    placeholder: "Email",
    type: "email",
  },
  {
    id: "password",
    label: "Password",
    placeholder: "Password",
    type: "password",
  },
];





const SignInPage = () => {
  const doSubmit = async (fieldsObj) => {
    // request a login
    const {
      data: {
        data: { token },
      },
    } = await http.post("/auth/signin", fieldsObj);

    // persist token to cookie
    cookie.setToken(token);

    // redirect to `<redirectPath>` by returning the `<redirectPath>`
    return "/signin/auth-check";
  };

  const form = useForm({ doSubmit, initialFieldsProps });

  return (
    <Layout>
     
     <Form
        formData={form}
        toast={{ description: "You've successfully Signed in." }}
        headerText="Sign in your personal account"
        footerContent={
          <>
            <Flex
              flexDir={{ base: "column", md: "row" }}
              justifyContent="space-between"
              alignItems="center"
              mb={3}
            >
              <Flex alignItems="center" mb={{ base: 5, md: 0 }}>
                <input type="checkbox" id="remember-me" />
                <Text as="label" htmlFor="remember-me" m={0} ml={2}>
                  Remember me
                </Text>
              </Flex>

              <Link href="/forgot-password">
                <Text color="brand.primary" m={0}>
                  I forgot my password
                </Text>
              </Link>
            </Flex>

            <Flex justifyContent="space-between" alignItems="flex-end">
              <Flex>
                <Text color="brand.gray3" m={0} mr={2}>
                  I don’t have an account
                </Text>

                <Link href="/signup">
                  <Text color="brand.primary" m={0}>
                    Sign up
                  </Text>
                </Link>
              </Flex>

              {form.renderSubmitBtn({
                text: "Sign in",
                variant: "primary",
              })}
            </Flex>
          </>
        }
      />
        
    </Layout>
  );
};

export default SignInPage;
