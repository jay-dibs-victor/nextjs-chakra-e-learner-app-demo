



import { LayoutAdmin, OrdersTableSection } from "components/components/pages";
import buildSEO from "utils/buildSEO";

const pageSEO = buildSEO("Order", "Description");

const OrdersPage = () => {
  return (
    <LayoutAdmin SEO={pageSEO} page="orders">
      <OrdersTableSection />
    </LayoutAdmin>
  );
};

export default OrdersPage;
