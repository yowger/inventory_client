import CloseIcon from "@mui/icons-material/Close"
import {
    Box,
    Chip,
    DialogTitle,
    emphasize,
    IconButton,
    styled,
} from "@mui/material"
import { grey } from "@mui/material/colors"

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor = grey[300]
    return {
        backgroundColor,
        height: theme.spacing(3),
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
        "&:hover, &:focus": {
            backgroundColor: emphasize(backgroundColor, 0.06),
        },
        "&:active": {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(backgroundColor, 0.12),
        },
    }
})

export default StyledBreadcrumb
