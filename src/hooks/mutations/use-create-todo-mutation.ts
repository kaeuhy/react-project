import { useMutation } from "@tanstack/react-query";
import { createTodo } from "@/api/create-todo.ts";

export function useCreateTodoMutation() {
  return useMutation({
    mutationFn: createTodo,
    // createTodo 비동기 요청이 성공, 실패, 시작, 끝났을 시점에 원하는 동작을 수행하는 이벤트 핸들러들
    // 요청이 시작
    onMutate: () => {},
    // 요청이 종료
    onSettled: () => {},
    // 요청이 성공
    onSuccess: () => {
      window.location.reload();
    },
    // 요청이 실패
    onError: (error) => {
      window.alert(error.message);
    },
  });
}
