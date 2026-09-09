import ReactDOM from "react-dom/client";

let appRoot;

export function renderApp(element) {
  if (!appRoot) {
    appRoot = ReactDOM.createRoot(document.getElementById("root"));
  }
  appRoot.render(element);
}
