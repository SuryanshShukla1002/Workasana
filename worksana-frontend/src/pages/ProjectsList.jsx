import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard, FolderPlus, Menu, X } from "lucide-react";

export const ProjectsList = () => {
  const [projectData, setProjectData] = useState([]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const fetchProjects = async () => {
    try {
      const res = await fetch(
        "https://workasana-seven.vercel.app/api/project/projects",
        {
          credentials: "include",
        },
      );
      if (!res.ok) {
        console.log("Fail to fetch the project data");
        return;
      }
      const data = await res.json();
      setProjectData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-muted/45">
      <div className="flex min-h-screen relative">
        {/* ✅ MOBILE MENU BUTTON */}
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
                    <LayoutDashboard className="w-5 h-5 group-hover:text-orange-500 transition-colors" />
                    <span className="group-hover:text-orange-500 transition-colors">
                      Back to Dashboard
                    </span>
                  </button>
                </Link>
              </li>

              <li>
                <Link
                  to="/project-create"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors text-sm font-medium group cursor-pointer">
                    <FolderPlus className="w-5 h-5 group-hover:text-orange-500 transition-colors" />
                    <span className="group-hover:text-orange-500 transition-colors">
                      Add Project
                    </span>
                  </button>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* ✅ MAIN CONTENT*/}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">Projects</h1>
              <p className="text-muted-foreground">
                View and List all your projects
              </p>
            </div>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
              {projectData.length > 0 ? (
                projectData.map((project) => (
                  <div
                    key={project._id}
                    className="border rounded-lg p-6 hover:shadow-lg transition-shadow bg-card"
                  >
                    <h3 className="text-xl font-semibold mb-3">
                      {project.name}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    <Link to={`/project-manage/${project._id}`}>
                      <Button className="w-full cursor-pointer">
                        View More
                      </Button>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="md:col-span-2 text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    No projects found. Create your first project!
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
