import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <p>A simple demonstration of an infinite scroll.</p>
    </div>
  );
}

const store = configureStore();
const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
