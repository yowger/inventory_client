import { Box } from "@mui/material"

const TabPanel = ({ children, value, index }) => {
    return (
        <div hidden={value !== index} id={`simple-tabpanel-${index}`}>
            {value === index && <Box>{children}</Box>}
        </div>
    )
}

export default TabPanel
