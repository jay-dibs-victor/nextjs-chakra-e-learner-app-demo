import { 
  Box, 
  Flex, 
  HStack, 
  Button, 
  Link,
  Text,
  Avatar, 
  Menu, 
  MenuButton, 
  MenuList, 
  MenuItem, 
  useDisclosure, 
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { HiShoppingCart, HiDotsHorizontal, HiBell } from "react-icons/hi";
import useAuth from "hooks/useAuth";
import AuthModal from "../../../../shared/lib/Modals/AuthModal";

export const headerHeight = { base: 100, lg: 100 };

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { me, logout } = useAuth();
  const borderColor = useColorModeValue("gray.100", "gray.700");

  return (
    <Box
      h={`${headerHeight.base}px`}
      bg="white"
      borderBottom="1px solid"
      borderColor={borderColor}
      position="sticky"
      top={0}
      zIndex={1000}
      px={{ base: 6, lg: 12 }}
      w="full"
    >
      <Flex h="full" align="center" justify="space-between" maxW="1920px" mx="auto">
        {/* Logo */}
        <Box cursor="pointer">
          <Link href="/" _hover={{ textDecoration: "none" }}>
            <Text
              fontWeight="black"
              fontSize="xl"
              letterSpacing="tight"
              bgGradient="linear(to-r, blue.600, blue.400)"
              bgClip="text"
            >
              LMS Ecosystem
            </Text>
          </Link>
        </Box>

        {/* Navigation */}
        <HStack spacing={10} display={{ base: "none", xl: "flex" }}>
          <Link href="/courses" fontWeight="black" fontSize="sm" color="gray.600" _hover={{ color: "blue.600" }}>COURSES</Link>
          <Link href="/products" fontWeight="black" fontSize="sm" color="gray.600" _hover={{ color: "blue.600" }}>STORE</Link>
          <Link href="/about" fontWeight="black" fontSize="sm" color="gray.600" _hover={{ color: "blue.600" }}>ABOUT</Link>
          {me && <Link href="/users" fontWeight="black" fontSize="sm" color="gray.600" _hover={{ color: "blue.600" }}>DASHBOARD</Link>}
        </HStack>

        {/* Actions */}
        <HStack spacing={4}>
          {me ? (
            <HStack spacing={6}>
              <Icon as={HiBell} fontSize="xl" color="gray.400" cursor="pointer" _hover={{ color: "blue.500" }} />
              <Menu>
                <MenuButton as={Button} variant="ghost" rounded="2xl" p={1} leftIcon={<Avatar size="sm" name={me.firstName} src="/img/avatar.png" />}>
                  <Text fontWeight="black" fontSize="sm" ml={2}>{me.firstName}</Text>
                </MenuButton>
                <MenuList rounded="2xl" shadow="2xl" border="none" p={2}>
                  <MenuItem as={Link} href="/users" rounded="xl" fontWeight="bold">My Dashboard</MenuItem>
                  <MenuItem rounded="xl" fontWeight="bold">Settings</MenuItem>
                  <MenuItem onClick={logout} rounded="xl" fontWeight="bold" color="red.500">Logout</MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          ) : (
            <Button 
                colorScheme="blue" 
                rounded="2xl" 
                px={10} 
                h="54px" 
                fontWeight="black" 
                boxShadow="lg"
                _hover={{ transform: "translateY(-2px)", boxShadow: "xl" }}
                transition="all 0.3s"
                onClick={onOpen}
            >
              Sign In
            </Button>
          )}
          <Link href="/cart" _hover={{ textDecoration: "none" }}>
            <Button 
              variant="ghost" 
              rounded="2xl" 
              h="54px"
              leftIcon={<HiShoppingCart fontSize="20px" />}
              fontWeight="black"
            >
              Cart
            </Button>
          </Link>
        </HStack>
      </Flex>

      <AuthModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default Header;
