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
    onMutate: async (updatedTodo) => {
      // 낙관적 업데이트를 덮어씌우는 것을 방지하기 위한 데이터 조회 취소 예외처리 구현
      // 비동기 cancleQueries는 todo list 데이터 조회 요청들을 모두 취소 시킴
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.todo.list,
      });

      // 업데이트 이전 캐시 데이터를 저장하는 prevTodos
      const prevTodos = queryClient.getQueryData<Todo[]>(QUERY_KEYS.todo.list);

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

      return {
        prevTodos,
      };
    },
    // 낙관적 업데이트를 진행하는 비동기 요청이 실패시 작동하는 이벤트 핸들러
    // onError 이벤트 핸들러는 예외처리를 위한 3가지 매개변수를 자동으로 제공
    // context에는 onMutate에서 반환값인 prevTodos가 들어옴
    onError: (error, variable, context) => {
      if (context && context.prevTodos) {
        queryClient.setQueryData<Todo[]>(
          QUERY_KEYS.todo.list,
          context.prevTodos,
        );
      }
    },
    // 백엔드의 데이터가 잘못된 데이터로 업데이트시 무결성 깨짐 방지를 위한 이벤트 핸들러
    // onSettled 이벤트 핸들러는 캐시 데이터를 무효화하여 refetch, 무결성 검증까지 진행
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.todo.list,
      });
    },
  });
}
