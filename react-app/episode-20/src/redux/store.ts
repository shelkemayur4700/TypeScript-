// ---------------------slice ----------------

import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";

interface Todo {
  id: number;
  done: boolean;
  text: string;
}

interface TodoSliceState {
  todos: Todo[];
}

const initialState: TodoSliceState = {
  todos: [],
};

export const todosSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodod: (state, action: PayloadAction<string>) => {
      state.todos = [
        ...state.todos,
        {
          id: state.todos.length,
          text: action.payload,
          done: false,
        },
      ];
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(({ id }) => id !== action.payload);
    },
  },
});

export const { addTodod, removeTodo } = todosSlice.actions;
// export default todosSlice.reducer; // no need to export as we are consuming reducers here in store

// ---------------------store---------------------
export const store = configureStore({
  reducer: { todos: todosSlice.reducer },
});

type RootState = ReturnType<typeof store.getState>;
export const selectTodos = (state: RootState) => state.todos.todos;
