import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router";
import { useUpdateTodoMutation } from "@/hooks/mutations/use-update-todo-mutation.ts";
import { useDeleteTodoMutation } from "@/hooks/mutations/use-delete-todo-mutation.ts";
import { useTodoDataById } from "@/hooks/queries/use-todo-data-by-id.ts";

export default function TodoItem({ id }: { id: string }) {
  const { data: todo } = useTodoDataById(id, "LIST");
  if (!todo) throw new Error("Todo Data Undefined");
  const { content, isDone } = todo;

  // isPending을 추가하여 삭제 버튼을 눌렀을때 다른 버튼은 클릭이 안되게 진행
  const { mutate: deleteTodo, isPending: isDeleteTodoPending } =
    useDeleteTodoMutation();
  const { mutate: updatedTodo } = useUpdateTodoMutation();

  const handleDeleteClick = () => {
    deleteTodo(id);
  };

  const handleCheckboxClick = () => {
    updatedTodo({
      id,
      isDone: !isDone,
    });
  };

  return (
    <div className="flex items-center justify-between border p-2">
      <div className="flex gap-5">
        <input
          disabled={isDeleteTodoPending}
          onClick={handleCheckboxClick}
          type={"checkbox"}
          checked={isDone}
        />
        <Link to={`/todolist/${id}`}>{content}</Link>
      </div>
      <Button
        disabled={isDeleteTodoPending}
        onClick={handleDeleteClick}
        variant={"destructive"}
      >
        삭제
      </Button>
    </div>
  );
}
