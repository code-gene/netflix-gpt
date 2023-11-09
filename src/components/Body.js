import { createBrowserRouter } from "react-router-dom";
import Browse from "./Browse/Browse";
import Login from "./Login";
import { RouterProvider } from "react-router-dom";
import MovieDetails from "./Browse/MovieDetails";

const Body = () => {

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
    {
      path: "/browse/:movieId",
      element: <MovieDetails />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};
export default Body;
