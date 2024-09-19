import React from "react";
import Swal from "sweetalert2";
function List({ todo, onEdit, onDelete, onToggle, isComplete }) {
  const handleEditTodo = () => {
    Swal.fire({
      title: "Edit Task",
      input: "text",
      inputValue: todo,
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value.trim()) {
          return "Please enter something!";
        }
        return null;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        onEdit(result.value);
        Swal.fire("Saved!", "Your task has been updated.", "success");
      }
    });
  };

  const handleDeleteTodo = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",

      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete();
        Swal.fire("Deleted!", "Your task has been deleted.", "success");
      }
    });
  };

  return (
    <div>
      <div className="mx-6 mt-2">
        <div className="flex gap-2">
          <input
            type="checkbox"
            className="h-6 w-6"
            checked={isComplete}
            onChange={onToggle}
          />
          <p className={isComplete ? "line-through" : ""}>{todo}</p>
        </div>
        <div className="flex gap-2 mt-2">
          <button
            className="border border-purple-200 w-full p-1"
            onClick={handleEditTodo}
          >
            Edit
          </button>
          <button
            className="border border-blue-200 w-full p-1 bg-red-600 text-white"
            onClick={handleDeleteTodo}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default List;