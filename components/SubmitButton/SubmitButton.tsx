import { useFormStatus } from "react-dom";
import Loader from "@/components/Loader/Loader";
import css from "./SubmitButton.module.css";

interface SubmitButtonProps {
  children: string;
  pendingText: string;
  fullWidth?: boolean;
  disabled?: boolean;
  isPending?: boolean;
}

export default function SubmitButton({
  children,
  pendingText,
  fullWidth = false,
  disabled = false,
  isPending,
}: SubmitButtonProps) {
  const { pending: formPending } = useFormStatus();
  const pending = isPending ?? formPending;
  return (
    <button
      type="submit"
      disabled={pending || disabled}
      className={`${css.button} ${fullWidth ? css.fullWidth : ""}`}
    >
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
