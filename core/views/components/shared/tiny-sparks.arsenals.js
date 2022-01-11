/*keep all unit building blocks in one arsenal*/
import {
    Box,
    Button,
    Flex,
    Grid,
    GridItem,
    Heading,
    HStack,
    Icon,
    Input,
    Stack,
    Text,
  } from "@chakra-ui/react";
  import { Image } from "components/Image";
  import Layout, { Container } from "components/Layout";
  import { Link } from "components/Link";
  import dateFormat from "dateformat";
  import { TiMediaPlay, TiSocialFacebook, TiSocialTwitter } from "react-icons/ti";
  import { GoThreeBars } from "react-icons/go";
  /*the world is yours: you can explore more options*/



/*export them as a single module*/
  export {
      /*chakra element building blocks*/
    Box,Button,Flex,Grid,GridItem,Heading,HStack,
    Icon,Input,Stack,Text,

    /*custom element bulding blocks*/
    Image,Layout,Container,Link, dateFormat, TiMediaPlay, 
    TiSocialFacebook,TiSocialTwitter ,GoThreeBars
  }