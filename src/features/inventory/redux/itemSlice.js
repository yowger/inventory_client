import { createSlice } from "@reduxjs/toolkit"

const itemSlice = createSlice({
    name: "item",
    initialState: {
        itemData: { isOpen: false, itemId: null },
        pagination: {
            page: 1,
            perPage: 10,
            search: "",
            sort: JSON.stringify(Array({ field: "createdAt", sort: "asc" })),
        },
        checkedList: [],
    },
    reducers: {
        setItemData: (state, action) => {
            const { isOpen, itemId } = action.payload
            state.itemData.itemId = itemId || null
            state.itemData.isOpen = isOpen || false
        },
        setPagination: (state, action) => {
            const { page, perPage, search, category, sort } = action.payload
            console.log(
                "🚀 ~ file: itemSlice.js:23 ~ action.payload:",
                action.payload
            )

            if (page) state.pagination.page = page
            if (perPage) state.pagination.perPage = perPage
            if (search || search === "")
                state.pagination.search = JSON.stringify(search)
            if (category) state.pagination.category = JSON.stringify(category)
            if (sort) state.pagination.sort = JSON.stringify(sort)
        },
        setItemCheckedList: (state, action) => {
            const { itemId } = action.payload

            if (state.checkedList.includes(itemId)) {
                state.checkedList = state.checkedList.filter(
                    (id) => id !== itemId
                )
            } else {
                state.checkedList.push(itemId)
            }

            state.checkedList.forEach((id, index) => {
                console.log(`checked id ${index}: ${id}`)
            })
        },
        clearItemCheckedList: (state, action) => {
            state.checkedList = []
        },
    },
})

export default itemSlice.reducer

export const {
    setItemData,
    setPagination,
    setItemCheckedList,
    clearItemCheckedList,
} = itemSlice.actions

export const selectItemData = (state) => state.item.itemData
export const selectPagination = (state) => state.item.pagination
export const selectCheckedList = (state) => state.item.checkedList
