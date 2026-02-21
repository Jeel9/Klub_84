import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-title">Klub84 Admin</div>

      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `sidebar-item ${isActive ? "active" : ""}`
        }
      >
        Dashboard
      </NavLink>

      <NavLink
        to="/members"
        className={({ isActive }) =>
          `sidebar-item ${isActive ? "active" : ""}`
        }
      >
        Members
      </NavLink>

      <NavLink
        to="/shares"
        className={({ isActive }) =>
          `sidebar-item ${isActive ? "active" : ""}`
        }
      >
        Shares
      </NavLink>

      <NavLink
        to="/payments"
        className={({ isActive }) =>
          `sidebar-item ${isActive ? "active" : ""}`
        }
      >
        Payments
      </NavLink>

      <NavLink
        to="/reports"
        className={({ isActive }) =>
          `sidebar-item ${isActive ? "active" : ""}`
        }
      >
        Reports
      </NavLink>
    </div>
  );
}
