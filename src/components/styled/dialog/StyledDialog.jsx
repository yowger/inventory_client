import { Dialog } from "@mui/material"
import { grey } from "@mui/material/colors"
import { styled } from "@mui/system"

// const StyledDialog = styled(Dialog)({
//     "& .MuiDialogActions-root": {
//         padding: 10,
//     },
// })

/** @type {import("@mui/material").SxProps} */
const StyledDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        paddingInline: theme.spacing(4),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        // borderTop: "solid",
        // borderWidth: "1px",
        // borderColor: grey[300],
        paddingInline: theme.spacing(3),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        backgroundColor: grey[100],
    },
}))

export default StyledDialog
