import { useMemo } from "react"
import { Alert, Box, Snackbar } from "@mui/material"
import React, { useState } from "react"
import DataGridItemToolbar from "./dataGrid/DataGridItemToolbar"
import {
    useGetUsersQuery,
    useUpdateUserLoginMutation,
} from "./redux/accountsApiSlice"
import accountColumn from "./dataGrid/accountColumn"
import DataGridCustomColumnMenu from "../../components/shared/DataGridCustomColumnMenu"
import DashboardHeader from "../../components/shared/dashboard/DashboardHeader"
import StyledDataGrid from "../../components/styled/datagrid/StyledDataGrid"
import { useDispatch, useSelector } from "react-redux"
import { selectUser, setUser } from "../auth/redux/userSlice"
import { storeUserInLocalStorage } from "../../helpers/functions/userLocalStorage"
import { useCallback } from "react"

const Accounts = () => {
    const dispatch = useDispatch()
    const { id: userId } = useSelector(selectUser)

    const [alertData, setAlertData] = useState({
        open: false,
        type: "success",
        message: "",
    })

    const { data, isLoading: isLoadingUSers } = useGetUsersQuery()
    const [updateUserLogin, { isLoading: isLoadingUpdateUserLogin }] =
        useUpdateUserLoginMutation()

    const handleLogin = useCallback(
        async ({ id, name, role }) => {
            const result = await updateUserLogin({ id })

            if (result) {
                dispatch(setUser({ id, name, role }))
                storeUserInLocalStorage({ id, name, role })

                setAlertData((prev) => {
                    return {
                        ...prev,
                        open: true,
                        type: "success",
                        message: `Logged in as ${name}`,
                    }
                })
            }
        },
        [dispatch, updateUserLogin]
    )

    const memoizedColumn = useMemo(
        () => accountColumn({ userId, handleLogin }),
        [userId, handleLogin]
    )

    const handleCloseAlert = (event, reason) => {
        if (reason === "clickaway") {
            return
        }

        setAlertData({ open: false })
    }

    return (
        <React.Fragment>
            <Box>
                <DashboardHeader title="Accounts" />

                <StyledDataGrid
                    sx={styles.accountDataGrid}
                    initialState={{
                        columns: {
                            memoizedColumn,
                            columnVisibilityModel: {
                                _id: false,
                            },
                        },
                    }}
                    loading={
                        isLoadingUSers || !data || isLoadingUpdateUserLogin
                    }
                    columns={memoizedColumn}
                    rows={data || []}
                    getRowId={(items) => items._id}
                    hideFooterPagination
                    hideFooterSelectedRowCount
                    autoHeight={true}
                    components={{
                        Toolbar: DataGridItemToolbar,
                        columnMenu: DataGridCustomColumnMenu,
                    }}
                />
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

/** @type {import("@mui/material").SxProps} */
const styles = {
    accountDataGrid: {
        "& .MuiDataGrid-footerContainer": {
            display: "none",
        },
    },
}

export default Accounts
