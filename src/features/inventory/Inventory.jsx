import { Alert, Box, Breadcrumbs, Button, Snackbar } from "@mui/material"
import React, { useState } from "react"
import DataGridItemToolbar from "./dataGrid/DataGridItemToolbar"
import { useGetItemsQuery, useRemoveItemsMutation } from "./redux/itemApiSlice"
import { useDispatch, useSelector } from "react-redux"
import { selectPagination, setPagination } from "./redux/itemSlice"
import inventoryColumn from "./dataGrid/inventoryColumn"
import DataGridCustomColumnMenu from "../../components/shared/DataGridCustomColumnMenu"
import TabPanel from "../../components/shared/TabPanel"
import RemoveItemDialog from "./dialogs/RemoveItemDialog"
import ItemDialog from "./dialogs/ItemDialog"
import DashboardHeader from "../../components/shared/dashboard/DashboardHeader"
import { useMemo } from "react"
import StyledDataGrid from "../../components/styled/datagrid/StyledDataGrid"
import NewItemForm from "./NewItemForm"
import { useLocation } from "react-router-dom"
import StyledBreadcrumb from "../../components/styled/breadCrumbs/StyledBreadcrumbs"
import { useEffect } from "react"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"

const Inventory = () => {
    const dispatch = useDispatch()
    const { hash } = useLocation()
    const pagination = useSelector(selectPagination)
    const [item, setItem] = useState()
    const [alertData, setAlertData] = useState({
        open: false,
        type: "success",
        message: "",
    })
    const [highlightedWord, setHighlightedWord] = useState({
        name: "",
        category: "",
    })
    const memoizedColumn = useMemo(
        () => inventoryColumn({ highlightedWord }),
        [highlightedWord]
    )

    const [tabIndex, setTabIndex] = useState(0)
    const [openItemDialog, setOpenItemDialog] = useState(false)
    const [selectedRows, setSelectedRows] = useState()
    const [isRemoveItemDialogOpen, setIsRemoveItemDialogOpen] = useState(false)
    const [isLoadingGenerateItem, setIsLoadingGenerateItem] = useState(false)

    useEffect(() => {
        if (hash === "#create") {
            setTabIndex(1)
        } else {
            setTabIndex(0)
        }
    }, [hash])

    const {
        data,
        isLoading: isLoadingItems,
        isFetching: isFetchingItems,
    } = useGetItemsQuery(
        { ...pagination },
        {
            // pollingInterval: 3000,
            refetchOnFocus: true,
            refetchOnMountOrArgChange: true,
            refetchOnReconnect: true,
            keepUnusedDataFor: 10,
        }
    )

    // console.log(
    //     "🚀 ~ file: Inventory.jsx:109 ~ Inventory ~ data:",
    //     isFetchingItems
    // )

    const [
        removeItems,
        {
            isLoading: isLoadingRemoveItems,
            isSuccess: isSuccessRemoveItems,
            isError: isErrorRemoveItems,
            error: errorRemoveItems,
        },
    ] = useRemoveItemsMutation()

    const handleAddNewItem = () => {
        setTabIndex(1)
    }

    const handleRemoveItems = async () => {
        if (selectedRows.length > 0) {
            const result = await removeItems({
                ids: selectedRows,
            })

            if (result) {
                setAlertData((prev) => {
                    return {
                        ...prev,
                        open: true,
                        type: "warning",
                        message: `${selectedRows?.length} item/s moved to trash`,
                    }
                })
                setSelectedRows([])
                handleCloseConfirmRemoveItem()
            }

            console.log(
                "🚀 ~ file: Inventory.jsx:110 ~ setAlertData ~ setAlertData:",
                alertData
            )
        }
    }

    const handleResetSelectedRows = () => {
        setSelectedRows([])
    }

    const handleOpenItemDialog = (column) => {
        setItem(column.row)
        setOpenItemDialog(true)
    }

    const handleCloseItemDialog = ({ status }) => {
        setOpenItemDialog(false)

        if (status) {
            setAlertData((prev) => {
                return {
                    ...prev,
                    open: true,
                    message: `item ${status?.id} successfully updated`,
                }
            })
        }
    }

    const handlePagination = (props) => {
        const page = props.page + 1
        const perPage = props.pageSize

        dispatch(setPagination({ page, perPage }))
    }

    const handleOnRowSelection = (rows) => {
        setSelectedRows(rows)
    }

    const handleOnSortChange = (sort) => {
        dispatch(setPagination({ sort }))
    }

    const handleLoadingGeneratedItemStatus = ({ loading }) => {
        setIsLoadingGenerateItem(loading)
    }

    const handleOpenConfirmRemoveItem = () => {
        setIsRemoveItemDialogOpen(true)
    }

    const handleCloseConfirmRemoveItem = () => {
        setIsRemoveItemDialogOpen(false)
    }

    const handleFilter = (keySearched) => {
        setHighlightedWord({
            name: keySearched.name,
            category: keySearched.category,
        })

        dispatch(
            setPagination({
                search: keySearched.name,
                category: keySearched.category,
            })
        )
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === "clickaway") {
            return
        }

        setAlertData({ open: false })
    }

    const handleReturnToInventory = () => {
        setTabIndex(0)
    }

    const handleAddItemCallback = (name) => {
        if (name) {
            setAlertData((prev) => {
                return {
                    ...prev,
                    open: true,
                    message: `item ${name} successfully added`,
                }
            })
        }
    }

    return (
        <React.Fragment>
            <Box>
                <DashboardHeader
                    title={tabIndex === 0 ? "Items" : "New item"}
                />

                <Breadcrumbs sx={{ marginBottom: 3 }} aria-label="breadcrumb">
                    <StyledBreadcrumb label="Inventory" />

                    <StyledBreadcrumb label="items" />

                    {tabIndex === 1 && <StyledBreadcrumb label="create" />}
                </Breadcrumbs>

                <TabPanel value={tabIndex} index={0}>
                    <Box>
                        <StyledDataGrid
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: pagination.perPage,
                                    },
                                },
                                columns: {
                                    memoizedColumn,
                                    columnVisibilityModel: {
                                        _id: false,
                                        updatedAt: false,
                                    },
                                },
                            }}
                            loading={
                                isLoadingItems ||
                                !data ||
                                isLoadingRemoveItems ||
                                isLoadingGenerateItem ||
                                isFetchingItems
                            }
                            columns={memoizedColumn}
                            rows={(data && data.items) || []}
                            rowCount={
                                (data && data.pageDetails.totalItems) || 0
                            }
                            getRowId={(items) => items._id}
                            checkboxSelection
                            rowSelectionModel={selectedRows}
                            disableRowSelectionOnClick
                            keepNonExistentRowsSelected
                            paginationMode="server"
                            sortingMode="server"
                            pagination
                            pageSizeOptions={[10, 25, 50, 100]}
                            onRowClick={handleOpenItemDialog}
                            onPaginationModelChange={handlePagination}
                            onSortModelChange={handleOnSortChange}
                            onRowSelectionModelChange={handleOnRowSelection}
                            components={{
                                Toolbar: DataGridItemToolbar,
                                columnMenu: DataGridCustomColumnMenu,
                            }}
                            componentsProps={{
                                toolbar: {
                                    categories: data?.categories,
                                    selectedRows,
                                    handleAddNewItem,
                                    handleOpenConfirmRemoveItem,
                                    handleResetSelectedRows,
                                    handleFilter,
                                    handleLoadingGeneratedItemStatus,
                                },
                            }}
                        />
                    </Box>
                </TabPanel>

                <TabPanel value={tabIndex} index={1}>
                    <Box
                        sx={{
                            display: { xs: "block", md: "flex" },
                            gap: 2,
                        }}
                    >
                        <Box sx={{ order: { sx: 1, md: 2 } }}>
                            <Button
                                onClick={handleReturnToInventory}
                                startIcon={<ArrowBackIosIcon />}
                                disableElevation
                            >
                                Back
                            </Button>
                        </Box>

                        <Box
                            sx={{
                                order: { sx: 2, md: 1 },
                                padding: 4,
                                backgroundColor: "white",
                                maxWidth: { sx: "100%", md: "66ch" },
                                borderRadius: 1,
                            }}
                        >
                            <NewItemForm
                                categories={data?.categories}
                                handleAddItemCallback={handleAddItemCallback}
                            />
                        </Box>
                    </Box>
                </TabPanel>

                {isRemoveItemDialogOpen && (
                    <RemoveItemDialog
                        isRemoveItemDialogOpen={isRemoveItemDialogOpen}
                        handleCloseConfirmRemoveItem={
                            handleCloseConfirmRemoveItem
                        }
                        handleRemoveItems={handleRemoveItems}
                    />
                )}

                {openItemDialog && (
                    <ItemDialog
                        item={item}
                        categories={data?.categories}
                        openItemDialog={openItemDialog}
                        handleCloseItemDialog={handleCloseItemDialog}
                    />
                )}
            </Box>

            <Snackbar
                open={alertData.open}
                autoHideDuration={3000}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={handleCloseAlert}
                    severity={alertData?.type}
                    sx={{ width: "100%" }}
                >
                    {alertData.message}
                </Alert>
            </Snackbar>
        </React.Fragment>
    )
}

export default Inventory
