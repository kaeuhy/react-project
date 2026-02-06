import type { UseMutationCallback } from "@/types.ts";
import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "@/api/auth.ts";

export default function useUpdatePassword(callbacks?: UseMutationCallback) {
  return useMutation({
      mutationFn: updatePassword,
      onSuccess: () => {
        if (callbacks?.onSuccess) callbacks.onSuccess();
      },
      onError: (error) => {
        if (callbacks?.onError) callbacks.onError(error);
      }
    }
  );
}