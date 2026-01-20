import "./App.css";
import { Outlet, Route, Routes } from "react-router";
import IndexPage from "@/pages/index-page.tsx";
import SignInPage from "@/pages/sign-in-page.tsx";
import SignUpPage from "@/pages/sign-up-page.tsx";
import CounterPage from "@/pages/counter-page.tsx";
import TodoListPage from "@/pages/todo-list-page.tsx";

function AuthLayout() {
  return (
    <div>
      <header>Auth!</header>
      <Outlet />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/counter" element={<CounterPage />} />
      <Route path="/todolist" element={<TodoListPage />} />

      <Route element={<AuthLayout />}>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Route>
    </Routes>
  );
}

export default App;
