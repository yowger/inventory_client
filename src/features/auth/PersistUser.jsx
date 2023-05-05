import React from "react"
import { useDispatch } from "react-redux"
import { Outlet } from "react-router-dom"
import { setUser } from "./redux/userSlice"
import { getUserInLocalStorage } from "../../helpers/functions/userLocalStorage"

const PersistUser = () => {
    const dispatch = useDispatch()

    let user = getUserInLocalStorage() || null

    if (user) {
        dispatch(setUser({ ...user }))
    }

    return <Outlet />
}

export default PersistUser
