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
const initialFieldsProps = [
    {
      id: "firstName",
      label: "First name",
      placeholder: "First name",
    },
    {
      id: "lastName",
      label: "Last name",
      placeholder: "Last name",
    },
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
    {
      id: "confirmPassword",
      label: "Confirm password",
      placeholder: "Confirm your password",
      type: "password",
    },
  ];
  
  const doSubmit = async (fieldsObj, router) => {
    // compose the body data - Check for refCode in the query string
    const body = { ...fieldsObj, refCode: router.query.ref };
  
    // Request signup
    await http.post("/auth/signup", body);
  
    // redirect to `/signin` page
    return `/signup/verify?email=${fieldsObj.email}`;
  };
  
  const SignupPage = () => {
    const form = useForm({ doSubmit, initialFieldsProps });
  
    return (
      <Layout >
        <Form
          formData={form}
          toast={{
            title: "Account created.",
            description: "We've created your account for you.",
          }}
          headerText="Create your personal account"
          footerContent={
            <Flex alignItems="flex-end" justifyContent="space-between">
              <Flex>
                <Text color="brand.gray3" m={0} mr={2}>
                  I already have an account
                </Text>
  
                <Link href="/signin">
                  <Text color="brand.primary" m={0}>
                    Sign in
                  </Text>
                </Link>
              </Flex>
  
              {form.renderSubmitBtn({
                text: "Sign up",
                variant: "primary",
              })}
            </Flex>
          }
        />
      </Layout>
    );
  };
  
  export default SignupPage;
  