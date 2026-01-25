import { API_URL } from "@/lib/constants.ts";
import type { Todo } from "@/types.ts";

export async function createTodo(content: string) {
  const response = await fetch(`${API_URL}/todos`, {
    method: "POST",
    body: JSON.stringify({
      // id 생략시 자동으로 랜덤 값으로 자동으로 생성
      // id,
      content,
      isDone: false,
    }),
  });

  if (!response.ok) throw new Error("Create Todo Failed");

  const data: Todo = await response.json();
  return data;
}
