import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-3 flex gap-4 justify-center">
        <NavLink
          to="/add"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-semibold" : "text-gray-700"
          }
        >
          Add Box
        </NavLink>
        <NavLink
          to="/list"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-semibold" : "text-gray-700"
          }
        >
          List Boxes
        </NavLink>
      </div>
    </nav>
  );
}
