import { Outlet } from "react-router-dom"
import Box from "@mui/material/Box"
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"
import { grey } from "@mui/material/colors"

const Layout = () => {
    return (
        <Box sx={styles.container}>
            <Sidebar />

            <Box sx={styles.main}>
                <Navbar />

                <Box sx={styles.content}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    )
}

/** @type {import("@mui/material").SxProps} */
const styles = {
    container: {
        height: "100%",
        width: "100%",
        display: "flex",
        // backgroundColor: grey[100],
        backgroundColor: grey[200],
    },
    main: {
        width: "100%",
        height: "100%",
        overflow: "auto",
    },
    content: {
        px: { xs: 2, sm: 3, md: 3 },
        py: { xs: 2, sm: 3, md: 3 },
        width: "100%",
        height: "calc(100% - 64px)",
    },
}

export default Layout
