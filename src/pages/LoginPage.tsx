import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner";
import apiClient from "@/utils/ApiClient";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export function LoginPage() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [statusLogin, setStatusLogin] = useState(false);

  const handleClickButtonLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Please enter both username and password.");
      return;
    }


    setStatusLogin(true);
    // Simulate login process
    apiClient.post("/user/login", { username, password })
      .then((response) => {
        console.log("Login response:", response.data);
        localStorage.setItem("userData", JSON.stringify(response.data));

        window.location.href = "/";

        setStatusLogin(false);
        toast.success("Login successful!")
      })
      .catch((error) => {
        console.error("Login error:", error);
        setStatusLogin(false);
        toast.error("Login failed. Please check your credentials and try again.");
      });
  }



  return (
    <Card className="w-full max-w-sm mx-auto mt-20">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your username below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid w-full gap-6">
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="username"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input  name="password" id="password" type="password" required onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button disabled={statusLogin} onClick={handleClickButtonLogin} className="w-full bg-green-500 text-white border-green-500 hover:bg-green-600">
          {statusLogin ? <div className="flex items-center gap-2"><Spinner className="h-4 w-4" /> Logging in...</div> : "Login"}
        </Button>
        <Link to="/register" className="w-full text-center">
          <Button  variant={"outline"} className="w-full bg-transparent">
            Register
          </Button>
        </Link>
        <Link to="/" className="w-full text-center mt-2">
          <Button variant={"link"} className="w-full bg-transparent">
            Back to Home
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default LoginPage;
