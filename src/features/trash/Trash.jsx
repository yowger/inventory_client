import { Alert, Box, Breadcrumbs, Snackbar } from "@mui/material"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import DataGridItemToolbar from "./dataGrid/DataGridItemToolbar"
import {
    useGetInactiveItemsQuery,
    useDeleteItemMutation,
} from "./redux/trashApiSlice"
import { useDispatch, useSelector } from "react-redux"
import { selectPagination, setPagination } from "./redux/trashSlice"
import inventoryColumn from "./dataGrid/inventoryColumn"
import DataGridCustomColumnMenu from "../../components/shared/DataGridCustomColumnMenu"
import RemoveItemDialog from "./dialogs/RemoveItemDialog"
import TrashDialog from "./dialogs/TrashDialog"
import DashboardHeader from "../../components/shared/dashboard/DashboardHeader"
import { useMemo } from "react"
import StyledDataGrid from "../../components/styled/datagrid/StyledDataGrid"
import StyledBreadcrumb from "../../components/styled/breadCrumbs/StyledBreadcrumbs"

const Trash = () => {
    const dispatch = useDispatch()
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

    const [openItemDialog, setOpenItemDialog] = useState(false)
    const [selectedRows, setSelectedRows] = useState()
    const [isRemoveItemDialogOpen, setIsRemoveItemDialogOpen] = useState(false)

    const {
        data,
        isLoading: isLoadingItems,
        isFetching: isFetchingItems,
    } = useGetInactiveItemsQuery(
        { ...pagination },
        {
            // pollingInterval: 3000,
            refetchOnFocus: true,
            refetchOnMountOrArgChange: true,
            refetchOnReconnect: true,
            keepUnusedDataFor: 10,
        }
    )

    const [deleteItems, { isLoading: isLoadingDeleteItems }] =
        useDeleteItemMutation()

    const handleDeleteItems = async ({ ids = selectedRows }) => {
        if (ids.length > 0) {
            const result = await deleteItems({
                ids,
            })

            if (result) {
                setAlertData((prev) => {
                    return {
                        ...prev,
                        open: true,
                        type: "warning",
                        message: `${ids?.length} item/s deleted`,
                    }
                })
                setSelectedRows([])
                handleCloseConfirmRemoveItem()
            }
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

    const handleDeleteSingleItem = ({ id }) => {
        handleDeleteItems({ ids: Array(id) })
        setOpenItemDialog(false)
    }

    return (
        <React.Fragment>
            <Box>
                <DashboardHeader title="Trash" />

                <Breadcrumbs sx={{ marginBottom: 3 }} aria-label="breadcrumb">
                    <Link to="/inventory">
                        <StyledBreadcrumb label="Inventory" />
                    </Link>

                    <StyledBreadcrumb label="trash" />
                </Breadcrumbs>

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
                            isLoadingDeleteItems ||
                            isFetchingItems
                        }
                        columns={memoizedColumn}
                        rows={(data && data.items) || []}
                        rowCount={(data && data.pageDetails.totalItems) || 0}
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
                                handleOpenConfirmRemoveItem,
                                handleResetSelectedRows,
                                handleFilter,
                            },
                        }}
                    />
                </Box>

                {isRemoveItemDialogOpen && (
                    <RemoveItemDialog
                        isRemoveItemDialogOpen={isRemoveItemDialogOpen}
                        handleCloseConfirmRemoveItem={
                            handleCloseConfirmRemoveItem
                        }
                        handleRemoveItems={handleDeleteItems}
                    />
                )}

                {openItemDialog && (
                    <TrashDialog
                        item={item}
                        openItemDialog={openItemDialog}
                        handleDeleteSingleItem={handleDeleteSingleItem}
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

export default Trash
