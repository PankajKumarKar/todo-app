import { useState } from "react";
import { useTodo } from "../contexts/TodoContext";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";

export function TodoItem({ todo, isEditing, startEditing, editTodo }) {
  const { dispatch } = useTodo();
  const [editedText, setEditedText] = useState(todo.text);

  const toggleTodo = () => {
    dispatch({ type: "TOGGLE_TODO", payload: todo.id });
  };

  const deleteTodo = () => {
    const userConfirm = confirm("Are You Sure ?");
    if (userConfirm) dispatch({ type: "DELETE_TODO", payload: todo.id });
  };

  const handleEdit = () => {
    if (editedText.trim()) {
      editTodo(todo.id, editedText);
    }
  };

  return (
    <li className="border-red-900 p-2 rounded border-2 flex items-center justify-center gap-x-2">
      {!isEditing && (
        <input
          type="checkbox"
          className="bordder-2 px-2 py-2 rounded-md"
          checked={todo.completed}
          onChange={toggleTodo}
        />
      )}
      {isEditing ? (
        <div className="flex gap-x-2">
          <input
            type="text"
            className="border-2 rounded p-2 "
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <button
            onClick={handleEdit}
            className="p-2 bg-green-400 hover:bg-green-600 font-medium rounded-lg"
          >
            Save
          </button>
        </div>
      ) : (
        <>
          <span
            className={
              !todo.completed
                ? "text-red-500 font-semibold text-2xl"
                : "text-green-500 font-semibold text-2xl line-through"
            }
          >
            {todo.text}
          </span>
          <BiEdit
            className="text-green-500 text-2xl"
            onClick={() => startEditing(todo)}
          />
        </>
      )}
      <AiOutlineDelete className="text-red-500 text-2xl" onClick={deleteTodo} />
    </li>
  );
}
