import { Heading, Link, Text } from "components/lib";
import useAuth from "hooks/useAuth";

const Brand = ({ ...rest }) => {
  const auth = useAuth();

  const href = auth.isAuthenticated ? "/store" : "/";

  return (
    <Heading type="h1" m={0} {...rest}>
      <Link href={href} mute>
        <Text type="md-bold" m={0}>
          Silver Dream
        </Text>
      </Link>
    </Heading>
  );
};

export default Brand;
