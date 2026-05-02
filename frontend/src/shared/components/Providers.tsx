/* eslint-disable @typescript-eslint/no-explicit-any */
import { createBrowserRouter, RouterProvider, redirect } from "react-router";
import { AuthPage, HomePage } from "../../pages";
import { ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import { useUsers } from "../hooks";
import { useUsersStore } from "../stores";
import { useEffect } from "react";

export const Providers = () => {
  const { getMeQuery } = useUsers();
  const { data, isPending } = getMeQuery();
  const { setUser } = useUsersStore();

  useEffect(() => {
    if (!data || isPending) return;

    setUser(data);
  }, [data, isPending, setUser]);

  const router = createBrowserRouter([
    {
      path: "*",
      element: <HomePage />,
      loader: authLoader,
    },
    {
      path: "/auth",
      element: <AuthPage />,
      loader: authorizedLoader,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
};
// TODO: ФИКС АВТОРИЗАЦИИ (REFRESHTOKENS И MIDDLEWARE НА БЕКЕ)

async function authLoader() {
  const token = Cookies.get("accessToken");
  if (!token) {
    throw redirect("/auth");
  }

  return null;
}

async function authorizedLoader() {
  const token = Cookies.get("accessToken");
  if (token) {
    throw redirect("/");
  }

  return null;
}

// TODO: Добавление ответов в бд
