import { Layout } from "components/components/pages";
import buildSEO from "utils/buildSEO";

const pageSEO = buildSEO(
  "Privacy Policy",
  "The Silver Dreams is a different market place."
);

const PrivacyPolicyPage = () => {
  return <Layout SEO={pageSEO}>
    <p>This should contain legal/policy-related content</p>
  </Layout>;
};

export default PrivacyPolicyPage;
