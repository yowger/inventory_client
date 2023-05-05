// this is only meant for the demo, i do have a separate application
// solely for authentication with JWT and bcrypt using nodejs and react

const getUserInLocalStorage = () => {
    const user = localStorage.getItem("user")

    if (!user) return

    const parsedUser = JSON.parse(user)

    return parsedUser
}

const storeUserInLocalStorage = ({ id, name, role }) => {
    const jsonUser = JSON.stringify({ id, name, role })

    localStorage.setItem("user", jsonUser)
}

const clearUserInLocalStorage = () => {
    localStorage.removeItem("user")
}

export {
    storeUserInLocalStorage,
    getUserInLocalStorage,
    clearUserInLocalStorage,
}
