import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  FileText,
  Settings,
} from "lucide-react";

const Dashboard = () => {
  const [project, setProject] = useState([]);
  const [task, setTask] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleTaskget = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/task/tasks", {
        credentials: "include",
      });
      if (!res.ok) return;
      const data = await res.json();
      setTask(data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredTask = selectedStatus
    ? task.filter((task) => task.status == selectedStatus)
    : task;

  const handleProjectFetch = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/project/projects", {
        credentials: "include",
      });
      if (!res.ok) return;
      const data = await res.json();
      setProject(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleProjectFetch();
    handleTaskget();
  }, []);

  return (
    <div className="min-h-screen bg-muted/45">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden md:flex w-64 border-r bg-card shadow-sm flex-col">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              WorkSana
            </h2>
          </div>

          <div className="ml-4 mt-4">
            <ThemeToggle />
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard">
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-muted text-sm font-medium group cursor-pointer">
                    <LayoutDashboard className="w-5 h-5 text-orange-500 transition-colors" />
                    <span className="text-orange-500 transition-colors">
                      Dashboard
                    </span>
                  </button>
                </Link>
              </li>

              <li>
                <Link to="/project-list">
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors text-sm font-medium group cursor-pointer">
                    <FolderKanban className="w-5 h-5 group-hover:text-orange-500 transition-colors" />
                    <span className="group-hover:text-orange-500 transition-colors">
                      Projects
                    </span>
                  </button>
                </Link>
              </li>

              <li>
                <Link to="/team-manage">
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors text-sm font-medium group cursor-pointer">
                    <Users className="w-5 h-5 group-hover:text-orange-500 transition-colors" />
                    <span className="group-hover:text-orange-500 transition-colors">
                      Teams
                    </span>
                  </button>
                </Link>
              </li>

              <li>
                <Link to="/tasklist">
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors text-sm font-medium group cursor-pointer">
                    <Users className="w-5 h-5 group-hover:text-orange-500 transition-colors" />
                    <span className="group-hover:text-orange-500 transition-colors">
                      Tasks
                    </span>
                  </button>
                </Link>
              </li>

              <li>
                <Link to="/report">
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors text-sm font-medium group cursor-pointer">
                    <FileText className="w-5 h-5 group-hover:text-orange-500 transition-colors" />
                    <span className="group-hover:text-orange-500 transition-colors">
                      Reports
                    </span>
                  </button>
                </Link>
              </li>

              <li>
                <Link to="/settings">
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors text-sm font-medium group cursor-pointer">
                    <Settings className="w-5 h-5 group-hover:text-orange-500 transition-colors" />
                    <span className="group-hover:text-orange-500 transition-colors">
                      Settings
                    </span>
                  </button>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              Welcome to WorkSana Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your projects and tasks efficiently
            </p>
          </div>

          {/* Projects */}
          <div className="mb-10">
            <h2 className="text-xl sm:text-2xl font-semibold mb-6">
              Recent Projects
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.map((eachProject) => (
                <Card
                  key={eachProject._id}
                  className="relative w-full max-w-sm pt-0"
                >
                  <div className="absolute inset-0 z-30 aspect-video bg-black/30" />
                  <img
                    src="https://avatar.vercel.sh/shadcn1"
                    alt="Event cover"
                    className="relative z-20 aspect-video w-full object-cover brightness-75 dark:brightness-50"
                  />

                  <CardHeader>
                    <CardAction>
                      <Badge variant="secondary">Featured</Badge>
                    </CardAction>
                    <CardTitle className="text-xl">
                      {eachProject.name}
                    </CardTitle>
                    <CardDescription className="text-md">
                      {eachProject.description}
                    </CardDescription>
                  </CardHeader>

                  <CardFooter>
                    <Link
                      to={`/project-manage/${eachProject._id}`}
                      className="w-full"
                    >
                      <Button className="w-full cursor-pointer">
                        View More
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          {/* Tasks */}
          <div className="mt-10">
            <h2 className="text-xl sm:text-2xl font-semibold mb-6">My Tasks</h2>

            <div className="space-y-4">
              {filteredTask && filteredTask.length > 0 ? (
                filteredTask.map((eachTask) => (
                  <Card
                    key={eachTask._id}
                    className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between hover:shadow-md transition"
                  >
                    <div className="space-y-1">
                      <p className="text-lg font-medium">{eachTask.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Owner: {eachTask?.owners?.[0]?.name ?? "Unassigned"}
                      </p>
                    </div>

                    <div className="mt-3 sm:mt-0 flex items-center gap-3">
                      <Badge variant="outline">
                        {eachTask.timeToComplete} days
                      </Badge>

                      <Badge
                        variant={
                          eachTask.status === "Done"
                            ? "default"
                            : eachTask.status === "In Progress"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {eachTask.status}
                      </Badge>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No tasks found</p>
                </div>
              )}
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <Link to={"/task"}>
              <Button className="w-full md:w-auto cursor-pointer">
                + Add New Task
              </Button>
            </Link>

            <div className="w-full md:w-72">
              <Label className="text-sm font-medium">Filter by Status</Label>

              <Select onValueChange={(value) => setSelectedStatus(value)}>
                <SelectTrigger className="mt-2 cursor-pointer">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="To Do">To Do</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Blocked">Blocked</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
