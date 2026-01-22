import TodoEditor from "@/components/todl-list/todo-editor.tsx";
import TodoItem from "@/components/todl-list/todo-item.tsx";
import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "@/api/fetch-todos.ts";
import { useTodosData } from "@/hooks/quries/use-todos.data.ts";

export default function TodoListPage() {
  const { data: todos, isLoading, error } = useTodosData();

  if (error) return <div>오류 발생</div>;
  if (isLoading) return <div>로딩 중</div>;

  return (
    <div className="flex flex-col gap-5 p-5">
      <h1 className="text-2xl font-bold">TodoList</h1>
      <TodoEditor />
      {todos?.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </div>
  );
}
