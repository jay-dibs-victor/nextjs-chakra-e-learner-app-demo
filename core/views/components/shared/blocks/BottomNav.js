
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
  

  const BottomNavLinks = ({ brand, onClose, ...rest }) => {
    const data = [
        { text: "Home", href: "/" },
        {
          text: "About Us",
          href: "/about",
          
        },
        {
          text: "Work Force",
          href: "/workforce",
        
        },
        { text: "Elearning", href: "/elearning-accelerator" },
        
       
        { text: "Profile", href: "/users/profile" },
        { text: "Dashboard", href: "/users" },
        { text: "Courses/Programs", href: "/store" },
        { text: "More Pages", href: "#" },
        { text: "Career Oportunities", href: "/careers" },
        { text: "Login", href: "/signin" },
        { text: "Register", href: "signup" },
      ];
    
      const [currentContent, setCurrentContent] = useState(null);
    
      const handleItemClick = (content) => {
        setCurrentContent((prev) => (prev ? null : content));
      };
      const handleItemMouseOver = (content) => {
        if (content) {
          setCurrentContent(content);
        }
      };
      const handleItemMouseLeave = (content) => {
        if (content) {
          setCurrentContent(null);
        }
      };
    
      const renderItem = ({ item, drop = item.content, onMouseOver, onClick }) => (
        <Box w={{ base: "100%", md: "auto" }}>
          <Flex
            as="li"
            key={item.text}
            alignItems="center"
            textTransform="uppercase"
            fontWeight={700}
            fontSize="sm"
            onMouseOver={drop ? onMouseOver : () => {}}
            onClick={drop ? onClick : () => {}}
            w={{ base: "100%", md: "auto" }}
          >
            {drop ? (
              <Text py={{ base: 3, md: 2, lg: 3 }} px={{ base: 4, md: 2, lg: 3 }}>
                {item.text}
              </Text>
            ) : (
              <Link
                href={item.href}
                mute
                _hover={{ opacity: 0.6 }}
                _focus={{ outline: "none" }}
                display="block"
                width="100%"
                py={{ base: 3, md: 2, lg: 3 }}
                px={{ base: 4, md: 2, lg: 3 }}
                onClick={onClose}
              >
                {item.text}
              </Link>
            )}
    
            {drop && (
              <Icon fontSize="1.5rem">
                <BiChevronDown />
              </Icon>
            )}
          </Flex>
    
          {drop && currentContent && (
            <Flex flexDir="column" d={{ base: "flex", md: "none" }} pl={5}>
              {currentContent.list?.map((item) => (
                <Link
                  key={item.text}
                  href={item.href}
                  d="block"
                  p={3}
                  w="100%"
                  mute
                  _hover={{ opacity: 0.6 }}
                  _focus={{ outline: "none" }}
                  onClick={onClose}
                >
                  {item.text}
                </Link>
              ))}
            </Flex>
          )}
        </Box>
      );
    
      return (
        <Box py={2} shadow={{ md: "lg" }} {...rest}>
          <Container px={{ base: 0, md: 6 }} wider>
            <Flex
              flexDir={{ md: "column", lg: "row" }}
              alignItems={{ base: "stretch", md: "flex-start", lg: "center" }}
            >
              {brand && <Brand mr={5} mb={{ md: 3, lg: 0 }} w="140px" />}
    
              <Box as="nav" w="100%">
                <Flex
                  flexDir={{ base: "column", md: "row" }}
                  as="ul"
                  justifyContent={brand ? "flex-start" : "center"}
                  listStyleType="none"
                  w={{ base: "100%", md: "auto" }}
                >
                  {data.map((item) => (
                    <Fragment key={item.text}>
                      <Box
                        d={{ base: "block", md: "none" }}
                        flex={{ base: 1, md: 0 }}
                      >
                        {renderItem({
                          item,
                          drop: item.content && !item.content.handleFetchResource,
                          onClick: handleItemClick.bind(null, item.content),
                        })}
                      </Box>
                      <Box d={{ base: "none", md: "block" }}>
                        {renderItem({
                          item,
                          onMouseOver: handleItemMouseOver.bind(null, item.content),
                        })}
                      </Box>
                    </Fragment>
                  ))}
                </Flex>
              </Box>
            </Flex>
    
            <Box d={{ base: "none", md: "block" }}>
              {currentContent && (
                <BottomDropdownContent
                  content={currentContent}
                  onMouseOver={handleItemMouseOver}
                  onMouseLeave={handleItemMouseLeave}
                />
              )}
            </Box>
          </Container>
        </Box>
      );
    };
    
    const BottomDropdownContent = ({ content, onMouseOver, onMouseLeave }) => {
      const renderCards = () => (
        <Loader w="100%" h="103.98px" />
    
        // <Flex p={3}>
        //  <Box boxSize={20} border="1px"></Box>
        // <Box boxSize={20} border="1px"></Box>
        // <Box boxSize={20} border="1px"></Box>
        // <Box boxSize={20} border="1px"></Box>
        // </Flex>
      );
    
      return (
        <Flex
          onMouseOver={onMouseOver.bind(null, content)}
          onMouseLeave={onMouseLeave.bind(null, content)}
        >
          {content.list && (
            <Box
              w="100px"
              borderRight="1px"
              borderColor="gray.300"
              textAlign="right"
              p={3}
              fontSize="sm"
            >
              {content.list.map((item, index) => (
                <Link d="block" py={1} key={item.text} mute>
                  <Text>{item.text}</Text>
                </Link>
              ))}
            </Box>
          )}
    
          {renderCards()}
        </Flex>
      );
    };
    
  export default BottomNavLinks