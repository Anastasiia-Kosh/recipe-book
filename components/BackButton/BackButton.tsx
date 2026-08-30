"use client";

import { useRouter } from "next/navigation";
import css from "./BackButton.module.css"

export default function BackButton() {
  const router = useRouter();

  return (
    <button type="button" className={css.backButton} onClick={() => router.back()}>
      ← До всіх рецептів
    </button>
  );
}