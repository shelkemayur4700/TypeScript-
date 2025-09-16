import React, {
  ReactNode,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";

import "./App.css";

const Heading = ({ title }: { title: string }) => <h2>{title}</h2>;

const Box = ({ children }: { children?: ReactNode }) => (
  <div style={{ padding: "1rem", fontWeight: "bold" }}>{children}</div>
);

const List: React.FC<{ items: string[]; onClick?: (item: string) => void }> = ({
  items,
  onClick,
}) => (
  <ul>
    {items?.map((item, index) => (
      <li key={index} onClick={() => onClick?.(item)}>
        {item}{" "}
      </li>
    ))}
  </ul>
);
interface Payload {
  text: string;
}
type ActionType =
  | {
      type: "ADD";
      text: string;
    }
  | {
      type: "REMOVE";
      id: Number;
    };
function App() {
  const onlListClick = useCallback((item: string) => {
    window.alert(item);
  }, []);

  const [payload, setPayload] = useState<Payload | null>(null);
  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setPayload(data));
  }, []);

  interface Todo {
    id: number;
    done: boolean;
    text: string;
  }

  const [todos, dispatch] = useReducer(todoReducer, []);

  function todoReducer(state: Todo[], action: ActionType): Todo[] {
    switch (action.type) {
      case "ADD":
        return [
          ...state,
          {
            id: state.length, // simple ID for demo
            text: action.text,
            done: false,
          },
        ];
      case "REMOVE":
        return state.filter(({ id }) => id !== action.id);
      default:
        // TS ensures all cases handled, but for runtime safety:
        throw new Error("Unknown action type");
    }
  }

  const newTodoRef = useRef<HTMLInputElement>(null);
  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      dispatch({
        type: "ADD",
        text: newTodoRef.current?.value,
      });
      newTodoRef.current.value = "";
    }
  }, []);
  return (
    <div>
      <Heading title="Introduction" />
      <Box>Hello there</Box>
      <List items={["one", "two", "three"]} onClick={onlListClick} />
      <Box>{JSON.stringify(payload)}</Box>

      <Heading title="Todos" />
      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.text}
          <button
            onClick={() =>
              dispatch({
                type: "REMOVE",
                id: todo.id,
              })
            }
          >
            Remove
          </button>
        </div>
      ))}
      <div>
        <input type="text" ref={newTodoRef} />
        <button onClick={onAddTodo}>ADD</button>
      </div>
    </div>
  );
}

export default App;
