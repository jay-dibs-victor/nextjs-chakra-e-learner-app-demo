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



import TopBar  from "./Topbar";
import MainHeader  from  "./CenteredLogo";
import MobileNavigation from "./MobileNavigation";
import NavLinks from "./BottomNav"

const Header = forwardRef(
  ({ setMobileDrawerIsOpen, breadcrumbPaths, ...rest }, ref) => {
    return (
      <Box as="header" mb={5} ref={ref} {...rest}>
        <Box d={{ base: "none", md: "block" }}>
          <TopBar />
          <MainHeader/>
          <NavLinks/>
        </Box>

        <MobileNavigation setMobileDrawerIsOpen={setMobileDrawerIsOpen} />
      </Box>
    );
  }
);









export default Header;
