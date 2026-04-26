import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./shared/styles/index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router";
import { AuthPage, HomePage } from "./pages";
import { ToastContainer } from "react-toastify";

// TODO: СДЕЛАТЬ MIDDLEWARE https://reactrouter.com/how-to/middleware

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "*",
    element: <HomePage />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer />
    </QueryClientProvider>
  </StrictMode>,
);
