import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import DebugPage from "../page/DebugPage";
import LoginPage from "../page/LoginPage";
import HomePage from "../page/HomePage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/debug",
                element: <DebugPage />
            },
            {
                path: "/login",
                element: <LoginPage />
            }
        ]
    }
])

export default router;