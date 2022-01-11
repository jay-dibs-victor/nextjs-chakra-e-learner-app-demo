import {
    Flex,
    HStack,
    Box,
    forwardRef,
    Text,
    Icon,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Input,
    useDisclosure,
  } from "@chakra-ui/react";
  import { TiWeatherCloudy } from "react-icons/ti";
  import { BiChevronDown, BiSearch } from "react-icons/bi";
  import { GoThreeBars } from "react-icons/go";
  import {
    RiFacebookFill,
    RiTwitterFill,
    RiYoutubeFill,
    RiSearch2Line,
  } from "react-icons/ri";
  import dateFormat from "dateformat";
  import Brand from "./Brand";
  import { Link } from "./Link";
  import { getNews } from "utils/http";
  import { Fragment, useRef, useState } from "react";
  import { Container } from "./Layout";
  import { Loader } from "./Feedback";
  import { MdClose } from "react-icons/md";


import MobileNavigation from "./MobileNavigation"

export const MainHeading = ({ setMobileDrawerIsOpen, ...rest }) => {
    return (
      <Box as="header" {...rest}>
        <Box d={{ base: "none", md: "block" }}>
       
        </Box>
  
        <MobileNavigation setMobileDrawerIsOpen={setMobileDrawerIsOpen} />
      </Box>
    );
  };

  export default MainHeading