import { Routes, Route } from "react-router-dom"
import Layout from "./components/global/Layout"
import Dashboard from "./features/dashboard/Dashboard"
import Inventory from "./features/inventory/Inventory"
import Trash from "./features/trash/Trash"
import Accounts from "./features/accounts/Accounts"
import PersistUser from "./features/auth/PersistUser"
import History from "./features/history/History"

const App = () => {
    return (
        <Routes>
            <Route path="" element={<Layout />}>
                <Route element={<PersistUser />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/accounts" element={<Accounts />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/trash" element={<Trash />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default App
