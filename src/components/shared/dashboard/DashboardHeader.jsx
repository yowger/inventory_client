import { Typography } from "@mui/material"
import { grey } from "@mui/material/colors"

const DashboardHeader = ({ title }) => {
    return (
        <Typography sx={styles.dashboardHeader} as="h1" variant="h4">
            {title}
        </Typography>
    )
}

export default DashboardHeader

/** @type {import("@mui/material").SxProps} */
const styles = {
    dashboardHeader: {
        marginBottom: 1,
        color: grey[800],
    },
}
