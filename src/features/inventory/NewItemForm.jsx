import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material"
import { useAddItemMutation } from "./redux/itemApiSlice"
import validateItem from "./yupResolver/validateItem"
import React, { useState } from "react"
import { useEffect } from "react"
import { useCallback } from "react"

const NewItemForm = ({ categories, handleAddItemCallback }) => {
    const [total, setTotal] = useState(0)

    const [addItem, { isLoading, isSuccess, isError, error }] =
        useAddItemMutation()

    const {
        handleSubmit,
        watch,
        reset,
        control,
        formState: { errors },
    } = useForm({
        criteriaMode: "all",
        resolver: yupResolver(validateItem),
    })

    const [price, quantity] = watch(["price", "quantity"])

    const calculateTotal = useCallback(() => {
        setTotal(price * quantity)
    }, [price, quantity])

    useEffect(() => {
        if (price && quantity) {
            calculateTotal()
        }
    }, [price, quantity, calculateTotal])

    const handleAddItem = async (formData) => {
        const { name, category, description, price, quantity } = formData

        const result = await addItem({
            name,
            adminId: "642c3cf6808eb65f52d7ea61",
            tags: category,
            description,
            price,
            quantity,
        })

        if (result) {
            reset()
            handleAddItemCallback(name)
        }
    }

    return (
        <Box>
            <form onSubmit={handleSubmit(handleAddItem)}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Controller
                            control={control}
                            name={"name"}
                            render={({
                                field: { onChange, onBlur, value = "", ref },
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
                        <Controller
                            control={control}
                            name={"category"}
                            render={({
                                field: { onChange, onBlur, value = "", ref },
                            }) => {
                                return (
                                    <FormControl
                                        variant="standard"
                                        fullWidth
                                        error={!!errors?.category}
                                    >
                                        <InputLabel id="category">
                                            Category
                                        </InputLabel>

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
                                        {errors?.category?.message && (
                                            <FormHelperText>
                                                {errors?.category?.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                )
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            control={control}
                            name={"description"}
                            render={({
                                field: { onChange, onBlur, value = "", ref },
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
                                field: { onChange, onBlur, value = "", ref },
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
                            render={({
                                field: { onChange, onBlur, value = "", ref },
                            }) => (
                                <TextField
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

                    <Grid item xs={12}>
                        <Box
                            sx={{ display: "flex", justifyContent: "flex-end" }}
                        >
                            <Button
                                onClick={handleSubmit(handleAddItem)}
                                variant="contained"
                                disableElevation
                            >
                                Add
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Box>
    )
}

export default NewItemForm
