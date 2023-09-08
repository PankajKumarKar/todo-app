import { createContext, useContext, useReducer } from "react";
import { initialState, todoReducer } from "../reducers/todoReducer";

const TodoContext = createContext();

export default function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  return useContext(TodoContext);
}
