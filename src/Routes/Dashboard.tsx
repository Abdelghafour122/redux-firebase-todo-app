import React, { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../App/hooks";
import Navbar from "../Components/Dashboard/Navbar";
import ToolBar from "../Components/Dashboard/ToolBar";
import { globalAuth } from "../firebase";
import { setUser } from "../Reducerss/authSlice";
import { fetchLabelsThunk } from "../Reducerss/labelSlice";

import { fetchTodosThunk } from "../Reducerss/todoSlice";

function Dashboard() {
  const dispatch = useAppDispatch();
  let { route } = useParams();
  console.log(route);
  const navigate = useNavigate();

  useEffect(() => {
    route !== undefined && navigate(`/dashboard/${route}`);
  }, [route]);

  useEffect(() => {
    dispatch(fetchTodosThunk());
    dispatch(fetchLabelsThunk());
    globalAuth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser(JSON.stringify(user)));
      } else console.log("user is null", user);
    });
  }, []);

  return (
    <div className="dashboard h-full w-full flex items-start justify-start">
      <Navbar />
      <div className="flex flex-col w-full">
        <ToolBar />
        <div className="dashboard-body flex-1 min-h-full py-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
