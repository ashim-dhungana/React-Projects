import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  // Load todos from localStorage when the app starts
  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  // Saving todos to Local Storage
  const toLocalStorage = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  // Option to show all todos or only unfinished todos
  const toggleFinished = (e) => {
    setShowFinished(!showFinished);
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);

    toLocalStorage();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);

    toLocalStorage();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    toLocalStorage();
  };

  // Getting value of new todo from input
  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  // To decide if a todo is completed or not
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);

    toLocalStorage();
  };

  return (
    <>
      <Navbar />

      <div className="conainer mx-auto my-5 rounded-xl p-5 bg-violet-200 min-h-[80vh] md:w-1/2">

        <h1 className="font-bold text-center text-xl">Task Planner - Manage Your Todos</h1>

        <div className="addTodo my-5 flex flex-col gap-4">
          <h1 className="text-lg font-bold">Add a Todo</h1>

          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-full rounded-lg px-5 py-1"
          />

          <button
            onClick={handleAdd}
            disabled={todo.length <= 1}
            className="bg-violet-700 disabled:bg-violet-500 hover:bg-violet-900 p-2 font-bold py-1 text-white rounded-md"
          >
            Save
          </button>
        </div>
        <input className="my-4"
          onChange={toggleFinished}
          type="checkbox"
          checked={showFinished}
        />{" "}
        Show Finished
        <h2 className="text-lg font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No Todos to display</div>}

          {/* Displaying Todos */}

          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className={"todo my-3 flex justify-between w-100"}
                >
                  <div className="flex gap-5">
                    <input
                      name={item.id}
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
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
                      className="bg-violet-700 hover:bg-violet-900 p-2 font-bold py-1 text-white rounded-md mx-2"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="bg-violet-700 hover:bg-violet-900 p-2 font-bold py-1 text-white rounded-md mx-2"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
