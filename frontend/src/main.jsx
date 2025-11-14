import { createRoot } from "react-dom/client";
import "./index.css";
import { store } from "./features/store";
import { Provider } from "react-redux";
import App from "./App";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster />
    </QueryClientProvider>
  </Provider>
);
