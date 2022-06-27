import PropTypes from "prop-types";
import { Box, Flex } from "@chakra-ui/layout";
import {
  Loader,
  SomethingWentWrong,
  SearchBar,
  headerHeight,
} from "components/components/pages";
import { Button } from "components/shared/lib";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import { useCallback, useEffect, useState } from "react";
import { IoFilterOutline } from "react-icons/io5";
import { Pagination } from "./Pagination";
import usePagination from "hooks/usePagination";

export const Table = ({ 
  table, 
  renderFilterButton, 
  renderAddButton, 
  onRowClick, 
  onMenuClick, 
  columnGap, 
  columns = 5,
  noHeader,
  noPagination
}) => {
  const { rows, page, handlePageChange, handleSearch } = table || {};

  const getTemplateColumns = () => {
    const defaultFr = {
      min: "130px",
      max: "1fr",
    };

    let templateColumns = "";

    columns.forEach((col) => {
      templateColumns += `minmax(${col.minFr || defaultFr.min}, ${col.maxFr || defaultFr.max
        }) `;
    });

    templateColumns += "minmax(35px, .3fr)";

    return templateColumns;
  };


  return (
    <Box as="section">
      <Box as="main">
        {/* Section Header */}
        <Header renderAddButton={renderAddButton} />

        {/* Loader instead of a Table */}
        {rows?.loading && <Loader h={{ base: "150px", md: "200px" }} />}

        {/* The actual Table */}
        {rows?.data && (
          <Box overflowX="auto" pb={5}>
            {/* Head */}
            <TableHead
              templateColumns={getTemplateColumns()}
              columnGap={columnGap}
              columns={columns}
            />

            {/* Body */}
            <TableBody
              templateColumns={getTemplateColumns()}
              columnGap={columnGap}
              columns={columns}
              rows={rows?.data?.docs || rows?.data}
              onRowClick={onRowClick}
              onMenuClick={onMenuClick}
            />
          </Box>
        )}

        {/* Error instead of a Table */}
        {rows?.error && (
          <SomethingWentWrong h={{ base: "150px", md: "200px" }} />
        )}
      </Box>

      {/* Section Footer */}
      {!noPagination && (
        <Pagination
          page={page}
          onPageChange={handlePageChange}
          itemTotal={rows?.data?.totalDocs || rows?.data?.docs?.length || rows?.data?.length}
        />
      )}
    </Box>
  );
};

const Header = ({ renderAddButton, columns }) => {
  const handleSearchFilter = (query) => {
    console.log(query);
  };

  return (
    <Flex
      as="header"
      alignItems="center"
      pos="sticky"
      top={{ base: headerHeight.base, lg: headerHeight.lg }}
      zIndex={10}
      py={{ base: 1, md: 2 }}
      bg="brand.gray6"
    >
      <SearchBar
        placeholder="Type to filter..."
        onSearch={handleSearchFilter}
        flex={0.7}
        minW="200px"
      />
      <Box flex={1} mx={{ base: 1, md: 5 }}>
        <Button
          variant="secondary"
          sm
          leftIcon={<IoFilterOutline />}
          responsive={<IoFilterOutline />}
        >
          Filter
        </Button>
      </Box>

      <Box>{renderAddButton({ columns })}</Box>
    </Flex>
  );
};

Table.propTypes = {
  path: PropTypes.string,
  renderAddButton: PropTypes.func,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      // Required props
      key: PropTypes.string,
      label: PropTypes.string,
      // Optional props
      minFr: PropTypes.string,
      maxFr: PropTypes.string,
      styleProps: PropTypes.object,
    })
  ),
  // Optional
  columnGap: PropTypes.number,
};
