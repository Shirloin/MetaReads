import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import DebugPage from "../pages/DebugPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "debug",
                element: <DebugPage />
            }
        ]
    }
])

export default router;