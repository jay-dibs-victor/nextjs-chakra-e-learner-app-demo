import { Component, useEffect, useState } from "react";
import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import { Skeleton } from "@chakra-ui/skeleton";
// import { Slider } from "react-rapid-carousel";
import { Swiper, SwiperSlide } from "swiper/react";
import { AiOutlineRight } from "react-icons/ai";
import { Heading, Button, ProductBoxedCard, Link } from "components/shared/lib/";
import { Section, SomethingWentWrong } from "components/components/pages";
import http from "utils/http";
import useCart from "hooks/useCart";

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation } from "swiper/core";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

/**
 * Higher Order Component - implement with `currying`
 * @param {Component} Card
 *
 * @example
 * const props = {
 *  // make sure your <MyCard /> component is making use of each `object` in the `data`array
 *  data: [{forExample: "anything"}, {forExample: "card 2"}],
 *  header: "The best offers",
 *  // handler for `see all` button click
 *  onHeaderSeeAllClick: () => // do anything
 * }
 * Cards(MyCard)(props)
 */
const Cards = ({ cart, sm, data, headerText, onFetch, seeAllLink }) => {
  const renderedLoader = data === "loading" && (
    <SimpleGrid columns={{ base: 2, md: 4, lg: 6 }} spacing={6}>
      {[...Array(6)].map((_, i) => (
        <Box key={i} bg="white" p={4} rounded="2xl" shadow="sm" border="1px solid" borderColor="gray.100">
           <Skeleton height="200px" rounded="xl" mb={4} />
           <Skeleton height="20px" w="70%" mb={2} />
           <Skeleton height="15px" w="40%" />
        </Box>
      ))}
    </SimpleGrid>
  );

  const renderSwiper = ({ spaceBetween, slidesPerView }) => (
    <Swiper
      navigation={true}
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
    >
      {data.map((card, index) => (
        <SwiperSlide key={index}>
          <ProductBoxedCard sm={sm} data={card} cart={cart} my={4} />
        </SwiperSlide>
      ))}
    </Swiper>
  );

  const renderedCarousel = Array.isArray(data) && (
    <>
      {/* Mobile */}
      <Box d={{ base: "block", md: "none" }}>
        {renderSwiper({ spaceBetween: 1, slidesPerView: 2 })}
      </Box>

      {/* Tab */}
      <Box d={{ base: "none", md: "block", lg: "none" }}>
        {renderSwiper({ spaceBetween: 1, slidesPerView: 4 })}
      </Box>

      {/* Desktop */}
      <Box d={{ base: "none", lg: "block", xl: "none" }}>
        {renderSwiper({ spaceBetween: 1, slidesPerView: 5 })}
      </Box>

      {/* Large Desktop */}
      <Box d={{ base: "none", xl: "block" }}>
        {renderSwiper({ spaceBetween: 3, slidesPerView: 6 })}
      </Box>
    </>
  );

  return (
    <Box bg="brand.white" rounded="md">
      <Flex alignItems="center" justifyContent="space-between" mb={2} p={2}>
        <Heading type="h6" as="h3" m={0}>
          {headerText}
        </Heading>

        {seeAllLink && (
          <Link mute href={seeAllLink}>
            <Button rightIcon={<AiOutlineRight />} sm>
              See all
            </Button>
          </Link>
        )}
      </Flex>

      {renderedLoader}

      {renderedCarousel}

      {data === null && <SomethingWentWrong onRetry={onFetch} h="150px" />}
    </Box>
  );
};

export const ProductCards = ({
  title = "The Best Price Offers",
  link = "/products",
  seeAllLink,
  sm,
  ...rest
}) => {
  const [products, setProducts] = useState("loading");
  const cart = useCart();

  const fetchProducts = async () => {
    setProducts("loading");

    try {
      const {
        data: {
          data: { docs },
        },
      } = await http.get(
        link,
        // Timeout the request in 1.5 min
        { timeout: 1.5 * (60 * 1000) }
      );

      const products = docs.map((product) => ({
        ...product,
        title: product.name,
        ratings: 1,
      }));

      setProducts(products);
    } catch (err) {
      console.warn("Product fetch failed, using mock data fallback.");
      // Mock data fallback for high-fidelity demonstration
      const mockProducts = [
        { id: 1, title: "Full-Stack Web Development", price: 85000, image: "/img/coding.png", ratings: 5 },
        { id: 2, title: "Advanced Digital Marketing", price: 65000, image: "/img/marketing.png", ratings: 4 },
        { id: 3, title: "Mastering UI/UX Design", price: 75000, image: "/img/design.png", ratings: 5 },
        { id: 4, title: "Python for Data Science", price: 90000, image: "/img/coding.png", ratings: 5 },
        { id: 5, title: "Social Media Strategy", price: 45000, image: "/img/marketing.png", ratings: 4 },
        { id: 6, title: "Interaction Design Pro", price: 70000, image: "/img/design.png", ratings: 5 },
      ];
      
      // Simulate loading delay to show skeletons
      setTimeout(() => {
        setProducts(mockProducts);
      }, 2000);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const cardProps = {
    data: products,
    headerText: title,
    cart,
    sm,
    onFetch: fetchProducts,
    seeAllLink,
  };

  return (
    <Section {...rest}>
      <Cards {...cardProps} />
    </Section>
  );
  // return <Section {...rest}>products :)</Section>;
};

export const RecentlyViewed = ({ ...rest }) => (
  <ProductCards
    title="Recently Viewed"
    // link="/me/product-views"
    {...rest}
  />
);
