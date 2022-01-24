



import { LayoutAdmin, CategoriesTableSection } from "components/components/pages";
import buildSEO from "utils/buildSEO";

const pageSEO = buildSEO("Categories", "Description");

const CategoriesPage = () => {
  return (
    <LayoutAdmin SEO={pageSEO} pageHeader="categories" page="categories">
      <CategoriesTableSection />
    </LayoutAdmin>
  );
};

export default CategoriesPage;
