import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTodo } from "@/api/update-todo.ts";
import type { Todo } from "@/types.ts";
import { QUERY_KEYS } from "@/lib/constants.ts";

export function useUpdateTodoMutation() {
  // 캐싱 데이터를 가져오기위해 QueryClient를 가져옴
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTodo,
    // onMutate의 자동으로 제공되는 매개변수는 mutationFn이 호출되면서 인수로 제공된 값이 제공됨
    // 즉 지금은 todo-item.tsx에서 제공되는 mutate({id, isDone: !isDone,});이 제공됨
    onMutate: (updatedTodo) => {
      // Todo 배열 타입 캐싱 데이터를 가져와 수정함
      // prevTodos에는 QUERY_KEY.todo.list로 가져온 현재의 캐시 데이터가 제공됨
      queryClient.setQueryData<Todo[]>(QUERY_KEYS.todo.list, (prevTodos) => {
        if (!prevTodos) return [];
        return prevTodos.map((prevTodo) =>
          prevTodo.id === updatedTodo.id
            ? { ...prevTodo, ...updatedTodo }
            : prevTodo,
        );
      });
    },
  });
}
