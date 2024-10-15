import { createBrowserRouter } from "react-router-dom";
import BaseLayout from "../components/Layout/BaseLayout";
import DebugPage from "../page/DebugPage";
import LoginPage from "../page/LoginPage";
import HomePage from "../page/HomePage";
import LibraryPage from "../page/LibraryPage";
import SubscriptionPage from "../page/SubscriptionPage";
import AuthorPage from "../page/Admin/AuthorPage";
import GenrePage from "../page/Admin/GenrePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      // User
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/library",
        element: <LibraryPage />,
      },
      {
        path: "/subscriptions",
        element: <SubscriptionPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      // Debug
      {
        path: "/debug",
        element: <DebugPage />,
      },
      // Admin
      {
        path: "/admin/author",
        element: <AuthorPage />,
      },
      {
        path: "/admin/genre",
        element: <GenrePage />,
      },
    ],
  },
]);

export default router;
