import { useState } from "react";
import List from "./components/List";

function App() {
  const [allTodo, setAllTodo] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all");

  const addTodo = () => {
    if (!inputValue.trim()) {
      return;
    }
    setAllTodo([...allTodo, { text: inputValue, isComplete: false }]);
    setInputValue("");
  };

  const editTodo = (index, newValue) => {
    const newTodo = allTodo.map((eachTodo, i) => {
      if (i === index) {
        return { ...eachTodo, text: newValue };
      }
      return eachTodo;
    });
    setAllTodo(newTodo);
  };

  const deleteTodo = (index) => {
    const newTodo = allTodo.filter((_, i) => i !== index);
    setAllTodo(newTodo);
  };

  const toggleComplete = (index) => {
    const updatedTodos = allTodo.map((eachTodo, i) => {
      if (i === index) {
        return { ...eachTodo, isComplete: !eachTodo.isComplete };
      }
      return eachTodo;
    });
    setAllTodo(updatedTodos);
  };
  const filteredTodos = allTodo.filter((eachTodo) => {
    if (filter === "active") return !eachTodo.isComplete;
    if (filter === "completed") return eachTodo.isComplete;
    return true;
  });
  return (
    <div>
      <div className="shadow-lg rounded-md max-w-2xl mx-auto mt-10 py-5 px-5">
        <div className="mx-8 ">
          <div className="flex pt-4">
          <img
        class="w-20 h-20 mb-2"
        src="https://cdn-icons-png.flaticon.com/512/6194/6194029.png"
        alt="Logo"
      />
      <div class="text-left">
        <h1 class="text-3xl font-bold text-slate-500 md:text-2xl text-left">
          TODOIFY
        </h1>
        <small class="text-[10px] "
          >...ensuring important things are never forgotten !</small
        >
      </div>
          </div>
          <hr className="mt-4" />
          <h1 className="text-center text-xl py-3">What needs to be done?</h1>
          <input
            type="text"
            className="w-full py-3 border-2 border-purple-500 px-2 rounded mb-2"
            placeholder="What needs to be done?"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            className="w-full bg-purple-500 text-white rounded mt-2 px-2 py-3  font-bold"
            onClick={addTodo}
          >
            Add
          </button>

          <div className="flex mx-6 mt-2 justify-between gap-2 ">
            <button
              className={`border border-purple-200 rounded w-full p-1 ${
                filter === "all" ? "bg-purple-200" : ""
              }`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`border border-purple-200 rounded w-full p-1 ${
                filter === "active" ? "bg-purple-200" : ""
              }`}
              onClick={() => setFilter("active")}
            >
              {" "}
              Active
            </button>
            <button
              className={`border border-purple-200 rounded w-full p-1 ${
                filter === "completed" ? "bg-purple-200" : ""
              }`}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>
          </div>

          <h1 className="font-bold mt-4 mx-6 text-xl">
            {filteredTodos.length} tasks remaining
          </h1>
          <div>
            {filteredTodos.map((eachTodo, index) => (
              <List
                key={index}
                todo={eachTodo.text}
                isComplete={eachTodo.isComplete}
                onEdit={(newValue) => editTodo(index, newValue)}
                onDelete={() => deleteTodo(index)}
                onToggle={() => toggleComplete(index)}
              />
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default App;