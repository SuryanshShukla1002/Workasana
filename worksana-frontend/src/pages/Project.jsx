import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ThemeToggle from "@/components/ThemeToggle";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  FolderPlus,
  Users,
  FileText,
  Briefcase,
  Menu,
  X,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Project = () => {
  const [addProject, setAddProject] = useState({
    name: "",
    description: "",
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://workasana-seven.vercel.app/api/project/projects",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(addProject),
        },
      );

      if (!res.ok) {
        console.log("Fail to add the project");
        return;
      }
      setTimeout(() => {
        setAddProject({ name: "", description: "" });
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-muted/45">
      <div className="flex min-h-screen relative">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-card shadow"
        >
          <Menu className="w-5 h-5" />
        </button>

        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/30 z-40 md:hidden"
          />
        )}

        <aside
          className={`w-64 border-r bg-card shadow-sm flex-col
          fixed md:static top-0 left-0 h-screen z-50
          transition-transform duration-300
          ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="p-6 border-b flex items-center justify-between">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              WorkSana
            </h2>

            <button
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="ml-4 mt-4">
            <ThemeToggle />
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" onClick={() => setIsSidebarOpen(false)}>
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors text-sm font-medium group cursor-pointer">
                    <ArrowLeft className="w-5 h-5 group-hover:text-orange-500 transition-colors" />
                    <span className="group-hover:text-orange-500 transition-colors">
                      Back to Dashboard
                    </span>
                  </button>
                </Link>
              </li>

              <li>
                <Link to="/task" onClick={() => setIsSidebarOpen(false)}>
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors text-sm font-medium group cursor-pointer">
                    <Briefcase className="w-5 h-5 group-hover:text-orange-500 transition-colors" />
                    <span className="group-hover:text-orange-500 transition-colors">
                      Add Task
                    </span>
                  </button>
                </Link>
              </li>

              <li>
                <Link to="/team-create" onClick={() => setIsSidebarOpen(false)}>
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors text-sm font-medium group cursor-pointer">
                    <Users className="w-5 h-5 group-hover:text-orange-500 transition-colors" />
                    <span className="group-hover:text-orange-500 transition-colors">
                      Add Team
                    </span>
                  </button>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* ✅ MAIN CONTENT */}
        <main className="flex-1 flex justify-center items-center p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-2xl">
            <Card className="border-2">
              <CardHeader className="space-y-1 pb-6">
                <div className="flex items-center justify-center mb-2">
                  <div className="p-3 bg-orange-100 dark:bg-orange-950 rounded-full">
                    <FolderPlus className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
                <CardTitle className="text-2xl sm:text-3xl font-bold text-center">
                  Create New Project
                </CardTitle>
                <CardDescription className="text-center text-base">
                  Start a new project and bring your team together
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleProjectSubmit}>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-orange-500" />
                        Project Name
                      </Label>
                      <Input
                        className="h-11"
                        placeholder="Enter project name"
                        value={addProject.name}
                        onChange={(e) =>
                          setAddProject({
                            ...addProject,
                            name: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-semibold flex items-center gap-2">
                        <FileText className="w-4 h-4 text-orange-500" />
                        Project Description
                      </Label>
                      <Textarea
                        className="min-h-[120px] resize-none"
                        placeholder="Describe your project goals and objectives..."
                        value={addProject.description}
                        onChange={(e) =>
                          setAddProject({
                            ...addProject,
                            description: e.target.value,
                          })
                        }
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Provide a clear description to help your team understand
                        the project scope
                      </p>
                    </div>

                    <Button
                      type="submit"
                      className="w-full mt-6 h-11 text-base font-semibold cursor-pointer"
                    >
                      Create Project
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Project;
