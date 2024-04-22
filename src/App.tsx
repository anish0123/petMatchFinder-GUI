import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default function App() {
  return (
    <div>
      <h1 className="font-semibold text-2xl">Hello World</h1>
    </div>
  );
}