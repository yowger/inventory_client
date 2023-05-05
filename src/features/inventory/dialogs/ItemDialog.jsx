import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import {
    Button,
    DialogActions,
    DialogContent,
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material"
import { useUpdateItemMutation } from "../redux/itemApiSlice"
import validateItem from "../yupResolver/validateItem"
import React, { memo, useState } from "react"
import { useEffect } from "react"
import { useCallback } from "react"
import StyledDialog from "../../../components/styled/dialog/StyledDialog"
import StyledDialogTitle from "../../../components/styled/dialog/StyledDialogTitle"

const ItemDialog = ({
    openItemDialog,
    item,
    categories,
    handleCloseItemDialog,
}) => {
    const [total, setTotal] = useState(0)

    const [updateItem, { isLoading, isSuccess, isError, error }] =
        useUpdateItemMutation()

    const {
        handleSubmit,
        watch,
        setValue,
        control,
        formState: { errors },
        clearErrors,
    } = useForm({
        criteriaMode: "all",
        resolver: yupResolver(validateItem),
    })

    const [price, quantity] = watch(["price", "quantity"])

    const calculateTotal = useCallback(() => {
        setTotal(price * quantity)
    }, [price, quantity])

    useEffect(() => {
        if (item) {
            setValue("name", item?.name)
            setValue("category", item?.tags)
            setValue("description", item?.description)
            setValue("price", item?.price)
            setValue("quantity", item?.quantity)
            clearErrors()
        }
    }, [setValue, clearErrors, item])

    useEffect(() => {
        if (price && quantity) {
            calculateTotal()
        }
    }, [price, quantity, calculateTotal])

    // console.log("🚀 ~ file: ItemDialog.jsx:35 ~ ItemDialog ~ errors:", errors)

    const handleUpdateItem = async (formData) => {
        if (!item?._id) return

        const data = {
            id: item?._id,
            adminId: item?.adminId,
            tags: formData?.category,
            ...formData,
        }

        const result = await updateItem({
            ...data,
        })

        const status = {
            success: result ? true : false,
            id: result ? item?._id : "",
        }

        if (result) {
            handleCloseItemDialog({ status })
        }
    }

    // const handleRemoveItems = async () => {
    //     if (selectedRows.length > 0) {
    //         const result = await removeItems({
    //             ids: selectedRows,
    //         })

    //         if (result) {
    //             setSelectedRows([])
    //         }
    //     }

    //     handleCloseConfirmRemoveItem()
    // }

    return (
        <StyledDialog
            open={openItemDialog}
            onClose={handleCloseItemDialog}
            fullWidth={true}
            maxWidth="sm"
        >
            <StyledDialogTitle onClose={handleCloseItemDialog}>
                Edit item
            </StyledDialogTitle>
            {/* sx={{ paddingX: 4 }} */}
            <DialogContent>
                <form onSubmit={handleSubmit(handleUpdateItem)}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Controller
                                control={control}
                                name={"name"}
                                render={({
                                    field: { onChange, onBlur, value, ref },
                                }) => (
                                    <TextField
                                        variant="standard"
                                        label="name"
                                        value={value}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        error={!!errors?.name}
                                        helperText={errors?.name?.message}
                                        fullWidth
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl variant="standard" fullWidth>
                                <InputLabel id="category">Category</InputLabel>

                                <Controller
                                    control={control}
                                    name="category"
                                    render={({
                                        field: { onChange, onBlur, value, ref },
                                    }) => (
                                        <Select
                                            labelId="category"
                                            label="Category"
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                        >
                                            {categories?.map((category) => (
                                                <MenuItem
                                                    key={category}
                                                    value={category}
                                                >
                                                    {category}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <Controller
                                control={control}
                                name={"description"}
                                render={({
                                    field: { onChange, onBlur, value, ref },
                                }) => (
                                    <TextField
                                        variant="standard"
                                        label="Description"
                                        value={value}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        helperText={"max of 500 characters"}
                                        inputProps={{ maxLength: 500 }}
                                        fullWidth
                                        multiline
                                        rows={4}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Controller
                                control={control}
                                name={"price"}
                                render={({
                                    field: { onChange, onBlur, value, ref },
                                }) => (
                                    <TextField
                                        // type="number"
                                        variant="standard"
                                        label="price"
                                        value={value}
                                        error={!!errors?.price}
                                        helperText={errors?.price?.message}
                                        fullWidth
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    $
                                                </InputAdornment>
                                            ),
                                        }}
                                        onChange={(e) => {
                                            var regex = /^\d+\.{0,1}\d{0,2}$/

                                            if (
                                                e.target.value === "" ||
                                                regex.test(e.target.value)
                                            ) {
                                                return onChange({
                                                    target: {
                                                        value: e.target.value,
                                                    },
                                                })
                                            }
                                        }}
                                        onBlur={onBlur}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Controller
                                control={control}
                                name={"quantity"}
                                defaultValue={item?.quantity}
                                render={({
                                    field: { onChange, onBlur, value, ref },
                                }) => (
                                    <TextField
                                        // type="number"
                                        variant="standard"
                                        label="quantity"
                                        value={value}
                                        error={!!errors?.quantity}
                                        helperText={errors?.quantity?.message}
                                        fullWidth
                                        onChange={(e) => {
                                            var regex = /^-?[0-9\b]+$/

                                            if (
                                                e.target.value === "" ||
                                                regex.test(e.target.value)
                                            ) {
                                                return onChange({
                                                    target: {
                                                        value: e.target.value,
                                                    },
                                                })
                                            }
                                        }}
                                        onBlur={onBlur}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <TextField
                                variant="standard"
                                label="total"
                                value={total}
                                onChange={calculateTotal}
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
                                value={item?.createdAt}
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
                </form>
            </DialogContent>

            {/* sx={{ paddingX: 4, paddingY: 2 }} */}
            <DialogActions>
                <Button
                    onClick={handleSubmit(handleUpdateItem)}
                    variant="contained"
                    disableElevation
                >
                    Update
                </Button>
            </DialogActions>
        </StyledDialog>
    )
}

export default memo(ItemDialog)
