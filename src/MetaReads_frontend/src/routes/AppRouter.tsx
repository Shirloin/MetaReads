import { createBrowserRouter } from "react-router-dom";
import BaseLayout from "../components/Layout/BaseLayout";
// import DebugPage from "../page/DebugPage";
import LoginPage from "../page/LoginPage";
import HomePage from "../page/HomePage";
import LibraryPage from "../page/LibraryPage";
import SubscriptionPage from "../page/SubscriptionPage";
import AuthorPage from "../page/Admin/AuthorPage";
import GenrePage from "../page/Admin/GenrePage";
import BookPage from "../page/Admin/BookPage";
import RegisterPage from "../page/RegisterPage";

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
      {
        path: "/register",
        element: <RegisterPage />,
      },
      // // Debug
      // {
      //   path: "/debug",
      //   element: <DebugPage />,
      // },
      // Admin
      {
        path: "/admin/author",
        element: <AuthorPage />,
      },
      {
        path: "/admin/genre",
        element: <GenrePage />,
      },
      {
        path: "/admin/book",
        element: <BookPage />,
      },
    ],
  },
]);

export default router;
