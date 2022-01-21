
//import Layout, { Container } from "components/shared/blocks/Layout";

/*authenticated pages layout*/
import {
    Layout,
    Form,
    EmailError,
    EmailLoader,
    Section,
    EmailSuccess,
  } from "components/components/pages";
  import { Link, Text } from "components/shared/lib";
  import { Box, Flex } from "@chakra-ui/react";
  import useForm from "hooks/useForm";
  import buildSEO from "utils/buildSEO";
  import http from "utils/http";
  import { useRouter } from "next/router";
  import { useState } from "react";
  
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
    },
  ];
  
  const Wrapper = ({ children }) => (
    <Section px={6} py={20} pb="195px">
      <Box
        maxW="450px"
        mx="auto"
        borderRadius="0.5rem"
        border="1px"
        borderColor="brand.gray5"
        bg="brand.white"
        p={5}
        position="relative"
      >
        {children}
      </Box>
    </Section>
  );
  
  const ForgotPasswordPage = () => {
    const [emailAddress, setEmailAddress] = useState("");
    const router = useRouter();
  
    const doSubmit = async (fieldsObj) => {
      await http.post("/auth/forgot-password", fieldsObj);
  
      setEmailAddress(fieldsObj.email);
      // Check for refCode in the query string
      // if available Add the the req.body
    };
  
    const form = useForm({ doSubmit, initialFieldsProps });
  
    const handleRetry = () => {
      router.reload();
    };
  
    return (
      <Layout SEO={pageSEO}>
        <Text>WOW I NO LONGER USE BOOTSTRAP TO MAKE NICE PAGES OR JUST REACT.. I USE NEXT JS A BIG BROTHER OF REACT</Text>
      </Layout>
    );
  };
  
  export default ForgotPasswordPage;
  