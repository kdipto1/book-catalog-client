import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import NotFound from "../pages/NotFound";
import AllBooks from "../pages/AllBooks";
import BookDetails from "../pages/BookDetails";
import AddNewBook from "../pages/AddNewBook";
import PrivateRoutes from "./PrivateRoutes";
import EditBookDetail from "../pages/EditBookDetail";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/allBooks",
        element: <AllBooks />,
      },
      {
        path: "/addNewBook",
        element: (
          <PrivateRoutes>
            <AddNewBook />
          </PrivateRoutes>
        ),
      },
      {
        path: "/edit-book/:id",
        element: (
          <PrivateRoutes>
            <EditBookDetail />
          </PrivateRoutes>
        ),
      },
      {
        path: "/book-detail/:id",
        element: <BookDetails />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
