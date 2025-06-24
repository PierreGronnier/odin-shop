import App from "./App.jsx";
import { Home } from "./components/Home/Home.jsx";
import { Shop } from "./components/Shop.jsx";
import { Error } from "./components/Error.jsx";

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
    ],
  },
];

export default routes;
