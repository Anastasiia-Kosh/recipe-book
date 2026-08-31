import { ClipLoader } from "react-spinners";
import css from "./Loader.module.css";

interface LoaderProps {
  size?: "small" | "large";
}

export default function Loader({ size = "large" }: LoaderProps) {
  return (
    <div className={css.loader}>
      <ClipLoader
        size={size === "small" ? 18 : 40}
        color={size === "small" ? "#fff" : "#a95660"}
      />
    </div>
  );
}