import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import UserPage from "./pages/UserPage";
import "./styles/global.css";
import Todo from "./components/Todo/index.jsx";
import Error from "./pages/Error";
import { AuthWrapper } from "./components/context/auth.context.jsx";
import PrivateRoute from "./pages/PrivateRoute/index.jsx";
import BookPage from "./pages/BookPage/index.jsx";
import "nprogress/nprogress.css";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Todo />,
      },
      {
        path: "/user",
        element: <UserPage />,
      },
      {
        path: "/book",
        element: (
          <PrivateRoute>
            <BookPage />,
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);
createRoot(document.getElementById("root")).render(
  <AuthWrapper>
    <RouterProvider router={router} />
  </AuthWrapper>
);
