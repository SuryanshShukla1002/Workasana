import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProjectManage from "./pages/ProjectManage";
import TaskCreation from "./pages/TaskCreation";
import TaskDetail from "./pages/TaskDetail";
import Report from "./pages/Report";
import TeamManagement from "./pages/TeamManagement";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/project-manage" element={<ProjectManage />} />
          <Route path="/task" element={<TaskCreation />} />
          <Route path="/task-detail" element={<TaskDetail />} />
          <Route path="/report" element={<Report />} />
          <Route path="/team-manage" element={<TeamManagement />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
