import "./App.css";
import React, { useReducer, useState } from "react";

// pass useReducer two parameters
// could pass it a reducer, which is a function so would need to be created
// then pass initial state(0)

//reducer function - takes two parameters, current state & an action
// state is whatever the current value is, action is a function that gets called and where the value is going to be stored

function App() {
  function reducer(state, action) {
    switch (action.type) {
      case "INCREMENT":
        return state + 1;
      case "DECREMENT":
        return state - 1;
      default:
        return state;
    }
  }

  function reducer2(state, action) {
    switch (action.type) {
      case "add-todo":
        return {
          todos: [...state.todos, { text: action.text, completed: false }],
        };
      case "toggle-todo":
        return {
          todos: state.todos.map((t, idx) =>
            idx === action.idx ? { ...t, completed: !t.completed } : t
          ),
        };
      default:
        return state;
    }
  }

  const [count, dispatch] = useReducer(reducer, 0);

  const [{ todos }, dispatch2] = useReducer(reducer2, { todos: [] });
  const [text, setText] = useState();

  return (
    <div className="App">
      <h1>
        React Hooks: <i>useReducer()</i>
      </h1>
      <div className="counter">
        <div className="y">Counter</div>
        <div className="x">Count: {count}</div>
        <button onClick={() => dispatch({ type: "INCREMENT" })}>
          Incremenet +
        </button>
        <br />
        <br />
        <button onClick={() => dispatch({ type: "DECREMENT" })}>
          Decremenet -
        </button>
      </div>
      <div className="tdl">
        <div className="y">To-Do List</div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch2({ type: "add-todo", text });
            setText("");
          }}
        >
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </form>
        {todos.map((t, idx) => (
          <div
            key={t.text}
            onClick={() => dispatch2({ type: "toggle-todo", idx })}
            style={{ textDecoration: t.completed ? "line-through" : "" }}
          >
            {t.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
