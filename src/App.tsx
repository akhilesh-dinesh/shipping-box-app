import { Routes, Route, Navigate } from "react-router-dom";
import BoxForm from "./components/BoxForm";
import BoxList from "./components/BoxList";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="min-h-screen bg-stone-200 flex flex-col">
      <Navbar />
      <main className="flex-1 py-6">
        <Routes>
          <Route path="/" element={<Navigate to="/add" replace />} />
          <Route path="/add" element={<BoxForm />} />
          <Route path="/list" element={<BoxList />} />
        </Routes>
      </main>
      <footer className="py-4 text-center text-sm text-gray-500">
      </footer>
    </div>
  );
}
