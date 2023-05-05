import {
    TextField,
    Box,
    Typography,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    ListItemText,
    OutlinedInput,
} from "@mui/material"
import {
    GridToolbarDensitySelector,
    GridToolbarContainer,
    GridToolbarColumnsButton,
} from "@mui/x-data-grid"
import SearchIcon from "@mui/icons-material/Search"
import DeleteIcon from "@mui/icons-material/Delete"
import FilterAltIcon from "@mui/icons-material/FilterAlt"
import { useState } from "react"
import { useRef } from "react"
import { grey } from "@mui/material/colors"
import StyledDataGridToolbarBox from "../../../components/styled/datagrid/StyledDataGridToolbarBox"

const DataGridItemToolbar = ({
    categories,
    selectedRows,
    handleOpenConfirmRemoveItem,
    handleResetSelectedRows,
    handleFilter,
}) => {
    const [category, setCategory] = useState([])
    const [showFilter, setShowFilter] = useState(false)
    const nameRef = useRef()
    const rowCount = selectedRows?.length

    const ITEM_HEIGHT = 48
    const ITEM_PADDING_TOP = 8
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    }

    const handleChange = (event) => {
        const {
            target: { value },
        } = event

        setCategory(typeof value === "string" ? value.split(",") : value)
    }

    const handleShowFilter = (event) => {
        setShowFilter(!showFilter)
    }

    const handleFilterTrigger = () => {
        handleFilter({
            name: nameRef.current.value,
            category: category,
        })
    }

    const clearFilter = () => {
        nameRef.current.value = ""
        setCategory([])
        handleFilterTrigger()
    }

    return (
        <GridToolbarContainer sx={styles.base}>
            <StyledDataGridToolbarBox>
                <Box sx={styles.toolGroup}>
                    <GridToolbarColumnsButton />

                    <GridToolbarDensitySelector />

                    <Button onClick={handleShowFilter} sx={styles.iconButton}>
                        <SearchIcon sx={styles.buttonIcon} />
                        <Typography sx={styles.buttonAddText}>
                            Filter
                        </Typography>
                    </Button>
                </Box>
            </StyledDataGridToolbarBox>

            {showFilter && (
                <Box sx={styles.optionContainer}>
                    <TextField
                        inputRef={nameRef}
                        label="Name"
                        variant="outlined"
                        size="small"
                    />

                    <FormControl size="small" sx={{ minWidth: 250 }}>
                        <InputLabel id="demo-multiple-checkbox-label">
                            Category
                        </InputLabel>

                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={category}
                            onChange={handleChange}
                            input={<OutlinedInput label="Category" />}
                            renderValue={(selected) => selected.join(", ")}
                            MenuProps={MenuProps}
                        >
                            {categories?.map((name) => (
                                <MenuItem key={name} value={name}>
                                    <Checkbox
                                        checked={category.indexOf(name) > -1}
                                    />

                                    <ListItemText primary={name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Button
                        onClick={handleFilterTrigger}
                        variant="contained"
                        disableElevation
                        sx={{ paddingX: 3 }}
                        endIcon={<FilterAltIcon />}
                    >
                        Filter
                    </Button>

                    <Button onClick={clearFilter}>Clear</Button>
                </Box>
            )}

            {selectedRows && selectedRows?.length > 0 && (
                <Box sx={styles.optionContainer}>
                    <Button
                        onClick={handleOpenConfirmRemoveItem}
                        variant="contained"
                        disableElevation
                        endIcon={<DeleteIcon />}
                    >
                        Delete {rowCount} Item/s
                    </Button>

                    <Button onClick={handleResetSelectedRows}>Cancel</Button>
                </Box>
            )}
        </GridToolbarContainer>
    )
}

// gridTemplateColumns: { md: "1fr", lg: "1fr 300px" },
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
