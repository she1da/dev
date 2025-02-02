import { RouterProvider, createBrowserRouter } from "react-router-dom";

import EditUser from "./pages/EditUser";
import ErrorPage from "./pages/Error";
import UsersDetailPage, {
  loader as userDetailLoader,
  action as deleteuserAction,
} from "./pages/UsersDetail";
import UsersPage, { loader as usersLoader } from "./pages/Users";
import UsersRootLayout from "./pages/UsersRoot";
import HomePage from "./pages/Home";
import NewUserPage from "./pages/NewUserPage";
import RootLayout from "./pages/Root";
import { action as manipulateuserAction } from "./components/CreateUserForm";
import AuthenticationPage, {
  action as authAction,
} from "./pages/Authentication";
import { action as logoutAction } from "./pages/Logout";
import { checkAuthLoader, tokenLoader } from "./util/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "users",
        element: <UsersRootLayout />,
        children: [
          {
            index: true,
            element: <UsersPage />,
            loader: usersLoader,
          },
          {
            path: ":userId",
            id: "user-detail",
            loader: userDetailLoader,
            children: [
              {
                index: true,
                element: <UsersDetailPage />,
                action: deleteuserAction,
              },
              {
                path: "edit",
                element: <EditUser />,
                action: manipulateuserAction,
                loader: checkAuthLoader,
              },
            ],
          },
          {
            path: "new",
            element: <NewUserPage />,
            action: manipulateuserAction,
            loader: checkAuthLoader,
          },
        ],
      },
      {
        path: "auth",
        element: <AuthenticationPage />,
        action: authAction,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
