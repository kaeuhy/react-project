import { useMutation } from "@tanstack/react-query";
import { signInWithPassword } from "@/api/auth.ts";
import type { UseMutationCallback } from "@/types.ts";

export function useSignInWithPassword(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: signInWithPassword,
    // 비즈니스 로직
    // signInWithPassword에서 던진 error는 Mutation으로 들어와 onError 핸들러안으로 들어감
    onError: (error) => {
      console.error(error);

      if (callbacks?.onError) callbacks.onError(error);
    }
  });
}