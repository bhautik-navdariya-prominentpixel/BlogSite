import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PlainLayout from "./pages/layouts/PlainLayout";
import { useSelector } from "react-redux";
import { type StoreType } from "./store";
import HomePage from "./pages/HomePage";
import BlogListPage from "./pages/BlogListPage";
import BlogEditPage from "./pages/BlogEditPage";
import BlogAddPage from "./pages/BlogAddPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import MyBlogsPage from "./pages/MyBlogsPage";
import { protectedRoute } from "./utils/protected-route-util";
import DefaultErrorPage from "./pages/errors/DefaultErrorPage";

function App() {
  const loginState = useSelector((store: StoreType) => store.auth.login);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <PlainLayout />,
      errorElement: <DefaultErrorPage />,
      children: [
        !loginState ? { index: true, element: <LoginPage /> } : { index: true, element: <HomePage /> },
        { path: "signup", element: <SignUpPage /> },
        {
          path: "",
          loader: protectedRoute,
          children: [
            { path: "blogs", element: <BlogListPage /> },
            { path: "blogs/:blogId", element: <BlogDetailPage /> },
            {
              path: "profile/",
              children: [
                { path: "blogs", element: <MyBlogsPage /> },
                { path: "blogs/:blogId/edit", element: <BlogEditPage /> },
                { path: "blogs/new", element: <BlogAddPage /> },
              ],
            },
          ],
        },
      ],
    },
  ], {basename: "/BlogSite/dist/"});
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
