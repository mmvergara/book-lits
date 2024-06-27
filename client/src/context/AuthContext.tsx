import { createContext, useContext, useEffect, useState } from "react";
import { FirebaseAuth } from "../firebase";
import LoadingPage from "../pages/LoadingPage";
import { useLocalStorage } from "../hooks/useLocalStorage";
import axios from "axios";
export type User = {
  username: string;
  exp: number;
  userId: string;
};

export const UserDataContext = createContext<{
  user: User | null;
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
  const [user, setUser] = useLocalStorage("user", null);

  const signIn = async (username: string, password: string) => {
    axios.post(API_URL+"")
  };
  const signUp = async () => {};
  const signOut = async () => {};

  return (
    <UserDataContext.Provider value={{ user }}>
      {isLoading ? <LoadingPage /> : children}
    </UserDataContext.Provider>
  );
};
