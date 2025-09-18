import { useCallback, useReducer } from "react";

interface Todo {
  id: number;
  done: boolean;
  text: string;
}

// Union type for reducer actions
// "ADD" must always have text, "REMOVE" must always have id
type ActionType =
  | { type: "ADD"; text: string }
  | {
      type: "REMOVE";
      id: number;
    };

export function useTodos(initialTodo: Todo[]): {
  todos: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: number) => void;
} {
  const [todos, dispatch] = useReducer(todoReducer, initialTodo); //(reducer function,value)

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
  const addTodo = useCallback((text: string) => {
    dispatch({
      type: "ADD",
      text,
    });
  }, []);
  const removeTodo = useCallback((id: number) => {
    dispatch({
      type: "REMOVE",
      id,
    });
  }, []);
  return { todos, addTodo, removeTodo };
}
