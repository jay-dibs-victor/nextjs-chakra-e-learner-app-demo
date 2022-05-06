import { ButtonGroup } from "@chakra-ui/button";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  ListItem,
  Stack,
  UnorderedList,
  VStack,
  HStack,
  Divider,
  useColorModeValue,
  Container,
  ScaleFade,
} from "@chakra-ui/react";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/slider";
import {
  Accordion,
  Button,
  Dropdown,
  DropdownContent,
  Heading,
  IconButton,
  ProductCards,
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
import { motion, AnimatePresence } from "framer-motion";
import buildSEO from "utils/buildSEO";
import createRange from "utils/createRange";
import http from "utils/http";

const pageSEO = buildSEO("Categories", "Description ...");

const MotionGridItem = motion(GridItem);

const Aside = ({
  router,
  category,
  defaultIndex,
  onCloseModal,
  fetchProducts,

  priceFromValue,
  setPriceFromValue,
  priceToValue,
  setPriceToValue,
  rating,
  setRating,
}) => {
  const bgColor = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const CategoryContent = () => {
    const handleCategoryChange = (queryString) => {
      router.replace(`category?${queryString}`);
      onCloseModal?.();
    };

    const getActiveControl = (condition) =>
      condition
        ? { color: "blue.500", bg: "blue.50", fontWeight: "bold" }
        : {};

    const controlProps = (condition, queryString) => ({
      ...getActiveControl(condition),
      onClick: handleCategoryChange.bind(null, queryString),
      _hover: { bg: useColorModeValue("gray.100", "gray.600") },
      as: "button",
      w: "full",
      textAlign: "left",
      py: 2,
      px: 4,
      rounded: "md",
      transition: "all 0.2s",
    });

    return (
      <VStack align="start" py={4} spacing={1}>
        <Text
          {...controlProps(!router.query.subCategory, category.queryString)}
          fontSize="sm"
          textTransform="capitalize"
        >
          All {category.name || "Products"}
        </Text>

        {category.subCategories.map((subCategory) => (
          <Text
            {...controlProps(
              router.query.subCategory === subCategory.slug,
              subCategory.queryString
            )}
            key={subCategory.id}
            fontSize="sm"
            textTransform="capitalize"
          >
            {subCategory.name}
          </Text>
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
      <Box as="form" onSubmit={handleSubmit} py={4} px={4}>
        <HStack spacing={2} mb={4}>
          <TextField
            label="From"
            id="from"
            value={values.from}
            onChange={handleType}
            type="number"
            variant="filled"
          />
          <TextField
            label="To"
            id="to"
            value={values.to}
            onChange={handleType}
            type="number"
            variant="filled"
          />
        </HStack>
        <Button size="sm" colorScheme="blue" w="full" type="submit">
          Apply Price
        </Button>
      </Box>
    );
  };

  const RatingsContent = () => {
    const ratings = [{ value: 4 }, { value: 3 }, { value: 2 }, { value: 1 }];

    const handleRatingChange = (rating) => {
      setRating(+rating);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      fetchProducts();
      onCloseModal?.();
    };

    return (
      <Box as="form" onSubmit={handleSubmit} py={4} px={4}>
        <RadioGroup
          onChange={handleRatingChange}
          value={rating}
          colorScheme="blue"
        >
          <Stack spacing={3}>
            {ratings.map((rating) => (
              <Radio value={rating.value} key={rating.value}>
                <HStack>
                  <Ratings color="orange.400" value={rating.value} sm />
                  <Text fontSize="sm" color="gray.500">& Up</Text>
                </HStack>
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
        <Button size="sm" colorScheme="blue" w="full" mt={6} type="submit">
          Apply Filter
        </Button>
      </Box>
    );
  };

  const asideList = category && [
    {
      header: "Category",
      content: <CategoryContent />,
    },
    {
      header: "Price Range",
      content: <PriceContent />,
    },
    {
      header: "Ratings",
      content: <RatingsContent />,
    },
  ];

  return (
    <Box
      flexShrink={0}
      w={{ base: "full", md: "250px" }}
      bg={bgColor}
      rounded="xl"
      shadow="sm"
      borderWidth="1px"
      borderColor={borderColor}
      overflow="hidden"
      position="sticky"
      top={headerHeight + 20}
    >
      {category && (
        <Accordion
          data={asideList}
          allowMultiple
          defaultIndex={[0, 1, 2]}
          headerProps={{
            fontSize: "xs",
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "wider",
            py: 4,
            px: 4,
            _hover: { bg: useColorModeValue("gray.50", "gray.600") },
          }}
        />
      )}
    </Box>
  );
};

const LayoutProductCards = ({ products, cart, layout, onPageChange, page }) => {
  return (
    <Box pb={10}>
      <AnimatePresence mode="popLayout">
        <Grid
          py={5}
          gap={6}
          templateColumns={
            layout === "grid"
              ? {
                  base: "1fr",
                  sm: "1fr 1fr",
                  lg: "1fr 1fr 1fr",
                  xl: "1fr 1fr 1fr 1fr",
                }
              : "1fr"
          }
        >
          {products.map((product, idx) => (
            <MotionGridItem
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
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
      <Flex justify="center" mt={10}>
        <Pagination
          page={page}
          onPageChange={onPageChange}
          itemTotal={products.length}
          pageTotal={1}
        />
      </Flex>
    </Box>
  );
};

const MainArea = ({
  title = "Products",
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

  const handleSortBy = (text) => {
    setSortBy(text);
    setTimeout(() => fetchProducts(), 0);
  };

  const sortByDropdownList = [
    { text: "Latest", onClick: handleSortBy.bind(null, "Latest") },
    { text: "Price: Low to High", onClick: handleSortBy.bind(null, "Price: low to high") },
    { text: "Price: High to Low", onClick: handleSortBy.bind(null, "Price: high to low") },
  ];

  return (
    <Box flex={1} ml={{ base: 0, md: 8 }}>
      <Flex
        justify="space-between"
        align="center"
        mb={6}
        flexDir={{ base: "column", sm: "row" }}
        gap={4}
      >
        <VStack align="start" spacing={0}>
          <Heading size="lg" textTransform="capitalize">{title}</Heading>
          <Text fontSize="sm" color="gray.500">
            Showing <Text as="span" fontWeight="bold" color="blue.500">{products.total || 0}</Text> results
          </Text>
        </VStack>

        <HStack spacing={2}>
          <Box display={{ base: "block", md: "none" }}>{children}</Box>
          <Dropdown
            renderTrigger={({ onClick }) => (
              <Button
                variant="outline"
                size="sm"
                leftIcon={<BiSort />}
                rightIcon={<BiCaretDown />}
                onClick={onClick}
                rounded="full"
              >
                Sort: {sortBy}
              </Button>
            )}
          >
            <DropdownContent list={sortByDropdownList} />
          </Dropdown>

          <ButtonGroup isAttached size="sm" variant="outline" rounded="full">
            <IconButton
              icon={<BsGridFill />}
              isActive={currentLayoutStyle === "grid"}
              onClick={() => setCurrentLayoutStyle("grid")}
              roundedLeft="full"
            />
            <IconButton
              icon={<ImList />}
              isActive={currentLayoutStyle === "list"}
              onClick={() => setCurrentLayoutStyle("list")}
              roundedRight="full"
            />
          </ButtonGroup>
        </HStack>
      </Flex>

      <Divider mb={6} />

      {products.loading ? (
        <Loader h="400px" />
      ) : products.error ? (
        <SomethingWentWrong h="400px" onRetry={fetchProducts} />
      ) : products.total === 0 ? (
        <VStack h="400px" justify="center" spacing={4}>
           <Icon as={BiFilterAlt} w={12} h={12} color="gray.300" />
           <Text color="gray.500">No products match your filters</Text>
           <Button variant="link" colorScheme="blue" onClick={() => router.reload()}>Clear all filters</Button>
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
  }, [priceFromValue, priceToValue, rating, sortBy, router.query.category, router.query.subCategory]);

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
  }, [router.query.category, router.query.subCategory, pagination.page, priceFromValue, priceToValue, rating, sortBy]);

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
  }, [fetchProducts]);

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
      <Section pt={10} pb={20}>
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
                          size="sm"
                          leftIcon={<IoFilterOutline />}
                          rightIcon={<BiCaretDown />}
                          onClick={handleOpen}
                          rounded="full"
                        >
                          Filters
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

