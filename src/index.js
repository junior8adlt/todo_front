import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./assets/css/globalStyles.css"; //Import Global CSS Styles
import App from "./App";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"; // File CSS  Bootstrap 4
import "../node_modules/bootstrap/dist/js/bootstrap.min.js"; // File Javascript  Bootstrap 4
import generateStore from "./redux/store";
import { Provider } from "react-redux";
const store = generateStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
