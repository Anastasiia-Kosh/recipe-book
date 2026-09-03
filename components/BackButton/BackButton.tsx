"use client";

import { useRouter } from "next/navigation";
import css from "./BackButton.module.css";
import Icon from "@/components/Icon/Icon";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      className={css.backButton}
      onClick={() => router.back()}
    >
      <Icon name="arrow-left" size={20} />
      Назад
    </button>
  );
}
