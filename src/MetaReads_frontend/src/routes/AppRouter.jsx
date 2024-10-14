import { createBrowserRouter } from "react-router-dom";
import BaseLayout from "../components/Layout/BaseLayout";
import DebugPage from "../page/DebugPage";
import LoginPage from "../page/LoginPage";
import HomePage from "../page/HomePage";
import LibraryPage from "../page/LibraryPage";
import SubscriptionPage from "../page/SubscriptionPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <BaseLayout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/library",
                element: <LibraryPage />
            },
            {
                path: "/subscriptions",
                element: <SubscriptionPage />
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