import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useProSidebar } from "react-pro-sidebar"
import {
    AppBar,
    Box,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined"
import { blue, grey } from "@mui/material/colors"
import { useDispatch, useSelector } from "react-redux"
import { selectUser, logOut } from "../../features/auth/redux/userSlice"

const Navbar = () => {
    const dispatch = useDispatch()

    const user = useSelector(selectUser)

    const { collapseSidebar, toggleSidebar, broken } = useProSidebar()
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleSidebar = () => {
        broken ? toggleSidebar() : collapseSidebar()
    }

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    const handleLogout = () => {
        setAnchorEl(null)
        dispatch(logOut())
    }

    return (
        <React.Fragment>
            <AppBar sx={styles.navbar}>
                <Toolbar>
                    <IconButton onClick={handleSidebar}>
                        <MenuIcon />
                    </IconButton>

                    <Box sx={{ flexGrow: 1 }} />

                    {user?.id ? (
                        <Box>
                            <Button
                                onClick={handleMenuOpen}
                                aria-controls={open ? "user-menu" : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                                sx={styles.profileButton}
                            >
                                <Box
                                    component="img"
                                    alt="profile"
                                    src={
                                        "https://i.pinimg.com/474x/3c/67/68/3c6768809fccef1175b8daf6a0dbd346.jpg"
                                    }
                                    sx={styles.profileImage}
                                />

                                <Box sx={styles.profileText}>
                                    <Typography sx={styles.username}>
                                        {user?.name}
                                    </Typography>

                                    <Typography sx={styles.userRole}>
                                        {user?.role}
                                    </Typography>
                                </Box>

                                <ArrowDropDownOutlinedIcon
                                    sx={styles.arrowDown}
                                />
                            </Button>
                        </Box>
                    ) : (
                        <Button sx={styles.login}>
                            <Link to="/accounts">Login</Link>
                        </Button>
                    )}
                </Toolbar>
            </AppBar>

            <Menu
                id="user-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
            >
                <MenuItem onClick={handleLogout}>Log Out</MenuItem>
            </Menu>
        </React.Fragment>
    )
}

/** @type {import("@mui/material").SxProps} */
const styles = {
    navbar: {
        position: "sticky",
        background: grey[50],
        boxShadow: "none",
        backgroundColor: "white",
        borderBottomStyle: "solid",
        borderBottomColor: grey[300],
        borderBottomWidth: "1px",
    },
    profileButton: {
        // display: "flex",
        // alignItems: "center",
        textTransform: "none",
        gap: "1rem",
    },
    profileImage: {
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        objectFit: "cover",
    },
    profileText: {
        textAlign: "left",
    },
    username: {
        fontWeight: "bold",
        fontSize: "0.85rem",
    },
    userRole: {
        fontSize: "0.75rem",
        textTransform: "capitalize",
    },
    arrowDown: {
        fontSize: "1.6rem",
    },
    login: {
        "& a": {
            textDecoration: "none",
            color: blue[700],
        },
    },
}

export default Navbar
