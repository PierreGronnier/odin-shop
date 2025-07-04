import App from "./App.jsx";
import { Home } from "./components/Home/Home.jsx";
import { Shop } from "./components/Shop/Shop.jsx";
import { CartPage } from "./components/Cart/CartPage.jsx";
import { Error } from "./components/Error.jsx";
import MoviePage from "./components/MoviePage/MoviePage.jsx";

export const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/movie/:id",
        element: <MoviePage />,
      },
    ],
  },
];

export default routes;
