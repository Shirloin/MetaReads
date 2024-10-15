import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { CollapsedProvider } from "./lib/collapsed_provider";
document.body.classList.add("scrollbar-thin");
const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <CollapsedProvider>
        <App />
      </CollapsedProvider>
    </React.StrictMode>,
  );
}
