import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const userLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://workasana-seven.vercel.app/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        console.log("Error while doing login");
        return;
      }
      navigate("/dashboard");
    } catch (error) {
      console.log("Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-0">
      <Card className="w-full max-w-sm sm:max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-2xl">
            SignUp to your account
          </CardTitle>
          <CardDescription className="text-center">
            Enter your name email and password details
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={userLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="name"
                  value={userData.name}
                  required
                  onChange={(e) => {
                    setUserData({ ...userData, name: e.target.value });
                  }}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="abc@example.com"
                  value={userData.email}
                  required
                  onChange={(e) => {
                    setUserData({ ...userData, email: e.target.value });
                  }}
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="password"
                  value={userData.password}
                  required
                  onChange={(e) => {
                    setUserData({ ...userData, password: e.target.value });
                  }}
                />
              </div>

              <Button type="submit" className="w-full cursor-pointer">
                SignUp
              </Button>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <CardAction>
            <Link to={"/"}>
              <Button variant="link" className="cursor-pointer">
                Already had an account? Sign-In
              </Button>
            </Link>
          </CardAction>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
