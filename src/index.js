import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ProSidebarProvider } from "react-pro-sidebar"
import CssBaseline from "@mui/material/CssBaseline"
import App from "./App"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <React.StrictMode>
        <CssBaseline />
        <Provider store={store}>
            <ProSidebarProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/*" element={<App />} />
                    </Routes>
                </BrowserRouter>
            </ProSidebarProvider>
        </Provider>
    </React.StrictMode>
)
