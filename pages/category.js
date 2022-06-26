import { ButtonGroup } from "@chakra-ui/button";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Stack,
  VStack,
  HStack,
  Divider,
  useColorModeValue,
  Container,
  Icon,
  Badge,
  Circle,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import {
  Accordion,
  Button,
  Dropdown,
  DropdownContent,
  Heading,
  IconButton,
  Ratings,
  Text,
  TextField,
  ProductListCard,
  ProductBoxedCard,
  Modal,
  Pagination,
} from "components/shared/lib";
import {
  headerHeight,
  Layout,
  Loader,
  Section,
  SomethingWentWrong,
} from "components/components/pages";
import useCart from "hooks/useCart";
import useCategories from "hooks/useCategories";
import usePagination from "hooks/usePagination";
import useToast from "hooks/useToast";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { BiCaretDown, BiSort, BiFilterAlt } from "react-icons/bi";
import { BsGridFill } from "react-icons/bs";
import { ImList } from "react-icons/im";
import { IoFilterOutline } from "react-icons/io5";
import { HiCheckCircle, HiStar } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import buildSEO from "utils/buildSEO";
import createRange from "utils/createRange";
import http from "utils/http";

const pageSEO = buildSEO("Explore Collections", "Browse our curated selection of premium products across all categories");

const MotionGridItem = motion(GridItem);
const MotionBox = motion(Box);

