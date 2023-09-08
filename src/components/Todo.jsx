// TodoApp.js
import React, { useState } from "react";
import { useTodo } from "../contexts/TodoContext";
import { TodoItem } from "./TodoItem";

export default function Todo() {
  const { state, dispatch } = useTodo();
  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState(null); // Store the ID of the todo being edited

  const addTodo = () => {
    if (newTodo.trim()) {
      dispatch({ type: "ADD_TODO", payload: newTodo });
      setNewTodo("");
    } else {
      alert("Please Enter Task Name...");
    }
  };

  const startEditingTodo = (todo) => {
    if (todo.completed) return alert("Task is alreday Completed !");
    setEditingTodo(todo.id);
  };

  const editTodo = (id, newText) => {
    dispatch({ type: "EDIT_TODO", payload: { id, newText } });
    setEditingTodo(null); // Clear editing state
  };

  return (
    <>
      <h1 className="text-5xl font-bold text-blue-500 mb-4 text-center mt-3 tracking-wider">
        Todo App
      </h1>
      <div className="flex items-center justify-center h-32 flex-col gap-y-4">
        <div className="flex gap-x-4">
          <input
            type="text"
            value={newTodo}
            className="border px-2 py-2 rounded-md"
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button
            onClick={addTodo}
            className="bg-slate-400 hover:bg-slate-800 hover:text-white px-2 py-2 rounded-md"
          >
            Add
          </button>
        </div>
      </div>
      <ul className="flex flex-wrap gap-8 px-14">
        {state.todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            isEditing={editingTodo === todo.id}
            startEditing={startEditingTodo}
            editTodo={editTodo}
          />
        ))}
      </ul>
    </>
  );
}
