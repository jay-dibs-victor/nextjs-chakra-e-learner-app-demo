import { Text } from "@chakra-ui/react";
import { Link } from "./Link";

const Brand = ({ size = "2xl", ...rest }) => {
  return (
    <Link mute>
      <Text
        fontWeight="black"
        fontSize={size}
        letterSpacing="tight"
        bgGradient="linear(to-r, blue.600, blue.400)"
        bgClip="text"
        {...rest}
      >
        LMS Ecosystem
      </Text>
    </Link>
  );
};

export default Brand;