const Aside = ({
  router,
  category,
  onCloseModal,
  fetchProducts,
  priceFromValue,
  setPriceFromValue,
  priceToValue,
  setPriceToValue,
  rating,
  setRating,
}) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.100", "gray.700");
  const hoverBg = useColorModeValue("gray.100", "gray.700");
  const accordionHoverBg = useColorModeValue("gray.50", "gray.700");

  const CategoryContent = () => {
    const handleCategoryChange = (queryString) => {
      router.replace(`category?${queryString}`);
      onCloseModal?.();
    };

    const getActiveControl = (condition) =>
      condition
        ? { color: "blue.500", bg: "blue.50", fontWeight: "bold" }
        : { color: "gray.500" };

    const controlProps = (condition, queryString) => ({
      ...getActiveControl(condition),
      onClick: handleCategoryChange.bind(null, queryString),
      _hover: { bg: hoverBg, color: "blue.500" },
      as: "button",
      w: "full",
      textAlign: "left",
      py: 2.5,
      px: 4,
      rounded: "xl",
      transition: "all 0.2s",
      fontSize: "sm",
    });

    return (
      <VStack align="start" py={4} spacing={1}>
        <Text {...controlProps(!router.query.subCategory, category.queryString)}>
          All {category.name || "Products"}
        </Text>

        {category.subCategories.map((subCategory) => (
          <HStack key={subCategory.id} w="full" spacing={0}>
             <Text {...controlProps(router.query.subCategory === subCategory.slug, subCategory.queryString)}>
              {subCategory.name}
            </Text>
          </HStack>
        ))}
      </VStack>
    );
  };

  const PriceContent = () => {
    const [values, setValues] = useState({
      to: `${priceToValue}`,
      from: `${priceFromValue}`,
    });

    const handleType = ({ target: { value, id } }) => {
      setValues((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      setPriceToValue(values.to);
      setPriceFromValue(values.from);
      setTimeout(() => fetchProducts(), 0);
      onCloseModal?.();
    };

    return (
      <Box as="form" onSubmit={handleSubmit} py={6} px={4}>
        <VStack spacing={4}>
          <HStack spacing={2} w="full">
            <TextField
              label="From"
              id="from"
              value={values.from}
              onChange={handleType}
              type="number"
              variant="filled"
              rounded="xl"
            />
            <TextField
              label="To"
              id="to"
              value={values.to}
              onChange={handleType}
              type="number"
              variant="filled"
              rounded="xl"
            />
          </HStack>
          <Button size="md" colorScheme="blue" w="full" type="submit" rounded="full" shadow="lg">
            Apply Price
          </Button>
        </VStack>
      </Box>
    );
  };

  const RatingsContent = () => {
    const ratings = [{ value: 4 }, { value: 3 }, { value: 2 }, { value: 1 }];
    const handleRatingChange = (rating) => setRating(+rating);

    const handleSubmit = (e) => {
      e.preventDefault();
      fetchProducts();
      onCloseModal?.();
    };

    return (
      <Box as="form" onSubmit={handleSubmit} py={6} px={4}>
        <RadioGroup onChange={handleRatingChange} value={rating} colorScheme="blue">
          <Stack spacing={4}>
            {ratings.map((rating) => (
              <Radio value={rating.value} key={rating.value} size="lg">
                <HStack spacing={3}>
                  <Ratings color="orange.400" value={rating.value} sm />
                  <Text fontSize="sm" fontWeight="medium" color="gray.600">& Up</Text>
                </HStack>
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
        <Button size="md" colorScheme="blue" w="full" mt={8} type="submit" rounded="full" shadow="lg">
          Apply Filter
        </Button>
      </Box>
    );
  };

  const asideList = category && [
    { header: "Categories", content: <CategoryContent /> },
    { header: "Price Range", content: <PriceContent /> },
    { header: "Customer Ratings", content: <RatingsContent /> },
  ];

  return (
    <Box
      flexShrink={0}
      w={{ base: "full", md: "280px" }}
      bg={bgColor}
      rounded="2xl"
      shadow="xl"
      borderWidth="1px"
      borderColor={borderColor}
      overflow="hidden"
      position="sticky"
      top={headerHeight + 24}
    >
      {category && (
        <Accordion
          data={asideList}
          allowMultiple
          defaultIndex={[0, 1, 2]}
          headerProps={{
            fontSize: "xs",
            fontWeight: "black",
            textTransform: "uppercase",
            letterSpacing: "2px",
            py: 5,
            px: 6,
            _hover: { bg: accordionHoverBg },
          }}
        />
      )}
    </Box>
  );
};

const LayoutProductCards = ({ products, cart, layout, onPageChange, page }) => {
  return (
    <Box pb={12}>
      <AnimatePresence mode="popLayout">
        <Grid
          py={6}
          gap={8}
          templateColumns={
            layout === "grid"
              ? {
                  base: "1fr",
                  sm: "1fr 1fr",
                  lg: "1fr 1fr 1fr",
                  xl: "1fr 1fr 1fr",
                }
              : "1fr"
          }
        >
          {products.map((product, idx) => (
            <MotionGridItem
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: idx * 0.05, ease: "easeOut" }}
            >
              {layout === "grid" ? (
                <ProductBoxedCard data={product} cart={cart} w="full" />
              ) : (
                <ProductListCard data={product} cart={cart} />
              )}
            </MotionGridItem>
          ))}
        </Grid>
      </AnimatePresence>
      
      {products.length > 0 && (
        <Flex justify="center" mt={12} pt={8} borderTop="1px solid" borderColor="gray.100">
          <Pagination
            page={page}
            onPageChange={onPageChange}
            itemTotal={products.length}
            pageTotal={1}
          />
        </Flex>
      )}
    </Box>
  );
};

const MainArea = ({
  title = "Explore Products",
  products,
  children,
  sortBy,
  setSortBy,
  fetchProducts,
  onPageChange,
  page,
}) => {
  const cart = useCart();
  const [currentLayoutStyle, setCurrentLayoutStyle] = useState("grid");
  const dropdownBg = useColorModeValue("white", "gray.800");

  const handleSortBy = (text) => {
    setSortBy(text);
    setTimeout(() => fetchProducts(), 0);
  };

  const sortByDropdownList = [
    { text: "Latest Arrivals", onClick: handleSortBy.bind(null, "Latest") },
    { text: "Price: Low to High", onClick: handleSortBy.bind(null, "Price: low to high") },
    { text: "Price: High to Low", onClick: handleSortBy.bind(null, "Price: high to low") },
  ];

  return (
    <Box flex={1} ml={{ base: 0, md: 10 }}>
      <Flex
        justify="space-between"
        align="center"
        mb={8}
        flexDir={{ base: "column", sm: "row" }}
        gap={6}
      >
        <VStack align="start" spacing={1}>
          <Heading size="xl" fontWeight="black" letterSpacing="tight">
            {title}
          </Heading>
          <HStack color="gray.500" fontSize="sm">
            <Icon as={HiCheckCircle} color="green.400" />
            <Text>
              Showing <Text as="span" fontWeight="bold" color="blue.500">{products.total || 0}</Text> premium products
            </Text>
          </HStack>
        </VStack>

        <HStack spacing={3}>
          <Box display={{ base: "block", md: "none" }}>{children}</Box>
          <Dropdown
            renderTrigger={({ onClick }) => (
              <Button
                variant="ghost"
                size="md"
                leftIcon={<BiSort />}
                rightIcon={<BiCaretDown />}
                onClick={onClick}
                rounded="full"
                borderWidth="1px"
                bg={dropdownBg}
              >
                Sort By: <Text as="span" ml={1} color="blue.500" fontWeight="bold">{sortBy}</Text>
              </Button>
            )}
          >
            <DropdownContent list={sortByDropdownList} />
          </Dropdown>

          <ButtonGroup isAttached size="md" variant="outline" rounded="full" bg={dropdownBg}>
            <IconButton
              aria-label="Grid View"
              icon={<BsGridFill />}
              isActive={currentLayoutStyle === "grid"}
              onClick={() => setCurrentLayoutStyle("grid")}
              roundedLeft="full"
            />
            <IconButton
              aria-label="List View"
              icon={<ImList />}
              isActive={currentLayoutStyle === "list"}
              onClick={() => setCurrentLayoutStyle("list")}
              roundedRight="full"
            />
          </ButtonGroup>
        </HStack>
      </Flex>

      <Divider mb={10} borderColor="gray.200" />

      {products.loading ? (
        <Loader h="500px" />
      ) : products.error ? (
        <SomethingWentWrong h="500px" onRetry={fetchProducts} />
      ) : products.total === 0 ? (
        <VStack h="500px" justify="center" spacing={6} bg="gray.50" rounded="3xl" border="2px dashed" borderColor="gray.200">
           <Circle size="20" bg="white" shadow="lg">
             <Icon as={BiFilterAlt} w={10} h={10} color="blue.500" />
           </Circle>
           <VStack spacing={2}>
             <Heading size="md">No products found</Heading>
             <Text color="gray.500">Try adjusting your filters or search criteria</Text>
           </VStack>
           <Button variant="outline" colorScheme="blue" rounded="full" onClick={() => window.location.reload()}>
             Clear All Filters
           </Button>
        </VStack>
      ) : (
        <LayoutProductCards
          products={products.data}
          cart={cart}
          layout={currentLayoutStyle}
          onPageChange={onPageChange}
          page={page}
        />
      )}
    </Box>
  );
};

const CategoriesPage = () => {
  const router = useRouter();
  const toast = useToast();

  const [priceFromValue, setPriceFromValue] = useState(100);
  const [priceToValue, setPriceToValue] = useState(50000);
  const [rating, setRating] = useState(1);
  const [sortBy, setSortBy] = useState("Latest");

  useEffect(() => {
    const ls_data = localStorage.getItem && JSON.parse(localStorage.getItem("category-page"));
    if (ls_data) {
      if (ls_data.minPrice) setPriceFromValue(ls_data.minPrice);
      if (ls_data.maxPrice) setPriceToValue(ls_data.maxPrice);
      if (ls_data.minRating) setRating(ls_data.minRating);
      if (ls_data.sortBy) setSortBy(ls_data.sortBy);
    }
  }, []);

  useEffect(() => {
    if (router.query.category) {
      const queries = [
        { key: "sub-category", value: router.query.subCategory },
        { key: "minPrice", value: priceFromValue },
        { key: "maxPrice", value: priceToValue },
        { key: "minRating", value: rating },
        { key: "sortBy", value: sortBy },
      ];

      let ls_data = {};
      const queryString = queries.reduce((prev, query, index) => {
        if (query.value) {
          ls_data = { ...ls_data, [query.key]: query.value };
          return prev + `${query.key}=${`${query.value}`.replace(/\s/g, "-")}${index < queries.length - 1 ? "&" : ""}`;
        }
        return prev;
      }, "");

      const path = `/category?category=${router.query.category}&${queryString}`;
      localStorage.setItem("category-page", JSON.stringify(ls_data));
      router.replace(path, undefined, { shallow: true });
    }
  }, [priceFromValue, priceToValue, rating, sortBy, router.query.category, router.query.subCategory, router]);

  const pagination = usePagination();

  const fetchProducts = useCallback(async () => {
    setProducts(null);
    try {
      const { data: { data } } = await http.get(
        `/products/?category=${router.query.subCategory || router.query.category}&page=${pagination.page}&price[gte]=${priceFromValue}&price[lte]=${priceToValue}&rating[gte]=${rating}&rating[lte]=5&sortBy=${sortBy}`
      );

      const products = {
        data: data.docs.map((product) => ({
          ...product,
          title: product.name,
          ratings: 1,
        })),
        limit: data.limit,
        page: data.page,
        pages: data.pages,
        total: data.total,
      };
      setProducts(products);
    } catch (err) {
      toast.displayToast({ description: err.message });
      setProducts(0);
    }
  }, [router.query.category, router.query.subCategory, pagination.page, priceFromValue, priceToValue, rating, sortBy, toast]);

  const categories = useCategories();
  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);

  useEffect(() => {
    if (categories.data) {
      const cat = categories.data.find((c) => c.slug === router.query.category);
      setCategory(cat);
    }
  }, [categories.data, router.query.category]);

  useEffect(() => {
    if (category && router.query.subCategory) {
      const subCat = category.subCategories.find((s) => s.slug === router.query.subCategory);
      setSubCategory(subCat);
    } else {
      setSubCategory(null);
    }
  }, [category, router.query.subCategory]);

  useEffect(() => {
    if (router.query.subCategory || router.query.category) {
      fetchProducts();
    }
  }, [fetchProducts, router.query.category, router.query.subCategory]);

  const [products, setProducts] = useState(null);
  const mainAreaTitle = subCategory ? subCategory.name : category?.name;

  const breadcrumb = subCategory
    ? [
        { text: category?.name, link: `category?${category.queryString}` },
        { text: subCategory.name },
      ]
    : [{ text: category?.name }];

  const renderAside = (props) => (
    <Aside
      router={router}
      category={category}
      fetchProducts={fetchProducts}
      priceFromValue={priceFromValue}
      setPriceFromValue={setPriceFromValue}
      priceToValue={priceToValue}
      setPriceToValue={setPriceToValue}
      rating={rating}
      setRating={setRating}
      {...props}
    />
  );

  return (
    <Layout SEO={pageSEO} breadcrumb={breadcrumb} bg={useColorModeValue("gray.50", "gray.900")}>
      <Section pt={12} pb={24}>
        <Container maxW="container.xl">
          {categories.loading ? (
            <Loader />
          ) : categories.error ? (
            <SomethingWentWrong />
          ) : (
            category && (
              <Flex alignItems="flex-start" flexDir={{ base: "column", md: "row" }}>
                <Box display={{ base: "none", md: "block" }}>{renderAside()}</Box>
                <MainArea
                  products={{
                    ...(products ? products : {}),
                    loading: products === null,
                    error: products === 0,
                  }}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  fetchProducts={fetchProducts}
                  title={mainAreaTitle}
                  onPageChange={pagination.handlePageChange}
                  page={pagination.page}
                >
                  <Box display={{ base: "block", md: "none" }} mr={2}>
                    <Modal
                      bodyProps={{ px: 0, pt: 10 }}
                      renderTrigger={({ handleOpen }) => (
                        <Button
                          variant="outline"
                          size="md"
                          leftIcon={<IoFilterOutline />}
                          rightIcon={<BiCaretDown />}
                          onClick={handleOpen}
                          rounded="full"
                          bg="white"
                          shadow="md"
                        >
                          Filters & Sorting
                        </Button>
                      )}
                    >
                      {({ handleClose }) => renderAside({ onCloseModal: handleClose })}
                    </Modal>
                  </Box>
                </MainArea>
              </Flex>
            )
          )}
        </Container>
      </Section>
    </Layout>
  );
};

export default CategoriesPage;


