import { useState, useEffect } from "react";
import { TodoProvider } from "./contexts";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updatedTodo = (id, updatedTodo) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, ...updatedTodo } : todo))
    );
  };

  const deletetodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Load todos from local storage
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos && savedTodos.length > 0) {
      setTodos(savedTodos);
    }
  }, []);

  // Save todos to local storage on change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updatedTodo, deletetodo, toggleComplete }}
    >
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-gray-900 to-gray-800 py-8 px-4">
        <div className="w-full max-w-2xl bg-gray-900 shadow-lg rounded-lg p-6 border border-gray-700">
          <h1 className="text-3xl font-bold text-center text-white mb-6">
            ✅ Manage Your Todos
          </h1>

          {/* Todo Form */}
          <div className="mb-6">
            <TodoForm />
          </div>

          {/* Todo List */}
          <div className="space-y-3">
            {todos.length > 0 ? (
              todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
            ) : (
              <p className="text-center text-gray-400">
                No todos yet. Add one! 😊
              </p>
            )}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
