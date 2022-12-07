import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Dashboard/Navbar";

function Dashboard() {
  return (
    <div className="dashboard h-full w-full flex items-start justify-start">
      <Navbar />
      <div className="dashboard-body flex-1 min-h-full py-2 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
