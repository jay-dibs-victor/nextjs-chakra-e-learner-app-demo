import {
  Box,
  forwardRef,

} from "@chakra-ui/react";




/*parent components of unit blocks*/
import TopBar from "./Topbar"
const Header = forwardRef(
  ({ setMobileDrawerIsOpen, breadcrumbPaths, ...rest }, ref) => {
    return (
      <Box as="header" mb={5} ref={ref} {...rest}>
        <Box d={{ base: "none", md: "block" }}>
            <TopBar/>
        </Box>
      </Box>
    );
  }
);





export default Header;
