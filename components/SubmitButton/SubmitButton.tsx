import { useFormStatus } from "react-dom";
import Loader from "@/components/Loader/Loader";

interface SubmitButtonProps {
  children: string;
  pendingText: string;
}

export default function SubmitButton({
  children,
  pendingText,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

   return (
    <button type="submit" disabled={pending}>
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
