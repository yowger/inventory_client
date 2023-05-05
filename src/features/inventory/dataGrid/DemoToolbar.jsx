import React, { useState, useRef, useEffect } from "react"
import { useAddManyItemsMutation } from "../redux/itemApiSlice"
import { faker } from "@faker-js/faker"
import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import ClickAwayListener from "@mui/material/ClickAwayListener"
import Grow from "@mui/material/Grow"
import Paper from "@mui/material/Paper"
import Popper from "@mui/material/Popper"
import MenuItem from "@mui/material/MenuItem"
import MenuList from "@mui/material/MenuList"

const options = [
    { label: "Generate 1 item", value: 1 },
    { label: "Generate 5 items", value: 5 },
    { label: "Generate 10 items", value: 10 },
    { label: "Generate 25 items", value: 25 },
    { label: "Generate 50 items", value: 50 },
]

const DemoToolbar = ({ loadingStatus }) => {
    const [open, setOpen] = useState(false)
    const anchorRef = useRef(null)
    const [selectedIndex, setSelectedIndex] = useState(1)
    const [addManyItems, { isLoading, isSuccess, isError, error }] =
        useAddManyItemsMutation()

    useEffect(() => {
        if (isLoading) {
            loadingStatus({ loading: true })
        } else if (isSuccess) {
            loadingStatus({ loading: false })
        }
    }, [isLoading, isSuccess, loadingStatus])

    const createRandomItem = (arrayLength = 1) => {
        return [...Array(arrayLength)].map(() => ({
            adminId: "642c3cf6808eb65f52d7ea61",
            name: faker.commerce.productName(),
            price: faker.commerce.price(1, 1000),
            quantity: faker.datatype.number({
                min: -50,
                max: 100,
            }),
            description: faker.commerce.productDescription(),
            tags: faker.helpers.arrayElement([
                "Electronics",
                "Tools",
                "Clothing",
                "Toys",
                "Sports",
                "Health",
            ]),
            createdAt: faker.date.between(
                "2022-08-01T00:00:00.000Z",
                "2023-04-12T00:00:00.000Z"
            ),
        }))
    }

    const handleClick = async () => {
        const arrayLength = options[selectedIndex].value
        const generateRandomItems = createRandomItem(arrayLength)

        await addManyItems({
            data: generateRandomItems,
        })
    }

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index)
        setOpen(false)
    }

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen)
    }

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return
        }

        setOpen(false)
    }

    return (
        <React.Fragment>
            <ButtonGroup
                variant="contained"
                ref={anchorRef}
                aria-label="split button"
                disableElevation
            >
                <Button onClick={handleClick}>
                    {options[selectedIndex].label}
                </Button>

                <Button
                    size="small"
                    aria-controls={open ? "split-button-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleToggle}
                >
                    <ArrowDropDownIcon />
                </Button>
            </ButtonGroup>

            <Popper
                sx={{
                    zIndex: 1,
                }}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === "bottom"
                                    ? "center top"
                                    : "center bottom",
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu">
                                    {options.map((option, index) => (
                                        <MenuItem
                                            key={index}
                                            selected={index === selectedIndex}
                                            onClick={(event) =>
                                                handleMenuItemClick(
                                                    event,
                                                    index
                                                )
                                            }
                                        >
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </React.Fragment>
    )
}

export default DemoToolbar
