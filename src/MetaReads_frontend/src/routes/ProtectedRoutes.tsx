import { Navigate } from "react-router-dom";
import { useUser } from "../lib/user_provider";

export const AdminProtectedRoute = ({ element }: any) => {
    const { isAdmin } = useUser();

    if (!isAdmin) {
        // Redirect non-admin users to home page
        return <Navigate to="/" replace />;
    }

    return element;
};

export const UserProtectedRoute = ({ element }: any) => {
    const { user } = useUser();

    if (!user) {
        // Redirect non-logged-in users to the login page
        return <Navigate to="/login" replace />;
    }

    return element;
};
