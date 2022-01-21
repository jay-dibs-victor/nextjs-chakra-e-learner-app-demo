import PropTypes from "prop-types";
import { DefaultSeo } from "next-seo";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import store from "../redux/store";
import SEO from "../next-seo.config";
import theme from "../theme";
import CategoriesContext from "./CategoriesContext";
import useCategories from "hooks/useCategories";

function Providers({ children, store: storeProps }) {
  const categories = useCategories();

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

      <Provider store={storeProps || store}>
        <CategoriesContext.Provider value={categories.store}>
          {children}
        </CategoriesContext.Provider>
      </Provider>
    </ChakraProvider>
  );
}

Providers.propTypes = {
  children: PropTypes.element.isRequired,
  store: PropTypes.object,
};

export default Providers;
