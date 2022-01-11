
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

const MobileNavigation = ({ setMobileDrawerIsOpen, ...rest }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();
  
    const handleOpen = () => {
      setMobileDrawerIsOpen(true);
      setTimeout(onOpen, 150);
    };
  
    const handleClose = () => {
      setMobileDrawerIsOpen(false);
      onClose();
    };
  
    return (
      <Container
        d={{ base: "flex", md: "none" }}
        alignItems="center"
        justifyContent="space-between"
        shadow="md"
        py={2}
        {...rest}
      >
        <Brand />
  
        <HStack spacing={5}>
          <Icon fontSize="1.5rem">
            <BiSearch />
          </Icon>
  
          <Icon fontSize="1.5rem" ref={btnRef} onClick={handleOpen}>
            <GoThreeBars />
          </Icon>
  
          <Drawer
            isOpen={isOpen}
            placement="left"
            size="full"
            onClose={handleClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent bg="black" color="white">
              <DrawerBody pos="relative" px={0} pl={5} pt={"3.5rem"}>
                <Icon
                  fontSize="1.8rem"
                  onClick={handleClose}
                  pos="absolute"
                  top={5}
                  right={5}
                >
                  <MdClose />
                </Icon>
  
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </HStack>
      </Container>
    );
  };
  

  export default MobileNavigation