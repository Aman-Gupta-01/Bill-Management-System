import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store } from "./components/app/store";
import { Provider } from "react-redux";
import { StrictMode } from "react";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
     <App />
    </StrictMode>
  </Provider>
);
