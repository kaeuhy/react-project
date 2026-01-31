// todo 데이터 삭제 요청 함수
import { API_URL } from "@/lib/constants.ts";
import type { Todo } from "@/types.ts";

export async function deleteTodo(id: string) {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Delete Todo Failed");

  const data: Todo = await response.json();
  return data;
}
