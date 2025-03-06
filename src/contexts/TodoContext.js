import { createContext, useContext } from "react";

export const TodoContext = createContext({
  todos: [],
  addTodo: () => {},
  updateTodo: () => {},
  deleteTodo: () => {},
  toggleComplete: () => {},
});

// Custom hook to access the context
export const useTodo = () => {
  return useContext(TodoContext);
};

// Provider component
export const TodoProvider = TodoContext.Provider;
