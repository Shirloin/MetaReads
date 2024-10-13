import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import DebugPage from "../page/DebugPage";
import LoginPage from "../page/LoginPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
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