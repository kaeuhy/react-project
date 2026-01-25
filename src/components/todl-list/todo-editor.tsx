import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useState } from "react";
import { useCreateTodoMutation } from "@/hooks/mutations/use-create-todo-mutation.ts";

export default function TodoEditor() {
  // 마운트 되었을때 실행이 아닌 원하는 시점에 실행을 해야하므로 mutate 함수로 선언해줌
  // useMutation은 POST, PUT, PATCH, DELETE 요청에 매핑됨
  // isPending은 mutate 함수를 호출한 비동기 호출에 로딩 상태가 보관됨
  const { mutate, isPending } = useCreateTodoMutation();

  const [content, setContent] = useState("");

  const handleAddClick = () => {
    if (content.trim() === "") return;
    // createTodo 함수의 인수를 넣어주면됨
    mutate(content);
    setContent("");
  };

  return (
    <div className="flex gap-2">
      <Input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="새로운 할 일을 입력하세요..."
      />
      {/* disabled 속성에 isPending 넣어주면 로딩시 버튼 클릭시 불가능해짐 */}
      <Button disabled={isPending} onClick={handleAddClick}>
        추가
      </Button>
    </div>
  );
}
