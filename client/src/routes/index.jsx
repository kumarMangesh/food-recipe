import HomePage from "../pages/HomePage.jsx";
import Recipe from "../pages/Recipe.jsx";

export const router = [
  {
    path: "/",
    element: <HomePage />,
    name: "Home"
  },
  {
    path: "/recipe/:id",
    element: <Recipe />,
    name: ""
  },
];

export default router;
