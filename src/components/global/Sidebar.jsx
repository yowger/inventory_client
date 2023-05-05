import React from "react"
import { Link, useLocation } from "react-router-dom"
import { Box, Typography } from "@mui/material"
import {
    Menu,
    MenuItem,
    Sidebar as SidebarPro,
    useProSidebar,
} from "react-pro-sidebar"
import { grey } from "@mui/material/colors"
import GroupIcon from "@mui/icons-material/Group"
import HomeIcon from "@mui/icons-material/Home"
import DeleteIcon from "@mui/icons-material/Delete"
import InventoryIcon from "@mui/icons-material/Inventory"
import AddBoxIcon from "@mui/icons-material/AddBox"
import HistoryIcon from "@mui/icons-material/History"
import { selectUser } from "../../features/auth/redux/userSlice"
import { useSelector } from "react-redux"

const Sidebar = () => {
    const { role } = useSelector(selectUser)
    const location = useLocation()
    const { collapsed } = useProSidebar()

    return (
        <SidebarPro
            backgroundColor={grey[800]}
            style={styles().sidebar}
            breakPoint="md"
        >
            <Box sx={styles(collapsed).logoContainer}>
                {!collapsed ? (
                    <Typography as="h1">StoreBox</Typography>
                ) : (
                    <Typography as="h1">SB</Typography>
                )}
            </Box>

            <Menu
                menuItemStyles={{
                    button: ({ active }) => {
                        return {
                            "&:hover": {
                                backgroundColor: grey[600],
                            },
                            color: grey[50],
                            backgroundColor: active ? grey[700] : undefined,
                        }
                    },
                }}
            >
                <MenuItem
                    component={<Link to="/" />}
                    active={location.pathname === "/"}
                    icon={<HomeIcon />}
                >
                    {!collapsed && (
                        <Typography variant="body2">Dashboard</Typography>
                    )}
                </MenuItem>

                <MenuItem
                    component={<Link to="/accounts" />}
                    active={location.pathname === "/accounts"}
                    icon={<GroupIcon />}
                >
                    {!collapsed && (
                        <Typography variant="body2">Accounts</Typography>
                    )}
                </MenuItem>

                {!collapsed && role && (
                    <Box sx={styles().menuItemTitle}>Inventory</Box>
                )}

                {(role === "admin" || role === "editor" || role === "user") && (
                    <MenuItem
                        component={<Link to="/inventory" />}
                        active={
                            location.pathname === "/inventory" && !location.hash
                        }
                        icon={<InventoryIcon />}
                    >
                        {!collapsed && (
                            <Typography variant="body2">Items</Typography>
                        )}
                    </MenuItem>
                )}

                {(role === "admin" || role === "editor" || role === "user") && (
                    <MenuItem
                        component={<Link to="/inventory#create" />}
                        active={
                            location.pathname === "/inventory" &&
                            location.hash === "#create"
                        }
                        icon={<AddBoxIcon />}
                    >
                        {!collapsed && (
                            <Typography variant="body2">Create</Typography>
                        )}
                    </MenuItem>
                )}

                {(role === "admin" || role === "editor") && (
                    <MenuItem
                        component={<Link to="/history" />}
                        active={location.pathname === "/history"}
                        icon={<HistoryIcon />}
                    >
                        {!collapsed && (
                            <Typography variant="body2">History</Typography>
                        )}
                    </MenuItem>
                )}

                {role === "admin" && (
                    <MenuItem
                        component={<Link to="/trash" />}
                        active={location.pathname === "/trash"}
                        icon={<DeleteIcon />}
                    >
                        {!collapsed && (
                            <Typography variant="body2">Trash</Typography>
                        )}
                    </MenuItem>
                )}
            </Menu>
        </SidebarPro>
    )
}

/** @type {import("@mui/material").SxProps} */
const styles = (collapsed) => {
    return {
        sidebar: {
            height: "100%",
            top: "auto",
            zIndex: "1300",
            backgroundColor: "red",
        },
        menuItemTitle: {
            color: grey[50],
            px: 3,
            py: 2,
            backgroundColor: grey[800],
        },
        logoContainer: {
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "normal",
            mx: collapsed ? 0 : 4,
            fontSize: "24px",
            "& h1": {
                fontSize: "1.375rem",
            },
            color: grey[50],
        },
    }
}

export default Sidebar
