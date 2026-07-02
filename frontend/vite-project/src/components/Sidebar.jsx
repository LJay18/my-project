import React from "react";
import "./Sidebar.css";

function Sidebar({ page, setPage, menuOpen }) {
  return (
    <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
      <div className="logo">
        <h2>📚 AttendPro</h2>
      </div>

      <ul>
        <li
          className={page === "attendance" ? "active" : ""}
          onClick={() => setPage("attendance")}
        >
          👨‍🎓 Students
        </li>

        <li
          className={page === "dashboard" ? "active" : ""}
          onClick={() => setPage("dashboard")}
        >
          📊 Dashboard
        </li>

        <li
          className={page === "reports" ? "active" : ""}
          onClick={() => setPage("reports")}
        >
          📄 Reports
        </li>

        <li
          className={page === "settings" ? "active" : ""}
          onClick={() => setPage("settings")}
        >
          ⚙️ Settings
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;