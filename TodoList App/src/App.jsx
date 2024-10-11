import { useState } from "react";
import Navbar from "./components/Navbar";

function App() {
  const [todo, setTodo] = useState("");

  const [todos, setTodos] = useState([]);

  const handleAdd = () => {
    setTodos([...todos, { todo, isCompleted: false }]);
    setTodo("");
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleEdit = () => {};

  const handleDelete = () => {};

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
            Add
          </button>
        </div>

        <h2 className="text-lg font-bold">Your Todos</h2>

        <div className="todos">

          {/* Displaying Todos */}

          {todos.map((item) => {

            return <div key={todo} className="todo my-3 flex justify-between w-1/4">

            <input type="checkbox" value={todo.isCompleted} />

              <div className={item.isCompleted?"line-through":""}>{item.todo}</div>

              <div className="buttons">
                <button
                  onClick={handleEdit}
                  className="bg-violet-600 hover:bg-violet-900 p-2 font-bold py-1 text-white rounded-md mx-2"
                >
                  Edit
                </button>

                <button
                  onClick={handleDelete}
                  className="bg-violet-600 hover:bg-violet-900 p-2 font-bold py-1 text-white rounded-md mx-2"
                >
                  Delete
                </button>
              </div>
            </div>

          })}

        </div>
      </div>
    </>
  );
}

export default App;
