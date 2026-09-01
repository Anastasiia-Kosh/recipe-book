"use client";
import { useRouter } from "next/navigation";
import css from "../AuthPage.module.css";
import { register, RegisterRequest } from "@/lib/api/clientApi";
import { useAuth } from "@/lib/store/authStore";
import { useState } from "react";
import Link from "next/link";
import SubmitButton from "@/components/SubmitButton/SubmitButton";
import Image from "next/image";

const SignUp = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const setAuth = useAuth((store) => store.setUser);
  const handleRegister = async (action: FormData) => {
    try {
      const loginData: RegisterRequest = {
        email: action.get("email") as string,
        password: action.get("password") as string,
      };
      const user = await register(loginData);
      if (user) {
        setAuth(user);
        router.push("/profile");
      } else {
        setError("Invalid email or password");
      }
    } catch {
      setError("Oops... some error");
    }
  };

  return (
    <section className={css.page}>
      <div className="container">
        <div className={css.authWrapper}>
          <h1 className={css.title}>Реєстрація</h1>

          <form className={css.form} action={handleRegister}>
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
                autoComplete="new-password"
                className={css.input}
                required
              />
            </div>

            <SubmitButton pendingText="Реєструємо..." fullWidth>
              Зареєструватися
            </SubmitButton>

            <p className={css.switchText}>
              Вже маєте акаунт?{" "}
              <Link href="/sign-in" className={css.switchLink}>
                Увійти
              </Link>
            </p>
 <div className={css.imageWrapper}>
              <Image
                src="/images/auth/sing-up2.png"
                alt=""
                fill
                loading="eager"
                className={css.image}
                sizes="(min-width: 768px) 40vw, 80vw"
              />
            </div>
            {error && <p className={css.error}>{error}</p>}
          </form>
        </div>
      </div>
    </section>
  );
};
export default SignUp;
