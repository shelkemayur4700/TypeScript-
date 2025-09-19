import { ReactNode, useCallback, useRef } from "react";

import { useTodos } from "../hooks/useTodos";
import { UL } from "./UL";

// Here, "title" must always be a string (TypeScript enforces this at compile time)
const Heading = ({ title }: { title: string }) => <h2>{title}</h2>;

// "children" is typed as ReactNode, meaning it can be text, JSX, or other React components
const Box = ({ children }: { children?: ReactNode }) => (
  <div style={{ padding: "1rem", fontWeight: "bold" }}>{children}</div>
);

function Todo() {
  const { todos, addTodo, removeTodo } = useTodos([
    {
      id: 0,
      text: "Hey there",
      done: false,
    },
  ]);
  // Ref is typed: newTodoRef.current will be an <input> element or null
  const newTodoRef = useRef<HTMLInputElement>(null);

  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      addTodo(newTodoRef.current?.value);
      newTodoRef.current.value = "";
    }
  }, [addTodo]);
  return (
    <div>
      <Heading title="Todos" />
      {/* {todos.map((todo) => (
        <div key={todo.id}>
          {todo.text}
          <button onClick={() => removeTodo(todo.id)}>Remove</button>
        </div>
      ))} */}
      <div>
        <input type="text" ref={newTodoRef} />
        <button onClick={onAddTodo}>ADD</button>
      </div>

      {/* ----------------GENERIC UL COMPO ----------------- */}
      <UL
        items={todos}
        itemClick={(item) => alert(item.id)}
        render={(todo) => (
          <>
            {todo.text}
            <button onClick={() => removeTodo(todo.id)}>Remove</button>
          </>
        )}
      />
    </div>
  );
}

export default Todo;
