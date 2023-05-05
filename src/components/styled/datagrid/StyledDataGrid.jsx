import { green, grey, red } from "@mui/material/colors"
import { styled } from "@mui/system"
import { DataGrid } from "@mui/x-data-grid"

const StyledDataGrid = styled(DataGrid)({
    height: 500,
    border: "none",
    "& .MuiDataGrid-main": {
        backgroundColor: "white",
        borderRadius: 1,
    },
    "& div div div div >.MuiDataGrid-cell": {
        borderBottom: "none",
    },
    "& .MuiDataGrid-row": {
        cursor: "pointer",
        border: "none",
    },
    "& .MuiDataGrid-columnHeaders": {
        color: grey[800],
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
        borderColor: grey[200],
    },
    "& .MuiToolbar-root ": {
        color: grey[800],
    },
    "& .MuiDataGrid-footerContainer": {
        borderColor: grey[200],
        borderBottomLeftRadius: 2,
        borderBottomRightRadius: 2,
        backgroundColor: "white",
    },
    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
        // color: `${theme.palette.secondary[200]} !important`,
    },
    "& .total": {
        fontWeight: "500",
        // color: "#1a3e72",
    },
    "& .total.positive": {
        color: green[500],
    },
    "& .total.negative": {
        color: red[500],
    },
})

export default StyledDataGrid
