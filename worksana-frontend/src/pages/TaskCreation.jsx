import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import ThemeToggle from "@/components/ThemeToggle";
import { useEffect, useState } from "react";

const TaskCreation = () => {
  const [team, setTeam] = useState([]);
  const [project, setProject] = useState([]);
  const [owners, setOwners] = useState([]);
  const [taskData, setTaskData] = useState({
    name: "",
    project: "",
    team: "",
    owners: "",
    tags: "",
    timeToComplete: 1,
    status: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createNewtask = await fetch(
        "http://localhost:5000/api/task/tasks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(taskData),
        },
      );
      if (!createNewtask.ok) {
        console.log("Error in creating task");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getOwners = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users/user", {
        credentials: "include",
      });
      if (!res.ok) {
        console.log("Error in getting the owner");
        return;
      }
      const data = await res.json();
      setOwners(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTeam = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/team/teams", {
        credentials: "include",
      });
      if (!res.ok) {
        console.log("Error in fetching the team");
        return;
      }
      const data = await res.json();
      setTeam(data);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProject = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/project/projects", {
        credentials: "include",
      });
      if (!res.ok) {
        console.log("Error in fetching the project");
        return;
      }
      const data = await res.json();
      setProject(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTeam();
    getProject();
    getOwners();
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r p-4 flex flex-col">
        <div>
          <h2 className="text-lg font-semibold mb-3">WorkSana</h2>
          <ThemeToggle />
          <ul className="space-y-2 text-sm mt-4">
            <li className="cursor-pointer hover:text-orange-400">Dashboard</li>
            <li className="cursor-pointer hover:text-orange-400 mt-3">Tasks</li>
            <li className="cursor-pointer hover:text-orange-400 mt-3">Teams</li>
            <li className="cursor-pointer hover:text-orange-400 mt-3">
              Settings
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex justify-center items-center p-8">
        <div className="w-full max-w-xl">
          <h1 className="text-xl font-semibold mb-6 text-center">
            Create New Task
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label>Task Name</Label>
                <Input
                  className="mt-3"
                  placeholder="Enter task name"
                  onChange={(e) =>
                    setTaskData({ ...taskData, name: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Project</Label>
                <Select
                  onValueChange={(value) =>
                    setTaskData({ ...taskData, project: value })
                  }
                >
                  <SelectTrigger className="w-full mt-3">
                    <SelectValue placeholder="Choose project" />
                  </SelectTrigger>
                  <SelectContent>
                    {project.map((eachProject) => (
                      <SelectItem key={eachProject._id} value={eachProject._id}>
                        {eachProject.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Owners</Label>
                <Select
                  onValueChange={(value) =>
                    setTaskData({ ...taskData, owners: value })
                  }
                >
                  <SelectTrigger className="w-full mt-3">
                    <SelectValue placeholder="Select owner" />
                  </SelectTrigger>
                  <SelectContent>
                    {owners.map((eachOwner) => (
                      <SelectItem key={eachOwner._id} value={eachOwner._id}>
                        {eachOwner.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Team</Label>
                <Select
                  onValueChange={(value) =>
                    setTaskData({ ...taskData, team: value })
                  }
                >
                  <SelectTrigger className="w-full mt-3">
                    <SelectValue placeholder="Choose team" />
                  </SelectTrigger>
                  <SelectContent>
                    {team.map((teams) => (
                      <SelectItem key={teams._id} value={teams._id}>
                        {teams.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Time (Days)</Label>
                <Input
                  className="mt-3"
                  type="number"
                  placeholder="e.g. 5"
                  onChange={(e) =>
                    setTaskData({ ...taskData, timeToComplete: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Status</Label>
                <Select
                  onValueChange={(value) =>
                    setTaskData({ ...taskData, status: value })
                  }
                >
                  <SelectTrigger className="w-full mt-3">
                    <SelectValue placeholder="Choose status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="To Do">To Do</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Blocked">Blocked</SelectItem>
                    <SelectItem value="In Review">In Review</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Tags</Label>
                <Select
                  onValueChange={(value) =>
                    setTaskData({ ...taskData, tags: value })
                  }
                >
                  <SelectTrigger className="w-full mt-3">
                    <SelectValue placeholder="Choose tag" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Follow Up">Follow Up</SelectItem>
                    <SelectItem value="Urgent">Urgent</SelectItem>
                    <SelectItem value="High Priority">High Priority</SelectItem>
                    <SelectItem value="Low Priority">Low Priority</SelectItem>
                    <SelectItem value="Bug">Bug</SelectItem>
                    <SelectItem value="Feature">Feature</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full mt-4 cursor-pointer">
                Create Task
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default TaskCreation;
