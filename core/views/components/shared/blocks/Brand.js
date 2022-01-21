import { Text } from "@chakra-ui/react";
import { Link } from "./Link";

const Brand = ({ size = "2xl", ...rest }) => {
  return (
    <Link mute>
      <Text
        fontWeight={{ base: 300, md: 200 }}
        fontFamily=" Times, 'Times New Roman', serif"
        fontSize={size}
        {...rest}
      >
        PACE MAKER
      </Text>
    </Link>
  );
};

export default Brand;
