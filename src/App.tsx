import "./App.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Routes/Dashboard";
import Homepage from "./Routes/Homepage";
import SignIn from "./Routes/SignIn";
import SignUp from "./Routes/SignUp";

import PrivateLoggedRoute from "./Utils/PrivateLoggedRoute";
import ForgottenPassword from "./Routes/ForgottenPassword";
import PrivateUnloggedRoute from "./Utils/PrivateUnloggedRoute";
import ErrorPage from "./Routes/ErrorPage";
import Todos from "./Components/Dashboard/Todos";
import Finished from "./Components/Dashboard/Finished";
import Archived from "./Components/Dashboard/Archived";
import Trash from "./Components/Dashboard/Trash";
import FilteredTodos from "./Routes/FilteredTodos";

function App() {
  return (
    <main className="App h-screen">
      <Routes>
        <Route element={<PrivateLoggedRoute />}>
          <Route element={<Dashboard />} path="dashboard/">
            <Route index element={<Todos />} />
            <Route element={<Finished />} path="finished" />
            <Route element={<Trash />} path="trash" />
            <Route element={<Archived />} path="archived" />
            <Route element={<FilteredTodos />} path="filtered/:labelId" />
          </Route>
        </Route>
        <Route element={<PrivateUnloggedRoute />}>
          <Route element={<SignIn />} path="/signin" />
        </Route>
        <Route element={<PrivateUnloggedRoute />}>
          <Route element={<SignUp />} path="/signup" />
        </Route>
        <Route element={<PrivateUnloggedRoute />}>
          <Route element={<ForgottenPassword />} path="/forgottenpassword" />
        </Route>
        <Route element={<Homepage />} path="/" />
        <Route element={<ErrorPage />} path="*" />
      </Routes>
    </main>
  );
}

export default App;
