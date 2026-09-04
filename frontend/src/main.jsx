import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import AppRoutes from "./app/AppRouter.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import AuthInitializer from "./components/AuthInitializer.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AuthInitializer />
    <RouterProvider router={AppRoutes} />

    
  </Provider>,
);
