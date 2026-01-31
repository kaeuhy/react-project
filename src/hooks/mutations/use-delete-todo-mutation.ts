import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo } from "@/api/delete-todo.ts";
import { QUERY_KEYS } from "@/lib/constants.ts";
import type { Todo } from "@/types.ts";

export function useDeleteTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodo,
    // 현재 상황에서는 캐시 무효화(invalidateQueries), 수정 요청의 응답값 활용(onSuccess), 낙관적 업데이트(onMutate) 중
    // onSucces 방식이 가장 적합
    onSuccess: (deletedTodo) => {
      queryClient.removeQueries({
        queryKey: QUERY_KEYS.todo.detail(deletedTodo.id),
      });
      queryClient.setQueryData<string[]>(
        QUERY_KEYS.todo.list,
        (prevTodoIds) => {
          if (!prevTodoIds) return [];
          return prevTodoIds.filter((id) => id !== deletedTodo.id);
        },
      );
    },
  });
}
