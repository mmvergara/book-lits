import { Outlet } from "react-router-dom";
import { UserDataProvider } from "./context/AuthContext";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { API_URL } from "./config";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
const client = new ApolloClient({
  uri: API_URL + "query",
  cache: new InMemoryCache(),
  credentials: "include",
});

const Providers = () => {
  return (
    <UserDataProvider>
      <ApolloProvider client={client}>
        <Navbar>
          <ToastContainer />
          <Outlet />
        </Navbar>
      </ApolloProvider>
    </UserDataProvider>
  );
};

export default Providers;
