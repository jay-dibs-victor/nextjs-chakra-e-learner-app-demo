import { Flex, Grid, GridItem, Box } from "@chakra-ui/layout";
import { MdMoreVert } from "react-icons/md";
import { Button, IconButton } from "../Button/Button";
import { Dropdown } from "../Dropdown/Dropdown";
import { Text } from "../Typography/Text";

const TableBody = ({ rows, columnGap, templateColumns, columns, onRowClick, onMenuClick }) => (
  <Box>
    {rows && rows.map((row, index) => {
      return (
        <Grid
          columnGap={columnGap}
          templateColumns={templateColumns}
          key={row.id || row._id || index}
          bg={index % 2 === 0 ? "brand.gray5" : "brand.gray6"}
          p={1}
          w="100%"
          minH="28px"
          alignItems="center"
          cursor={onRowClick ? "pointer" : "default"}
          _hover={onRowClick ? { bg: "gray.100" } : {}}
          onClick={() => {
            if (onRowClick) {
              const res = onRowClick({ row });
              if (res?.href) {
                window.location.href = res.href;
              }
            }
          }}
        >
          {columns.map((col) => (
            <GridItem key={col.key}>
              {col.value ? (
                col.value(row[col.key], row)
              ) : (
                <Text mute>{row[col.key]}</Text>
              )}
            </GridItem>
          ))}

          {onMenuClick && (
            <GridItem
              justifySelf="flex-end"
              pos="relative"
              zIndex={1}
              right={0}
            >
              <IconButton 
                variant="ghost" 
                onClick={(e) => {
                  e.stopPropagation();
                  onMenuClick({ row });
                }}
              >
                <MdMoreVert />
              </IconButton>
            </GridItem>
          )}
        </Grid>
      );
    })}
  </Box>
);

export default TableBody;
