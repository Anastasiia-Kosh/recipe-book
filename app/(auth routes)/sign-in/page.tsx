"use client";
import { login, LoginRequest } from "@/lib/api/clientApi";
import css from "../AuthPage.module.css";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/store/authStore";
import { useState } from "react";
import Link from "next/link";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import Image from "next/image";
import { isAxiosError } from "axios";

const SignIn = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const setAuth = useAuth((store) => store.setUser);
  const handleLogin = async (action: FormData) => {
    setError("");

    try {
      const loginData: LoginRequest = {
        email: action.get("email") as string,
        password: action.get("password") as string,
      };

      const user = await login(loginData);

      setAuth(user);
      router.push("/profile");
    } catch (error) {
      if (
        isAxiosError(error) &&
        error.response?.data?.message === "Invalid credentials"
      ) {
        setError("Неправильний email або пароль.");
        return;
      }

      setError("Не вдалося увійти. Спробуйте ще раз.");
    }
  };
  return (
    <section className={css.page}>
      <div className="container">
        <div className={css.authWrapper}>
          <h1 className={css.title}>Увійти</h1>

          <form className={css.form} action={handleLogin}>
            <div className={css.field}>
              <label htmlFor="email" className={css.label}>
                Email
              </label>

              <input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                className={css.input}
                required
              />
            </div>

            <div className={css.field}>
              <label htmlFor="password" className={css.label}>
                Пароль
              </label>

              <input
                id="password"
                type="password"
                name="password"
                autoComplete="current-password"
                className={css.input}
                required
              />
            </div>

            {error && <p className={css.error}>{error}</p>}
            
            <SubmitButton pendingText="Входимо..." fullWidth>
              Увійти
            </SubmitButton>

            <p className={css.switchText}>
              Ще не маєте акаунта?{" "}
              <Link href="/sign-up" className={css.switchLink}>
                Зареєструватися
              </Link>
            </p>
            <div className={css.imageWrapper}>
              <Image
                src="/images/auth/sing-in2.png"
                alt=""
                fill
                loading="eager"
                className={css.image}
                sizes="(min-width: 768px) 40vw, 80vw"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
export default SignIn;
