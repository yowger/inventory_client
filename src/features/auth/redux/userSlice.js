import { createSlice } from "@reduxjs/toolkit"
import { clearUserInLocalStorage } from "../../../helpers/functions/userLocalStorage"

const userSlice = createSlice({
    name: "user",
    initialState: {
        data: {
            id: null,
            name: null,
            role: null,
        },
    },
    reducers: {
        setUser: (state, action) => {
            const { id, name, role } = action.payload

            state.data.id = id
            state.data.name = name
            state.data.role = role
        },
        logOut: (state, action) => {
            state.data.id = null
            state.data.name = null
            state.data.role = null

            clearUserInLocalStorage()
        },
    },
})

export default userSlice.reducer

export const { setUser, logOut } = userSlice.actions

export const selectUser = (state) => state.user.data
