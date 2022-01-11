import {
    Flex,
    HStack,
    Box,

    Text,
    Icon,

  
  } from "@chakra-ui/react";
  import { TiWeatherCloudy } from "react-icons/ti";

  import {
    RiFacebookFill,
    RiTwitterFill,
    RiYoutubeFill,
    RiSearch2Line,
  } from "react-icons/ri";
  import dateFormat from "dateformat";
  import Brand from "./Brand";
  import { Link } from "./Link";
  import { Container } from "./Layout";

  
const CenteredLeft = () => (
    <Box pt={5}>
      <Container>
        <Flex justifyContent="space-between" alignItems="center">
          {/* <Flex alignItems="flex-end">
            <Icon fontSize="1.5rem">
              <TiWeatherCloudy />
            </Icon>
  
            <Text fontWeight={500} mx={1}>
              one link
              <sup>&#x2103;</sup>
            </Text>
  
            <Text>company</Text>
          </Flex> */}
  
          <Box textAlign="center" lineHeight="1">
            <Brand size="3xl" />
            {/* <Text>{dateFormat(Date.now(), "fullDate")}</Text> */}
          </Box>
  
          <HStack spacing={3}>
            <Link>
              <Icon fontSize="1.3rem">
                <RiFacebookFill />
              </Icon>
            </Link>
  
            <Link>
              <Icon fontSize="1.3rem">
                <RiTwitterFill />
              </Icon>
            </Link>
  
            <Link>
              <Icon fontSize="1.3rem">
                <RiYoutubeFill />
              </Icon>
            </Link>
  
            <Link>
              <Icon fontSize="1.3rem">
                <RiSearch2Line />
              </Icon>
            </Link>
          </HStack>
        </Flex>
  
        <Box borderBottom="1px" borderColor="gray.300" pt={5}></Box>
      </Container>
    </Box>
  );
  

  export default CenteredLeft 