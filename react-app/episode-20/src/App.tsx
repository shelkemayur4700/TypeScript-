import React, {
  ReactNode,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import "./App.css";
import Button from "./compo/Button";

// Here, "title" must always be a string (TypeScript enforces this at compile time)
const Heading = ({ title }: { title: string }) => <h2>{title}</h2>;

// "children" is typed as ReactNode, meaning it can be text, JSX, or other React components
const Box = ({ children }: { children?: ReactNode }) => (
  <div style={{ padding: "1rem", fontWeight: "bold" }}>{children}</div>
);

// React.FC used with typed props
// items must be an array of strings
// onClick is optional, but if provided, it must accept a string argument
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

// Interface enforces payload shape
interface Payload {
  text: string;
}

// Union type for reducer actions
// "ADD" must always have text, "REMOVE" must always have id
type ActionType =
  | {
      type: "ADD";
      text: string;
    }
  | {
      type: "REMOVE";
      id: number; // ✅ number (primitive) is correct, not "Number" (object wrapper)
    };

// 🔹 Custom hook returning a typed state
// Instead of plain useState, this enforces number as the only allowed type
const useNumber = (initialValue: number) => useState<number>(initialValue);

// 🔹 Advanced: extracting types dynamically using ReturnType
// - useNumberValue: inferred type of state (number)
// - useNumberSetValue: inferred type of set function (React.Dispatch<React.SetStateAction<number>>)
type useNumberValue = ReturnType<typeof useNumber>[0];
type useNumberSetValue = ReturnType<typeof useNumber>[1];

// Incrementer component
// Advanced version: Instead of hardcoding number/Dispatch, we reuse types from useNumber
const Incrementer: React.FunctionComponent<{
  value: useNumberValue;
  setValue: useNumberSetValue;

  // ---------------- OLD VERSION ----------------
  // This works fine, but is more "manual":
  // value: number;
  // setValue: React.Dispatch<React.SetStateAction<number>>;
  // ----------------------------------------------
  // ✅ IMPROVED: Using ReturnType automatically extracts types
  // from our custom hook `useNumber`. If the hook changes later,
  // our component will automatically stay in sync.
}> = ({ value, setValue }) => (
  <Button
    onClick={() => setValue(value + 1)}
    style={{
      backgroundColor: "blue",
      paddingInline: "3rem",
      padding: "10px",
      borderRadius: "10px",
      color: "wheat",
      fontSize: "large",
      borderStyle: "unset",
    }}
    title={`add-${value}`}
  />
);

function App() {
  // Example of callback parameter typing
  const onlListClick = useCallback((item: string) => {
    window.alert(item);
  }, []);

  // payload can be either `null` or an object with { text: string }
  const [payload, setPayload] = useState<Payload | null>(null);
  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setPayload(data));
  }, []);

  // Define Todo object structure
  interface Todo {
    id: number;
    done: boolean;
    text: string;
  }

  // Reducer is strongly typed:
  // - state: must always be Todo[]
  // - action: must follow ActionType rules
  const [todos, dispatch] = useReducer(todoReducer, []);

  function todoReducer(state: Todo[], action: ActionType): Todo[] {
    switch (action.type) {
      case "ADD":
        return [
          ...state,
          {
            id: state.length, // simple demo ID
            text: action.text,
            done: false,
          },
        ];
      case "REMOVE":
        return state.filter(({ id }) => id !== action.id);
      default:
        throw new Error("Unknown action type");
    }
  }

  // Ref is typed: newTodoRef.current will be an <input> element or null
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

  // Using custom typed state hook
  const [value, setValue] = useNumber(0);

  // ---------------- OLD VERSION ----------------
  // const [value, setValue] = useState(0);
  // ----------------------------------------------
  // ✅ IMPROVED: useNumber enforces that only numbers
  // can be used for state and keeps typing consistent across app

  return (
    <div>
      <Heading title="Introduction" />
      <Box>Hello there</Box>
      <List items={["one", "two", "three"]} onClick={onlListClick} />
      <Box>{JSON.stringify(payload)}</Box>
      <Incrementer value={value} setValue={setValue} />
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
