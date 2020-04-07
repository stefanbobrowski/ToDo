import React, { useState, useEffect } from "react";

const ToDo = () => {
  const [todos, setTodos] = useState([
    {
      content: "Learn React Hooks",
      color: "#87eba9",
      complete: true,
    },
    {
      content: "Learn the MERN stack",
      color: "#87ceeb",
      complete: true,
    },
    {
      content: "Continue making clients happy",
      color: "#d8bfd8",
      complete: false,
    },
    {
      content: "Write a Web Development Guide",
      color: "#add8e6",
      complete: false,
    },
  ]);
  const [completedCount, setCompletedCount] = useState(0);
  const [tempTodo, setTempTodo] = useState({
    content: "",
    color: "#ffffff",
    complete: false,
  });
  const [message, setMessage] = useState({
    content: "Welcome to your To-Do list",
    color: "#12bb29",
  });

  useEffect(() => {
    console.log("welcome to To-Do List");
    countCompleted();
  }, []);

  useEffect(() => {
    countCompleted();
  }, [todos]);

  const countCompleted = () => {
    let count = 0;
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].complete) {
        count += 1;
      }
    }
    if (count == todos.length) {
      let newMessage = { content: "All To-Do's completed!", color: "#12bb29" };
      setMessage(newMessage);
    }
    setCompletedCount(count);
  };

  const handleCreateTodo = (e) => {
    e.preventDefault();
    let { target } = e;
    if (tempTodo.content == "" || !tempTodo.content.trim()) {
      let newMessage = { content: "Empty To-Do!", color: "#ec1515" };
      setMessage(newMessage);
    } else {
      addTodo(tempTodo);
      setTempTodo({
        content: "",
        color: "#fff",
        complete: false,
      });
    }
    target.reset();
  };

  const addTodo = (t) => {
    let todosCopy = [...todos];
    let dupe = false;
    for (let i = 0; i < todosCopy.length; i++) {
      if (todosCopy[i].content == t.content) {
        dupe = true;
        let newMessage = { content: "Duplicate entry", color: "#ec1515" };
        setMessage(newMessage);
      }
    }
    if (dupe == false) {
      let newTodos = [...todosCopy, t];
      setTodos(newTodos);
      let newMessage = { content: "To-Do Created!", color: "#12bb29" };
      setMessage(newMessage);
    }
  };

  const handleDelete = (i) => {
    let newTodos = [...todos];
    let completed = newTodos[i].complete;
    newTodos.splice(i, 1);
    setTodos(newTodos);
    let newMessage = { content: "To-Do removed!", color: "#ec1515" };
    setMessage(newMessage);
  };

  const handleCheck = (i) => {
    let newTodos = [...todos];
    newTodos[i].complete = !newTodos[i].complete;
    setTodos(newTodos);
    if (newTodos[i].complete) {
      let newMessage = { content: "To-Do completed!", color: "#12bb29" };
      setMessage(newMessage);
    } else {
      let newMessage = {
        content: "To-Do not completed...",
        color: "#ec1515",
      };
      setMessage(newMessage);
    }
  };

  return (
    <div className="project todo-project">
      <main>
        <h1 className="page-header">To-Do List</h1>
        <p>My React Hooks implementation of the classic To-Do list.</p>
        <section className="todos-container">
          {todos.length ? (
            <div className="todos">
              {todos.map((t, i) => {
                return (
                  <div
                    className="todo"
                    key={i}
                    index={i}
                    style={{ backgroundColor: t.color }}
                  >
                    <div className="checkbox" onClick={() => handleCheck(i)}>
                      <span>{t.complete ? "✔️" : ""}</span>
                    </div>
                    <div>
                      {t.complete ? (
                        <p>
                          <strike style={{ color: t.color }}>
                            {t.content}
                          </strike>
                        </p>
                      ) : (
                        <p style={{ color: t.color }}>{t.content}</p>
                      )}
                    </div>
                    <span className="delete" onClick={() => handleDelete(i)}>
                      ❌
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              <p>Nothing To Do!</p>
            </div>
          )}
        </section>
        <section className="control-container">
          <form className="create-todo-form" onSubmit={handleCreateTodo}>
            <label>Create new ToDo</label>
            <input
              onChange={(e) =>
                setTempTodo({
                  ...tempTodo,
                  content: e.target.value,
                  complete: false,
                })
              }
            ></input>
            <input
              name="color-picker"
              type="color"
              defaultValue="#ffffff"
              onChange={(e) =>
                setTempTodo({ ...tempTodo, color: e.target.value })
              }
            />
            <button>Submit ToDo</button>
          </form>
          <div className="message-box">
            <p>
              To-Do's completed: {completedCount} / {todos.length}
            </p>
            <p style={{ color: message.color }}>{message.content}</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ToDo;
