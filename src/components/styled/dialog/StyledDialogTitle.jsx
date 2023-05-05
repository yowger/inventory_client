import CloseIcon from "@mui/icons-material/Close"
import { Box, DialogTitle, IconButton } from "@mui/material"
import { grey } from "@mui/material/colors"

function StyledDialogTitle(props) {
    const { children, onClose, ...other } = props

    return (
        <DialogTitle sx={styles.dialogTitle} {...other}>
            <Box sx={styles.typography}>{children}</Box>

            {onClose ? (
                <IconButton
                    sx={styles.closeIcon}
                    aria-label="close"
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    )
}

/** @type {import("@mui/material").SxProps} */
const styles = {
    dialogTitle: {
        display: "flex",
        alignItems: "center",
        margin: 0,
        paddingX: 4,
        paddingY: 2,
        color: grey[800],
    },
    typography: {
        flexGrow: 1,
    },
    closeIcon: {
        color: grey[500],
    },
}
export default StyledDialogTitle
