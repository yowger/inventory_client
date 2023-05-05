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
            // sx={styles.confirmDialog}
            fullWidth={true}
            maxWidth="sm"
        >
            <DialogTitle id="alert-dialog-title">
                Are you sure you want to remove the selected items
            </DialogTitle>

            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Removed items will be moved to the trash bin where it can be
                    completely removed or restored by the admin
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
                    Remove
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default memo(RemoveItemDialog)
