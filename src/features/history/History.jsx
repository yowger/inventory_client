import { Breadcrumbs, Typography } from "@mui/material"
import { Box } from "@mui/system"
import React from "react"
import DashboardHeader from "../../components/shared/dashboard/DashboardHeader"
import StyledBreadcrumb from "../../components/styled/breadCrumbs/StyledBreadcrumbs"

const History = () => {
    return (
        <React.Fragment>
            <Box>
                <DashboardHeader title="History" />

                <Breadcrumbs sx={{ marginBottom: 3 }} aria-label="breadcrumb">
                    <StyledBreadcrumb label="Inventory" />

                    <StyledBreadcrumb label="History" />
                </Breadcrumbs>

                <Typography variant="h4">To be updated...</Typography>
            </Box>
        </React.Fragment>
    )
}

export default History
