import {
    HStack,
    Box
  } from "@chakra-ui/react";  
import { Container } from "./Layout";
import { Link } from "./Link";
const TopBar = () => (
    <Box bg="black" fontSize="sm" color="white" py={2}>
      <Container d="flex" justifyContent="space-between">
        <HStack spacing={5}>
          <Link>Home</Link>
          <Link>About</Link>
          <Link>Contact us</Link>
          <Link>email: juwavictor@gmail.com</Link>
          <Link>+2348130870416</Link>
        </HStack>
        <Link href="/signin">Sign in / Join</Link>
      </Container>
    </Box>
  );

  
  export default TopBar