import React from "react"
import { Button, Chip } from "@mui/material"

const inventoryColumn = ({ userId, handleLogin }) => {
    return [
        {
            field: "_id",
            headerName: "ID",
            flex: 1,
            minWidth: 220,
        },
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            minWidth: 220,
        },
        {
            field: "role",
            headerName: "Role",
            flex: 1,
            minWidth: 70,
            renderCell: (params) => {
                let colorRole

                switch (params.row?.role) {
                    case "user":
                        colorRole = "success"
                        break
                    case "editor":
                        colorRole = "warning"
                        break
                    case "admin":
                        colorRole = "error"
                        break
                    default:
                }

                return (
                    <Chip
                        label={params.row.role}
                        color={colorRole}
                        size="small"
                    />
                )
            },
        },
        {
            field: "updatedAt",
            headerName: "Last login",
            flex: 1,
            minWidth: 70,
        },
        {
            field: "action",
            headerName: "Action",
            flex: 1,
            minWidth: 70,
            sortable: false,
            renderCell: (params) => {
                const { _id: id, name, role } = params.row

                if (userId === id) return

                return (
                    <Button
                        onClick={() => handleLogin({ id, name, role })}
                        variant="contained"
                        size="small"
                        disableElevation
                    >
                        Login
                    </Button>
                )
            },
        },
    ]
}

export default inventoryColumn
