import {
    Button,
    DialogActions,
    DialogContent,
    Grid,
    InputAdornment,
    TextField,
} from "@mui/material"
import React, { memo } from "react"
import StyledDialog from "../../../components/styled/dialog/StyledDialog"
import StyledDialogTitle from "../../../components/styled/dialog/StyledDialogTitle"

const TrashDialog = ({
    openItemDialog,
    item,
    handleDeleteSingleItem,
    handleCloseItemDialog,
}) => {
    return (
        <StyledDialog
            open={openItemDialog}
            onClose={handleCloseItemDialog}
            fullWidth={true}
            maxWidth="sm"
        >
            <StyledDialogTitle onClose={handleCloseItemDialog}>
                Delete item
            </StyledDialogTitle>

            <DialogContent>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <TextField
                            variant="standard"
                            label="name"
                            defaultValue={item?.tags}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            variant="standard"
                            label="category"
                            defaultValue={item?.tags}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            variant="standard"
                            label="Description"
                            defaultValue={item?.description}
                            helperText={"max of 500 characters"}
                            inputProps={{ maxLength: 500 }}
                            fullWidth
                            multiline
                            rows={4}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <TextField
                            variant="standard"
                            label="price"
                            defaultValue={item?.price}
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        $
                                    </InputAdornment>
                                ),
                                readOnly: true,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <TextField
                            variant="standard"
                            label="quantity"
                            defaultValue={item?.quantity}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <TextField
                            variant="standard"
                            label="total"
                            defaultValue={item?.total}
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        $
                                    </InputAdornment>
                                ),
                                readOnly: true,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            variant="standard"
                            label="Date created"
                            defaultValue={item?.createdAt}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            variant="standard"
                            label="Date updated"
                            defaultValue={item?.updatedAt}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions>
                <Button
                    onClick={() => handleDeleteSingleItem({ id: item?._id })}
                    variant="contained"
                    disableElevation
                >
                    Delete
                </Button>
            </DialogActions>
        </StyledDialog>
    )
}

export default memo(TrashDialog)
