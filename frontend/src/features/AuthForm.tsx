import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import {
  loginSchema,
  registerSchema,
  showErrorMessage,
  useAuth,
  type LoginSchemaType,
  type RegisterSchemaType,
} from "../shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { ErrorMessage } from "../shared";
import { useNavigate } from "react-router";

export const AuthForm = () => {
  const navigate = useNavigate();
  const { loginMutation, registerMutation } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const { mutate: login, isPending: loginPending } = loginMutation();
  const { mutate: registration, isPending: registerPending } =
    registerMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterSchemaType | LoginSchemaType>({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
  });

  const onSubmit = async (values: RegisterSchemaType | LoginSchemaType) => {
    if (isLogin) {
      login(values, {
        onSuccess: (token: string) => {
          Cookies.set("accessToken", token, { expires: 3_600_000 });

          return navigate("/");
        },
        onError: (err) => showErrorMessage(err),
      });
    } else {
      registration(values as RegisterSchemaType, {
        onSuccess: (token: string) => {
          Cookies.set("accessToken", token, { expires: 3_600_000 });

          return navigate("/");
        },
        onError: (err) => showErrorMessage(err),
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border rounded-lg border-gray-300 p-4 min-w-175 flex flex-col gap-3"
    >
      <h2 className="font-bold text-4xl text-center">
        {isLogin ? "Вход в аккаунт" : "Регистрация"}
      </h2>
      {!isLogin && (
        <input
          {...register("name")}
          type="text"
          className="input border-b border-gray-300 w-full"
          placeholder="Имя пользователя"
        />
      )}
      {"name" in errors && errors.name && (
        <ErrorMessage message={errors.name.message!} />
      )}
      <input
        {...register("email")}
        type="email"
        className="input border-b border-gray-300 w-full"
        placeholder="Почта"
      />
      {errors.email && <ErrorMessage message={errors.email.message!} />}
      <input
        {...register("password")}
        type="password"
        className="input border-b border-gray-300 w-full"
        placeholder="Пароль"
      />
      {errors.password && <ErrorMessage message={errors.password.message!} />}

      <button
        disabled={loginPending || registerPending || !isValid}
        className="bg-gray-300 py-3 rounded-full  hover:bg-gray-500 hover:text-white transition disabled:opacity-50 disabled:hover:bg-gray-300 disabled:hover:text-inherit"
      >
        {isLogin ? "Войти" : "Зарегистрироваться"}
      </button>
      <div>
        <button
          type="button"
          className="group text-gray-500 "
          onClick={() => setIsLogin((prev) => !prev)}
        >
          {!isLogin ? (
            <>
              Уже есть аккаунт?{" "}
              <span className="text-blue-500 font-bold  group-hover:underline">
                Войти
              </span>
            </>
          ) : (
            <>
              Ещё нет аккаунта?{" "}
              <span className="text-blue-500 font-bold group-hover:underline">
                Зарегистрироваться
              </span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
