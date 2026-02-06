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
import Team from "./pages/Team";
import Project from "./pages/Project";
import TaskList from "./pages/TaskList";
import { ProjectsList } from "./pages/ProjectsList";
import Settings from "./pages/Settings";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/project-list" element={<ProjectsList />} />
          <Route
            path="/project-manage/:projectId"
            element={<ProjectManage />}
          />
          <Route path="/task" element={<TaskCreation />} />
          <Route path="/team-create" element={<Team />} />
          <Route path="/tasklist" element={<TaskList />} />
          <Route path="/project-create" element={<Project />} />
          <Route path="/task-detail/:detailId" element={<TaskDetail />} />
          <Route path="/report" element={<Report />} />
          <Route path="/team-manage" element={<TeamManagement />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
