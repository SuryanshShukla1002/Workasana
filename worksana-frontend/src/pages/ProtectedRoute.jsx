import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const checkUserAuthentication = async () => {
      try {
        const res = await fetch(
          "https://workasana-seven.vercel.app/api/auth/me",
          {
            credentials: "include",
          },
        );

        if (res.ok) {
          setAuth(true);
        } else {
          setAuth(false);
        }
      } catch (error) {
        setAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkUserAuthentication();
  }, []);
  if (loading) return null;
  return auth ? <Outlet /> : <Navigate to="/" />;
};
export default ProtectedRoute;
