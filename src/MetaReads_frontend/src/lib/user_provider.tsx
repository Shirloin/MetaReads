import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { User } from "../components/Props/userProps";
import { useCookie } from "../components/Hook/Cookie/useCookie";

interface UserContextType {
  user: User | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isAdmin: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(true);
  const { getIdentityfromCookie } = useCookie();

  useEffect(() => {
    async function getUserById() {
      setLoading(true);
      try {
        const user = await getIdentityfromCookie();
        setUser(user);
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getUserById();
  }, []);

  useEffect(() => {
    if (user) {
      if (user.username === "vasang") {
        setIsAdmin(true);
      }
    }
  }, [user]);

  const contextValue: UserContextType = {
    user,
    loading,
    setUser,
    isAdmin,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
