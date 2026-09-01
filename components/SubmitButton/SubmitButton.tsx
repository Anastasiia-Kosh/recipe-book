import { useFormStatus } from "react-dom";
import Loader from "@/components/Loader/Loader";
import css from "./SubmitButton.module.css";

interface SubmitButtonProps {
  children: string;
  pendingText: string;
  fullWidth?: boolean;
}

export default function SubmitButton({
  children,
  pendingText,
  fullWidth = false,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

   return (
    <button type="submit" disabled={pending}  className={`${css.button} ${fullWidth ? css.fullWidth : ""}`}>
      {pending ? (
        <>
          <Loader size="small" />
          {pendingText}
        </>
      ) : (
        children
      )}
    </button>
  );
}
