import { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import axios from "axios";
import { API_URL } from "../config";
export type User = {
  username: string;
  exp: number;
  userid: string;
};

export const UserDataContext = createContext<{
  user: User | null;
  signIn?: (username: string, password: string) => Promise<void>;
  signUp?: (username: string, password: string) => Promise<void>;
  signOut?: () => void;
}>({
  user: null,
});

export const useUser = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
};

type Props = { children: React.ReactNode };
export const UserDataProvider = ({ children }: Props) => {
  const [user, setUser] = useLocalStorage<User | null>("user", null);

  const signIn = async (username: string, password: string) => {
    const res = await axios.post(
      API_URL + "auth/signin",
      {
        username,
        password,
      },
      {
        withCredentials: true,
      }
    );
    setUser(res.data as User);
  };

  const signUp = async (username: string, password: string) => {
    await axios.post(
      API_URL + "auth/signup",
      {
        username,
        password,
      },
      { withCredentials: true }
    );
    console.log("Sign up successful");
  };
  const signOut = async () => {
    await axios.post(API_URL + "auth/signout", null, { withCredentials: true });
    if (user) {
      setUser(null);
    }
  };

  useEffect(() => {
    if (user && user.exp * 1000 < Date.now()) {
      signOut();
    }
  }, []);

  return (
    <UserDataContext.Provider value={{ user, signIn, signOut, signUp }}>
      {children}
    </UserDataContext.Provider>
  );
};
