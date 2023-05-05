import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material"
import React, { memo } from "react"

const RemoveItemDialog = ({
    isRemoveItemDialogOpen,
    handleCloseConfirmRemoveItem,
    handleRemoveItems,
}) => {
    return (
        <Dialog
            open={isRemoveItemDialogOpen}
            onClose={handleCloseConfirmRemoveItem}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth={true}
            maxWidth="sm"
        >
            <DialogTitle id="alert-dialog-title">
                Click delete to remove the selected items
            </DialogTitle>

            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Once the items are removed they can never be recovered
                    again.
                </DialogContentText>
            </DialogContent>

            <DialogActions
            //  sx={styles.dialogBottom}
            >
                <Button
                    onClick={handleCloseConfirmRemoveItem}
                    // sx={styles.neutralButton}
                >
                    Cancel
                </Button>

                <Button
                    onClick={handleRemoveItems}
                    autoFocus
                    variant="contained"
                    color="error"
                    disableElevation
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default memo(RemoveItemDialog)
