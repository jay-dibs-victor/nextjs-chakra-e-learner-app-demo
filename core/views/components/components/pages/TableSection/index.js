import { Section } from "components/components/pages";
import {
  AddButton,
  FilterButton,
  FilterForm,
  Button,
  Heading,
  Table,
  Text,
  Image,
  Link,
} from "components/shared/lib";
import useTable, { useTableFilterForm, useTableRow } from "hooks/useTable";
import { Badge, Box, Flex, Stack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, VStack, HStack, Icon } from "@chakra-ui/react";
import http from "utils/http";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import dateFormat from "dateformat";
import { formatPriceToNaira } from "utils/formatPrice";
import { AiOutlineRight } from "react-icons/ai";
import { Chip } from "@material-ui/core";
import { HiArrowUp, HiDotsHorizontal } from "react-icons/hi";
import { IoFastFoodOutline } from "react-icons/io5";
import { FcElectronics } from "react-icons/fc";

import { useState } from "react";

const TableSection = ({
  mute,
  columns,
  renderFilterContent,
  addButton,
  table,
  onRowClick,
  onMenuClick,
  tableOptions,
}) => {
  const [modal, setModal] = useState(null);

  return (
    <Section {...(mute ? { p: 0, shadow: "none", m: 0 } : {})}>
      <Table
        columns={columns}
        table={table}
        renderFilterButton={
          renderFilterContent
            ? () => (
              <FilterButton table={table}>{renderFilterContent}</FilterButton>
            )
            : null
        }
        renderAddButton={() =>
          addButton && <AddButton text={addButton.text} href={addButton.href} />
        }
        onRowClick={onRowClick ? ({ row }) => onRowClick({ row, setModal }) : null}
        onMenuClick={onMenuClick ? ({ row }) => onMenuClick({ row, setModal }) : null}
        {...tableOptions}
      />

      {modal && (
        <Modal 
          isOpen={!!modal} 
          onClose={() => setModal(null)}
          isCentered
          size="sm"
        >
          <ModalOverlay backdropFilter="blur(10px) saturate(180%)" bg="blackAlpha.300" />
          <ModalContent borderRadius="3xl" overflow="hidden" boxShadow="2xl">
            <Box bgGradient="linear(to-br, blue.600, purple.600)" p={6} color="white">
              <VStack align="start" spacing={1}>
                <Text fontSize="xs" fontWeight="black" letterSpacing="widest" opacity={0.8}>ACTION CENTER</Text>
                <ModalHeader p={0} fontSize="xl" fontWeight="black">{modal.heading}</ModalHeader>
              </VStack>
              <ModalCloseButton color="white" top={4} />
            </Box>
            <ModalBody p={6}>
              <VStack spacing={3} align="stretch">
                {modal.list?.map((item, i) => {
                  const isDelete = item.props?.color === "brand.error" || item.text.toLowerCase().includes("delete");
                  return (
                    <Button 
                      key={i} 
                      onClick={() => {
                        if (item.onClick) item.onClick();
                        if (item.href) window.location.href = item.href;
                        setModal(null);
                      }}
                      variant="outline"
                      h="56px"
                      rounded="2xl"
                      justifyContent="start"
                      px={6}
                      fontSize="sm"
                      fontWeight="bold"
                      borderWidth="2px"
                      borderColor={isDelete ? "red.50" : "gray.50"}
                      color={isDelete ? "red.500" : "gray.700"}
                      _hover={{
                        bg: isDelete ? "red.50" : "blue.50",
                        borderColor: isDelete ? "red.200" : "blue.200",
                        color: isDelete ? "red.600" : "blue.600",
                        transform: "translateY(-2px)"
                      }}
                      transition="all 0.2s"
                    >
                      <HStack spacing={4}>
                        <Icon 
                          as={isDelete ? HiArrowUp : HiDotsHorizontal} // Temporary icons, will refine if I find better ones
                          w={5} h={5} 
                          color={isDelete ? "red.400" : "blue.400"} 
                        />
                        <Text>{item.text}</Text>
                      </HStack>
                    </Button>
                  );
                })}
              </VStack>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Section>
  );
};

// Users
const columns_users = [
  {
    label: "First name",
    key: "name",
    minFr: "150px",
  },
  {
    label: "Phone Number",
    key: "phoneNumber",
    minFr: "150px",
  },
  {
    label: "address",
    key: "address",
    minFr: "250px",
  },
  // {
  //   label: "Referer code",
  //   key: "refCode",
  //   value: (refCode) => (
  //     <Text mute type="nm-bold">
  //       {refCode}
  //     </Text>
  //   ),
  //   minFr: "120px",
  // },
  {
    label: "Date of Opening",
    key: "dateOfOpening",
    value: (date) => dateFormat(date, "fullDate"),
    minFr: "225px",
  },
  {
    label: "Status",
    key: "deactivatedAt",
    value: (deactivatedAt) =>
      deactivatedAt ? (
        <Badge colorScheme="red">Deactivated</Badge>
      ) : (
        <Badge colorScheme="green">Activated</Badge>
      ),
    minFr: "100px",
    maxFr: ".5fr",
  },
];

const fetchRows_users =
  (role, path = "/users") =>
    async ({ setRows, options, url }) => {
      setRows({ loading: true });

      try {
        const { data } = await http.get(
          url ||
          `/admin/users`,
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );

        const mappedData = {
          totalPages: 1,
          totalDocs: data.length,
          docs: data.filter(user => role === 'customer' ? user.role === 'user' : user.role === role).map(user => ({
            ...user,
            name: `${user.firstName} ${user.lastName}`,
            phoneNumber: user.phone || "N/A",
            dateOfOpening: user.createdAt,
            id: user._id
          }))
        };

        setRows({ data: mappedData });


      } catch (err) {
        setRows({ error: err.message });
      }
    };

const handleRowClick_users = ({ row: user }) => {
  return {
    href: `/users/${user.id}`,
  };
};

const handleMenuClick_users =
  (tableRow) =>
    ({ row: user, setModal }) => {
      setModal({
        heading: `${user.firstName} ${user.lastName}`,
        list: [
          {
            text: "Preview This User",
            href: `/users/${user.id}`,
          },
          {
            text: !user.isActivated
              ? "Activate This User"
              : "Deactivate This User",
            onClick: async () => {
              const payload = {
                isActivated: !user.isActivated,
              };

              // Server update
              await http.put(
                `/admin/users/${user._id}`,
                payload,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
              );
              // UI update
              tableRow.updateRow({ rowId: user._id, payload });
            },
          },
          {
            text: "Delete This User",
            props: {
              color: "brand.error",
            },
            onClick: async () => {
              await http.delete(
                `/admin/users/${user._id}`,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
              );
              tableRow.deleteRow({ rowId: user._id });
            },
          },
        ],
      });
    };

const AdministratorsTableSection = ({ mute }) => {
  const renderFilterContent = ({ table, onClose }) => {
    const { queries, setQueries, handleSubmit } = useTableFilterForm({
      table,
      onClose,
      initialQueries: {
        isActivated: "",
        role: "marketer",
      },
      path: "/users",
    });

    const handleChange = (value, id) => {
      setQueries((prev) => ({ ...prev, [id]: value }));
    };

    return (
      <FilterForm onSubmit={handleSubmit}>
        <RadioGroup
          mb={3}
          onChange={(value) => handleChange(value, "isActivated")}
          value={queries.isActivated}
        >
          <Heading mute>Status</Heading>

          <Stack direction="row">
            <Radio value="true">Activated</Radio>

            <Radio value="false" mr={2}>
              Deactivated
            </Radio>
          </Stack>
        </RadioGroup>
      </FilterForm>
    );
  };

  const fetchRows = fetchRows_users("admin");

  const table = useTable({ fetchRows });
  const tableRow = useTableRow({
    rowsData: table.rows,
    setRowsData: table.setRows,
  });

  return (
    <TableSection
      mute={mute}
      columns={columns_users}
      table={table}
      onRowClick={handleRowClick_users}
      onMenuClick={handleMenuClick_users(tableRow)}
    />
  );
};

const MarketersTableSection = ({ mute }) => {
  const renderFilterContent = ({ table, onClose }) => {
    const { queries, setQueries, handleSubmit } = useTableFilterForm({
      table,
      onClose,
      initialQueries: {
        isActivated: "",
        role: "marketer",
      },
      path: "/users",
    });

    const handleChange = (value, id) => {
      setQueries((prev) => ({ ...prev, [id]: value }));
    };

    return (
      <FilterForm onSubmit={handleSubmit}>
        <RadioGroup
          mb={3}
          onChange={(value) => handleChange(value, "isActivated")}
          value={queries.isActivated}
        >
          <Heading mute>Status</Heading>

          <Stack direction="row">
            <Radio value="true">Activated</Radio>

            <Radio value="false" mr={2}>
              Deactivated
            </Radio>
          </Stack>
        </RadioGroup>
      </FilterForm>
    );
  };
  const fetchRows = fetchRows_users("marketer");

  const table = useTable({ fetchRows });
  const tableRow = useTableRow({
    rowsData: table.rows,
    setRowsData: table.setRows,
  });

  return (
    <TableSection
      mute={mute}
      columns={columns_users}
      table={table}
      onRowClick={handleRowClick_users}
      onMenuClick={handleMenuClick_users(tableRow)}
    />
  );
};

const CustomersTableSection = ({
  mute,
  queryString: propQueryString = "",
  path,
}) => {
  const renderFilterContent = ({ table, onClose }) => {
    const role = localStorage.getItem('user')?.role || "user"
    const { queries, setQueries, handleSubmit } = useTableFilterForm({
      table,
      onClose,
      initialQueries: {
        isActivated: "",
        role: role == "customer" ? "customer" : "user",
      },
      path,
      propQueryString,
    });

    const handleChange = (value, id) => {
      setQueries((prev) => ({ ...prev, [id]: value }));
    };

    return (
      <FilterForm onSubmit={handleSubmit}>
        <RadioGroup
          mb={3}
          onChange={(value) => handleChange(value, "isActivated")}
          value={queries.isActivated}
        >
          <Heading mute>Status</Heading>

          <Stack direction="row">
            <Radio value="true">Activated</Radio>

            <Radio value="false" mr={2}>
              Deactivated
            </Radio>
          </Stack>
        </RadioGroup>
      </FilterForm>
    );
  };



  const fetchRows = fetchRows_users("customer", path);



  const table = useTable({ fetchRows });


  const tableRow = useTableRow({
    rowsData: table.rows,
    setRowsData: table.setRows,
  });

  return (
    <TableSection
      mute={mute}
      columns={columns_users}
      table={table}
      onRowClick={handleRowClick_users}
      onMenuClick={handleMenuClick_users(tableRow)}
    />
  );
};
// End Users

const OrdersTableSection = ({
  mute,
  heading,
  queryString: propQueryString = "",
  path = "/orders",
}) => {
  const options = heading ? { noPagination: true, noHeader: true } : {};

  const columns = [
    {
      label: "Tracking ID",
      key: "trackingId",
      minFr: "140px",
    },
    {
      label: "Cost",
      key: "amount",
      value: (amount) => formatPriceToNaira(amount),
      minFr: "130px",
    },
    {
      label: "Ordered By",
      key: "creator",
      value: (creator) => (
        <Box>
          <Text mute>{creator.name}</Text>
          <Text mute type="sm-bold">
            {creator.role}
          </Text>
        </Box>
      ),
      minFr: "200px",
    },
    {
      label: "Date",
      key: "createdAt",
      value: (date) => dateFormat(date, "fullDate"),
      minFr: "225px",
    },

    {
      label: "Status",
      key: "delivered",
      value: (delivered) =>
        delivered ? (
          <Badge colorScheme="green">Delivered</Badge>
        ) : (
          <Badge colorScheme="red">Not Delivered</Badge>
        ),
      minFr: "120px",
    },
  ];

  const renderFilterContent = ({ table, onClose }) => {
    const { queries, setQueries, handleSubmit } = useTableFilterForm({
      table,
      onClose,
      initialQueries: {
        delivered: "",
      },
      path,
      propQueryString,
    });

    const handleChange = (value, id) => {
      setQueries((prev) => ({ ...prev, [id]: value }));
    };

    return (
      <FilterForm onSubmit={handleSubmit}>
        <RadioGroup
          mb={3}
          onChange={(value) => handleChange(value, "delivered")}
          value={queries.delivered}
        >
          <Heading mute>Status</Heading>

          <Stack direction="row">
            <Radio value="true">Delivered</Radio>

            <Radio value="false" mr={2}>
              Not Delivered
            </Radio>
          </Stack>
        </RadioGroup>
      </FilterForm>
    );
  };

  const fetchRows = async ({ setRows, options, url }) => {
    setRows({ loading: true });

    try {
      // Mocking orders data since no backend route exists for orders
      const mockOrders = [
        { id: "ORD-12345", trackingId: "TRK-987654321", amount: 15000, creatorId: "John Doe", createdAt: new Date().toISOString(), delivered: true },
        { id: "ORD-12346", trackingId: "TRK-987654322", amount: 24000, creatorId: "Jane Smith", createdAt: new Date().toISOString(), delivered: false },
        { id: "ORD-12347", trackingId: "TRK-987654323", amount: 8500, creatorId: "Alice Johnson", createdAt: new Date().toISOString(), delivered: true },
      ];

      const data = {
        totalPages: 1,
        totalDocs: mockOrders.length,

        // Map to `columns.key`
        docs: mockOrders.map((order) => ({
          ...order,
          // Map fields that don't map to `columns[<index>].key`
          creator: order.creatorId,
          extraInfo: {
            creator: {
              name: order.creatorId,
              role: Math.random() > 0.5 ? "Customer" : "Marketer",
            },
          },
        })),
      };

      setRows({ data });
    } catch (err) {
      setRows({ error: err.message });
    }
  };

  const table = useTable({ fetchRows });
  const tableRow = useTableRow({
    rowsData: table.rows,
    setRowsData: table.setRows,
  });

  const handleRowClick = ({ row: order, setModal }) => {
    setModal({
      heading: order.trackingId,
      list: [
        {
          text: "View Order Details",
          href: `/orders/${order.id}`,
        },
        {
          text: order.delivered ? "Mark As Not Delivered" : "Mark As Delivered",
          onClick: async () => {
            const payload = {
              delivered: !order.delivered,
            };

            // Server update
            await http.patch(`/orders/${order.id}/delivery`);
            // UI update
            tableRow.updateRow({ rowId: order.id, payload });
          },
        },
      ],
    });
  };

  return (
    <Box>
      {heading && (
        <Flex alignItems="center" justifyContent="space-between" mb={2}>
          <Heading
            type="h5"
            mute
            textTransform="capitalize"
            color="brand.secondary"
          >
            {heading}
          </Heading>

          <Link mute href="/orders">
            <Button sm rightIcon={<AiOutlineRight />} color="brand.secondary">
              See all
            </Button>
          </Link>
        </Flex>
      )}

      <TableSection
        mute={mute}
        columns={columns}
        table={table}
        onRowClick={handleRowClick}
        onMenuClick={handleRowClick}
        tableOptions={options}
      />
    </Box>
  );
};

const CategoriesTableSection = ({ mute, path }) => {
  const columns = [
    {
      label: "Category name",
      key: "name",
      minFr: "200px",
    },
    {
      label: "Created At",
      key: "createdAt",
      // value: (creator) => (
      //   <Box>
      //     <Text mute>{creator.name}</Text>
      //     <Text mute type="sm-bold" opacity={0.8}>
      //       {creator.role}
      //     </Text>
      //   </Box>
      // ),
      minFr: "200px",
    },
    {
      label: "Slug",
      key: "slug",
      value: (productClass) => (
        <Chip
          label={productClass}
          icon={
            productClass.includes("food") ? (
              <IoFastFoodOutline />
            ) : (
              <FcElectronics />
            )
          }
        />
      ),
      minFr: "150px",
      maxFr: ".8fr",
    },
    // {
    //   label: "Date",
    //   key: "createdAt",
    //   value: (date) => dateFormat(date, "fullDate"),
    //   minFr: "225px",
    // },
    {
      label: "Status",
      key: "active",
      value: (active) =>
        active ? (
          <Badge colorScheme="green">Activated</Badge>
        ) : (
          <Badge colorScheme="red">Deactivated</Badge>
        ),
      minFr: "80px",
      maxFr: ".5fr",
    },
  ];

  const renderFilterContent = ({ table, onClose }) => {
    const { queries, setQueries, handleSubmit } = useTableFilterForm({
      table,
      onClose,
      initialQueries: {
        productClass: "",
        active: "",
      },
      path: "/product-categories",
    });

    const handleChange = (value, id) => {
      setQueries((prev) => ({ ...prev, [id]: value }));
    };

    return (
      <FilterForm onSubmit={handleSubmit}>
        <RadioGroup
          mb={3}
          onChange={(value) => handleChange(value, "productClass")}
          value={queries.productClass}
        >
          <Heading mute>Product Class</Heading>

          <Stack direction="row">
            <Radio value="electronics" mr={2}>
              Electronics
            </Radio>
            <Radio value="food-packs">Food packs</Radio>
          </Stack>
        </RadioGroup>

        <RadioGroup
          mb={3}
          onChange={(value) => handleChange(value, "active")}
          value={queries.active}
        >
          <Heading mute>Status</Heading>

          <Stack direction="row">
            <Radio value="true">Activated</Radio>

            <Radio value="false" mr={2}>
              Deactivated
            </Radio>
          </Stack>
        </RadioGroup>
      </FilterForm>
    );
  };

  const fetchRows = async ({ setRows, options, url }) => {
    setRows({ loading: true });

    try {
      const {
        data: resData,
      } = await http.get(
        url ||
        `/product-categories?limit=10&page=${options.page}${options.query.key
          ? `&${options.query.key}=${options.query.value}`
          : ""
        }`
      );

      const payload = resData?.data || resData;
      const docs = payload?.docs || payload;

      const data = {
        totalPages: payload?.pages || 1,
        totalDocs: payload?.total || docs?.length,

        // Map to `columns.key`
        docs: docs?.map((category) => ({
          ...category,
          // Map fields that don't map to `columns[<index>].key`
          id: category._id
        })),
      };

      setRows({ data });
    } catch (err) {
      setRows({ error: err.message });
    }
  };

  const table = useTable({ fetchRows });
  const tableRow = useTableRow({
    rowsData: table.rows,
    setRowsData: table.setRows,
  });

  const handleRowClick = ({ row: category, setModal }) => {
    setModal({
      heading: category.name,
      list: [
        {
          text: "Edit This Category",
          href: `/categories/${category.id}`,
        },
        {
          text: category.active
            ? "Deactivate This Category"
            : "Activate This Category",
          onClick: async () => {
            const payload = {
              active: !category.active,
            };

            // Server update
            await http.patch(`/product-categories/${category.id}`, payload);
            // UI update
            tableRow.updateRow({ rowId: category.id, payload });
          },
        },
        {
          text: "Delete This Category",
          props: {
            color: "brand.error",
          },
          onClick: async () => {
            // Server update
            await http.delete(`/product-categories/${category.id}`);
            // UI update
            tableRow.deleteRow({ rowId: category.id });
          },
        },
      ],
    });
  };

  return (
    <TableSection
      mute={mute}
      columns={columns}
      table={table}
      addButton={{ text: "Add new category", href: "/categories/add" }}
      onRowClick={handleRowClick}
      onMenuClick={handleRowClick}
    />
  );
};

const ProductsTableSection = ({ mute }) => {
  const columns = [
    {
      label: "Product name",
      key: "name",
      value: (name, row) => (
        <Flex alignItems="center">
          <Image src={row?.image || "/img/placeholder.png"} w="50px" h="50px" objectFit="cover" borderRadius="md" mr={3} />
          <Text mute>{name}</Text>
        </Flex>
      ),
      minFr: "350px",
    },

    {
      label: "Product price",
      key: "price",
      value: (amount) => formatPriceToNaira(amount),
      minFr: "130px",
    },
    {
      label: "Date",
      key: "createdAt",
      value: (date) => dateFormat(date, "fullDate"),
      minFr: "225px",
    },
    {
      label: "Status",
      key: "stock",
      value: (stock) =>
        stock > 0 ? (
          <Badge colorScheme="green">In Stock ({stock})</Badge>
        ) : (
          <Badge colorScheme="red">Out of Stock</Badge>
        ),
      minFr: "100px",
      maxFr: ".5fr",
    },
  ];

  const renderFilterContent = ({ table, onClose }) => {
    const { queries, setQueries, handleSubmit } = useTableFilterForm({
      table,
      onClose,
      initialQueries: {
        isPublished: "",
      },
      path: "/products",
    });

    const handleChange = (value, id) => {
      setQueries((prev) => ({ ...prev, [id]: value }));
    };

    return (
      <FilterForm onSubmit={handleSubmit}>
        <RadioGroup
          mb={3}
          onChange={(value) => handleChange(value, "isPublished")}
          value={queries.isPublished}
        >
          <Heading mute>Status</Heading>

          <Stack direction="row">
            <Radio value="true">Published</Radio>

            <Radio value="false" mr={2}>
              Not Published
            </Radio>
          </Stack>
        </RadioGroup>
      </FilterForm>
    );
  };

  const fetchRows = async ({ setRows, options, url }) => {
    setRows({ loading: true });

    try {
      const {
        data: resData,
      } = await http.get(
        url ||
        `/products?limit=10&page=${options.page}${options.query.key
          ? `&${options.query.key}=${options.query.value}`
          : ""
        }`
      );

      console.log(resData, ">>> here 4")

      const docs = resData.docs || resData;
      const data = {
        totalPages: resData.pages || resData?.length,
        totalDocs: resData.total || resData?.length,

        // Map to `columns.key`
        docs: docs?.map((product) => ({
          ...product,
          // Map fields that don't map to `columns[<index>].key`
          name: product.name,
          creator: product.creatorId,
          // Columns with extra informations
          extraInfo: {
            product: {
              name: product?.name,
              imageUrl:
                product.primaryImage?.imageUrl ||
                "/images/products/default.png",
            },
            creator: {
              name: product.creatorId,
              role: Math.random() > 0.5 ? "Customer" : "Marketer",
            },
          },
        })),
      };

      setRows({ data });
    } catch (err) {
      setRows({ error: err.message });
    }
  };



  const table = useTable({ fetchRows });
  const tableRow = useTableRow({
    rowsData: table.rows,
    setRowsData: table.setRows,
  });

  console.log(table, ">>> here 5")

  const handleRowClick = ({ row: product }) => {
    return {
      href: `/products/${product.id}`,
    };
  };

  const handleMenuClick = ({ row: product, setModal }) => {
    setModal({
      heading: product.product,
      list: [
        {
          text: "Edit This Product",
          href: `/products/${product.id}`,
        },
        {
          text: product.isPublished
            ? "Mark As Un-published"
            : "Mark As Published",
          onClick: async () => {
            const payload = {
              isPublished: !product.isPublished,
            };

            // Server update
            await http.patch(`/products/${product.id}`, payload);

            // UI update
            tableRow.updateRow({ rowId: product.id, payload });
          },
        },
        {
          text: "Delete This Product",
          props: {
            color: "brand.error",
          },
          onClick: async () => {
            // Server update
            await http.delete(`/products/${product.id}`);

            // UI update
            tableRow.deleteRow({ rowId: product.id });
          },
        },
      ],
    });
  };

  return (
    <TableSection
      mute={mute}
      columns={columns}
      table={table}
      addButton={{ text: "Add new product", href: "/products/add" }}
      onRowClick={handleRowClick}
      onMenuClick={handleMenuClick}
    />
  );
};

// Courses
const columns_courses = [
  {
    label: "Course Title",
    key: "title",
    value: (title, row) => (
      <Flex alignItems="center">
        <Image src={row?.thumbnail || "/img/placeholder.png"} w="50px" h="30px" objectFit="cover" borderRadius="sm" mr={3} />
        <Text mute>{title}</Text>
      </Flex>
    ),
    minFr: "300px",
  },
  {
    label: "Instructor",
    key: "instructor",
    value: (instructor) => instructor?.name || "N/A",
    minFr: "150px",
  },
  {
    label: "Price",
    key: "price",
    value: (price) => formatPriceToNaira(price),
    minFr: "120px",
  },
  {
    label: "Level",
    key: "level",
    value: (level) => (
      <Badge colorScheme={level === "Beginner" ? "green" : level === "Intermediate" ? "orange" : "red"}>
        {level}
      </Badge>
    ),
    minFr: "100px",
  },
  {
    label: "Enrolled",
    key: "enrolledCount",
    minFr: "100px",
  },
];

const CoursesTableSection = ({ mute }) => {
  const fetchRows = async ({ setRows, options, url }) => {
    setRows({ loading: true });
    try {
      const { data: resData } = await http.get(url || "/courses");
      const docs = resData?.docs || resData;
      const data = {
        totalPages: resData?.pages || 1,
        totalDocs: resData?.total || docs?.length,
        docs: docs?.map((course) => ({
          ...course,
          id: course._id,
        })),
      };
      setRows({ data });
    } catch (err) {
      setRows({ error: err.message });
    }
  };

  const table = useTable({ fetchRows });
  const tableRow = useTableRow({
    rowsData: table.rows,
    setRowsData: table.setRows,
  });

  const handleRowClick = ({ row: course, setModal }) => {
    setModal({
      heading: course.title,
      list: [
        {
          text: "Edit Course",
          href: `/courses/${course.id}`,
        },
        {
          text: "Delete Course",
          props: { color: "brand.error" },
          onClick: async () => {
            await http.delete(`/courses/${course.id}`);
            tableRow.deleteRow({ rowId: course.id });
          },
        },
      ],
    });
  };

  return (
    <TableSection
      mute={mute}
      columns={columns_courses}
      table={table}
      addButton={{ text: "Add new course", href: "/courses/add" }}
      onRowClick={handleRowClick}
      onMenuClick={handleRowClick}
    />
  );
};

export {
  AdministratorsTableSection,
  CustomersTableSection,
  CategoriesTableSection,
  MarketersTableSection,
  OrdersTableSection,
  ProductsTableSection,
  CoursesTableSection,
};
