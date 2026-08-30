"use client";
import css from "./SearchBox.module.css";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBox() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleSearch = (formData: FormData) => {
  const search = formData.get("search")?.toString() ?? "";

  const params = new URLSearchParams(searchParams.toString());

  params.delete("category");

  if (search) {
    params.set("search", search);
  } else {
    params.delete("search");
  }

  params.set("page", "1");

  router.push(`/recipes?${params.toString()}`);
};

  return (
<form action={handleSearch} className={css.form}>
  <input
    type="text"
    name="search"
    placeholder="Знайти рецепт або інгредієнт..."
    className={css.input}
  />

  <button type="submit" className={css.button}>
    Знайти
  </button>
</form>
  );
}
