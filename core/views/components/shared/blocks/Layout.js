import { Box } from "@chakra-ui/react";
import Header, { SimpleHeader } from "./Header";
import Footer from "./Footer";
import { useInView } from "react-intersection-observer";
import usePageReady from "hooks/usePageReady";
import { useState } from "react";

const Layout = ({ children, footerProps }) => {
  const pageReady = usePageReady();
  const headerObserver = useInView({
    /* Optional options */
    threshold: 0,
  });
  const [mobileDrawerIsOpen, setMobileDrawerIsOpen] = useState(false);
  return (
    pageReady && (
      <Box>
        <Header
          ref={headerObserver.ref}
          setMobileDrawerIsOpen={setMobileDrawerIsOpen}
        />
        <Box as="main">
         
          {children}
        </Box>
        <Footer {...footerProps} />
      </Box>
    )
  );
};

export const Container = ({ children, wider, ...rest }) => (
  <Box
    mx="auto"
    maxW={wider ? 1600 : 1440}
    px={{ base: 3, sm: 4, md: 2, lg: 6 }}
    {...rest}
  >
    {children}
  </Box>
);

export default Layout;
