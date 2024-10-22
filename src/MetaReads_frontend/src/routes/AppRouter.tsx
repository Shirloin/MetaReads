import { createBrowserRouter } from "react-router-dom";
import BaseLayout from "../components/Layout/BaseLayout";
// import DebugPage from "../page/DebugPage";
import LoginPage from "../page/LoginPage";
import StorePage from "../page/StorePage";
import LibraryPage from "../page/LibraryPage";
import SubscriptionPage from "../page/SubscriptionPage";
import AuthorPage from "../page/Admin/AuthorPage";
import GenrePage from "../page/Admin/GenrePage";
import BookPage from "../page/Admin/BookPage";
import RegisterPage from "../page/RegisterPage";
import BookDetailPage from "../page/BookDetailPage";
import DebugPage from "../page/DebugPage";
import Testing from "../page/Testing";
import HomePage from "../page/HomePage";
import { AdminProtectedRoute, UserProtectedRoute } from "./ProtectedRoutes";

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
        path: "/store",
        element: <StorePage />,
      },
      {
        path: "/library",
        element: (
          <UserProtectedRoute>
            <LibraryPage />
          </UserProtectedRoute>
        ),
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
        path: "/register/:internetIdentityId",
        element: <RegisterPage />,
      },
      // Debug
      {
        path: "/debug",
        element: <DebugPage />,
      },
      // Admin
      {
        path: "/admin/author",
        element: (
          <AdminProtectedRoute>
            <AuthorPage />
          </AdminProtectedRoute>
        ),
      },
      {
        path: "/admin/genre",
        element: (
          <AdminProtectedRoute>
            <GenrePage />
          </AdminProtectedRoute>
        ),
      },
      {
        path: "/admin/book",
        element: (
          <AdminProtectedRoute>
            <BookPage />
          </AdminProtectedRoute>
        ),
      },
      {
        path: "/book/:bookId",
        element: <BookDetailPage />,
      },
      {
        path: "/testing",
        element: <Testing />,
      },
    ],
  },
]);

export default router;
