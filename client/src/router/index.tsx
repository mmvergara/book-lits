import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage.tsx";
import SignInPage from "../pages/auth/SignInPage.tsx";
import SignUpPage from "../pages/auth/SignUpPage.tsx";
import NotFoundPage from "../pages/404Page.tsx";
import AuthProtectedRoute from "./AuthProtectedRoute.tsx";
import Providers from "../Providers.tsx";
import BooksPage from "../pages/books/BooksPage.tsx";
import PublishersPage from "../pages/publishers/PublishersPage.tsx";
import BookPage from "../pages/books/[bookid]/BookPage.tsx";
import PublisherPage from "../pages/publishers/[publisherid]/PublisherPage.tsx";
import UserPage from "../pages/user/UserPage.tsx";

const router = createBrowserRouter([
  // I recommend you reflect the routes here in the pages folder
  {
    path: "/",
    element: <Providers />,
    children: [
      // Public routes
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/auth/sign-in",
        element: <SignInPage />,
      },
      {
        path: "/auth/sign-up",
        element: <SignUpPage />,
      },
      // Auth Protected routes
      {
        path: "/",
        element: <AuthProtectedRoute />,
        children: [
          {
            path: "/user/:userid",
            element: <UserPage />,
          },
          {
            path: "/books",
            element: <BooksPage />,
          },
          {
            path: "/books/:bookid",
            element: <BookPage />,
          },
          {
            path: "/publishers",
            element: <PublishersPage />,
          },
          {
            path: "/publishers/:publisherid",
            element: <PublisherPage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
