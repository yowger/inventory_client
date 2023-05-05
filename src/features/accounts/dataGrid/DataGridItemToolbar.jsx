import { Box } from "@mui/material"
import {
    GridToolbarDensitySelector,
    GridToolbarContainer,
    GridToolbarExport,
    GridToolbarColumnsButton,
} from "@mui/x-data-grid"
import { grey } from "@mui/material/colors"
import StyledDataGridToolbarBox from "../../../components/styled/datagrid/StyledDataGridToolbarBox"

const DataGridItemToolbar = () => {
    return (
        <GridToolbarContainer sx={styles.base}>
            <StyledDataGridToolbarBox>
                <Box sx={styles.toolGroup}>
                    <GridToolbarColumnsButton />

                    <GridToolbarDensitySelector />

                    <GridToolbarExport />
                </Box>
            </StyledDataGridToolbarBox>
        </GridToolbarContainer>
    )
}

/** @type {import("@mui/material").SxProps} */
const styles = {
    base: {
        mb: 1,
    },
    toolGroup: {
        display: "flex",
        flexWrap: "wrap",
        gap: 1,
    },
    iconButton: {
        display: "inline-flex",
        padding: "4px 5px",
        items: "center",
        justifyContent: "center",
    },
    tools: {},
    searchInput: {
        width: { xs: "100%", md: "initial" },
    },
    buttonIcon: {
        marginRight: "8px",
        marginLeft: "-2px",
    },
    buttonAddText: {
        fontSize: "0.8125rem",
        letterSpacing: "0.02857em",
        fontWeight: 500,
        lineHeight: "1.75",
    },
    optionContainer: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: { xs: 2, md: 1 },
        borderRadius: 1,
        mb: 1,
        flexWrap: "wrap",
    },
    toolText: {
        color: grey[700],
    },
}

export default DataGridItemToolbar
