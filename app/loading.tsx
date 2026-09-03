import Loader from "@/components/Loader/Loader";
import css from "./loading.module.css"

export default function Loading() {
  return (
    <div
      className={css.loading}
      role="status"
      aria-label="Завантаження"
    >
      <Loader />
    </div>
  );
}