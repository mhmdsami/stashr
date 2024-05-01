import { useActionData } from "@remix-run/react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { ActionData } from "~/types";

interface UseActionDataWithToastProps {
  onError?: () => void;
  onMessage?: () => void;
}

export default function useActionDataWithToast({
  onError,
  onMessage,
}: UseActionDataWithToastProps = {}) {
  const actionData = useActionData<ActionData>();

  useEffect(() => {
    if (actionData?.error) {
      toast.error(actionData.error);

      if (onError) {
        onError();
      }
    }

    if (actionData?.message) {
      toast.success(actionData.message);

      if (onMessage) {
        onMessage();
      }
    }
  }, [actionData]);

  return actionData;
}
