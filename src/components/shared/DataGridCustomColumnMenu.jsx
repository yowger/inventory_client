import { GridColumnMenu } from "@mui/x-data-grid"
import React from "react"

const DataGridCustomColumnMenu = (props) => {
    return (
        <GridColumnMenu
            {...props}
            slots={{
                // Hide `columnMenuColumnsItem`
                columnMenuFilterItem: null,
            }}
        />
    )
}

export default DataGridCustomColumnMenu
