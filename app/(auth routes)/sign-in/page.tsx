"use client";
import { login, LoginRequest } from "@/lib/api/clientApi";
import css from "./SignInPage.module.css";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/store/authStore";
import { useState } from "react";

const SignIn = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const setAuth = useAuth((store) => store.setUser);
  const handleLogin = async (action: FormData) => {
    try {
      const loginData: LoginRequest = {
        email: action.get("email") as string,
        password: action.get("password") as string,
      };
      const user = await login(loginData);
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
    <main className={css.mainContent}>
      <form className={css.form} action={handleLogin}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
};
export default SignIn;
