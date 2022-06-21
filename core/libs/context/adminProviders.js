import PropTypes from "prop-types";
import { DefaultSeo } from "next-seo";
// import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
// import store from "../redux/store";
// import SEO from "../next-seo.config";
import theme from "../../theme";
import AsideContext from "./AsideContext";
import useAside from "hooks/useAdminAside";

const SEO = {
  title: "LMS Ecosystem Admin",
  description: "Modernized LMS Ecosystem Admin",
};

function Providers({ children, store: storeProps }) {
  const aside = useAside();

  return (
    <ChakraProvider theme={theme}>
      <DefaultSeo
        {...SEO}
        additionalMetaTags={[
          {
            httpEquiv: "Content-Type",
            content: "text/html; charset=utf-8",
          },
        ]}
      />

      <AsideContext.Provider value={aside.store}>
        {children}
      </AsideContext.Provider>
    </ChakraProvider>
  );
}

Providers.propTypes = {
  children: PropTypes.element.isRequired,
  store: PropTypes.object,
};

export default Providers;
