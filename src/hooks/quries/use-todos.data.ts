import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "@/api/fetch-todos.ts";

export function useTodosData() {
  return useQuery({
    queryFn: fetchTodos,
    queryKey: ["todos"],
    // fetch 재시도 횟수 커스터마이즈 기본 3번
    retry: 0,
  });
}
