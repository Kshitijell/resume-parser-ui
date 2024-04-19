import React from "react";
import {
  useMaterialReactTable,
  MaterialReactTable,
} from "material-react-table";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";

const CustomMaterialDataTable = ({
  rowData = [],
  columns = [],
  defaultHide = {},
  hideFooter = false,
  pageSize = 5,
  isLoading,
}) => {
  const theme = useTheme();
  const greyColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[200]
      : theme.palette.grey[700];
  const backgroundColor = theme.palette.background.paper;
  const table = useMaterialReactTable({
    columns,
    data: rowData,
    defaultColumn: {
      // maxSize: 400,
      minSize: 90,
    },
    enableTopToolbar: false,
    enableHiding: false,
    enableDensityToggle: false,
    enableFullScreenToggle: false,
    enableColumnResizing: true,
    enableColumnActions:false,
    layoutMode: "grid",
    enablePagination: hideFooter,
    columnResizeMode: "onChange",
    initialState: {
      density: "comfortable",
      pagination: { pageSize, pageIndex: 0 },
      columnVisibility: defaultHide,
    },
    state: {
      isLoading,
    },
    muiTopToolbarProps: {
      sx: {
        "& .MuiBox-root": {
          paddingBottom: "1px",
          paddingTop: "4px",
          backgroundColor,
        },
        "& .MuiInputBase-root": {
          height: "44px",
          "& fieldset": {
            borderColor: theme.palette.grey[500],
          },
        },
      },
    },
    muiFilterTextFieldProps: {
      sx: { m: "0.8rem 0", width: "100%" },
      variant: "outlined",
      size: "small",
    },
    muiTableHeadCellProps: {
      sx: {
        backgroundColor: greyColor,
        color: theme.palette.text.primary,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "&:hover .Mui-TableHeadCell-Content-Wrapper": {
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        },
        "& .MuiTableSortLabel-icon": {
          display: "none",
        },
        "&:hover .MuiTableSortLabel-icon": {
          display: "inline",
        },
        "& .Mui-TableHeadCell-Content-Actions": {
          marginRight: "-8px",
          display: "none",
        },
        "&:hover .Mui-TableHeadCell-Content-Actions": {
          display: "inline",
        },
      },
    },
    muiTableBodyCellProps: {
      sx: {
        "& .MuiTableCell-root": {
          display: "flex",
        },
        fontSize: "14px",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        display: "inline-box",
        WebkitLineClamp: 1,
        WebkitBoxOrient: "vertical",
      },
    },
    muiTablePaperProps: {
      sx: {
        boxShadow: "none",
        "& .MuiTableContainer-root": {
          p: 0.5,
        },
      },
    },
    muiBottomToolbarProps: {
      sx: {
        backgroundColor,
        boxShadow: "none",
        borderTop: `2px solid ${greyColor}`,
        "& .MuiSvgIcon-root": {
          left: 15,
        },
        "& .MuiSelect-select": {
          p: 0,
          borderRadius: 1,
        },
      },
    },
    muiPaginationProps: {
      rowsPerPageOptions: [5],
    },
  });

  return <MaterialReactTable table={table} />;
};

CustomMaterialDataTable.propTypes = {
  rowData: PropTypes.array,
  columns: PropTypes.array.isRequired,
  defaultHide: PropTypes.object,
  hideFooter: PropTypes.bool,
  pageSize: PropTypes.number,
  isLoading: PropTypes.bool,
};

const CustomDataTable = React.memo(CustomMaterialDataTable);

export default CustomDataTable;
