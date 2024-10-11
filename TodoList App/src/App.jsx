import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");

    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);
const saveToLocalStorage = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");

    saveToLocalStorage();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id == id;
    });

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);

    saveToLocalStorage();
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLocalStorage();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLocalStorage();
  };

  return (
    <>
      <Navbar />

      <div className="conainer mx-auto my-5 rounded-xl p-5 bg-violet-200 min-h-[80vh] w-[90vw]">
        <div className="addTodo my-5">
          <h1 className="text-lg font-bold">Add a Todo</h1>

          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-1/2"
          />

          <button
            onClick={handleAdd}
            className="bg-violet-600 hover:bg-violet-900 p-2 font-bold py-1 text-white rounded-md mx-6"
          >
            Save
          </button>
        </div>

        <h2 className="text-lg font-bold">Your Todos</h2>

        <div className="todos">
          {todos.length === 0 && <div className="m-5">No Todos to display</div>}

          {/* Displaying Todos */}

          {todos.map((item) => {
            return (
              <div
                key={item.id}
                className="todo my-3 flex justify-between w-1/2"
              >
                <div className="flex gap-5">
                  <input
                    name={item.id}
                    onChange={handleCheckbox}
                    type="checkbox"
                    value={item.isCompleted}
                  />

                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>

                <div className="buttons flex h-full">
                  <button
                    onClick={(e) => {
                      handleEdit(e, item.id);
                    }}
                    className="bg-violet-600 hover:bg-violet-900 p-2 font-bold py-1 text-white rounded-md mx-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={(e) => {
                      handleDelete(e, item.id);
                    }}
                    className="bg-violet-600 hover:bg-violet-900 p-2 font-bold py-1 text-white rounded-md mx-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
