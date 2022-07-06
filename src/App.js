import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminForm from "./pages/Admin/Form";
import Admin from "./pages/Admin/index";
import Home from "./pages/Home/index";
import Stats from "./pages/Stats";

function App() {
  return (
    <>
      <main className="container">
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/:id" element={<AdminForm />} />
          <Route path="/home" element={<Home />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/" element={<Navigate replace to="/home" />} />
          {/* <Navigate to="/not-found" /> */}
        </Routes>
      </main>
    </>
  );
}

export default App;
