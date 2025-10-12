import { Routes, Route } from "react-router-dom";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<h1>hello, home</h1>} />
    </Routes>
  );
}
