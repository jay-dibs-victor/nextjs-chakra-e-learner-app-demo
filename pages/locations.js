import { Layout } from "components/components/pages";
import buildSEO from "utils/buildSEO";

const pageSEO = buildSEO(
  "Store Location",
  "Pace Maker is a unique job portal that ..."
);

const AboutPage = () => {
  return <Layout SEO={pageSEO}>
    <p>A better way to get hired</p>
  </Layout>;
};

export default AboutPage;
