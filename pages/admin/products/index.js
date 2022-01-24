import { LayoutAdmin, ProductsTableSection } from "components/pages";
import buildSEO from "utils/buildSEO";

const pageSEO = buildSEO("Products", "Description");

const ProductsPage = () => {
  return (
    <LayoutAdmin SEO={pageSEO} pageHeader="products" page="products">
      <ProductsTableSection />
    </LayoutAdmin>
  );
};

export default ProductsPage;
