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

function RegisterPage() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [statusRegister, setStatusRegister] = useState(false);

  const handleClickLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    setStatusRegister(true);

    if (!username || !password || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    // Simulate registration process
    apiClient.post("/user/register", { username, password })
      .then((response) => {
        console.log("Registration response:", response.data);
        toast.success("Registration successful! Please login to your account.");
        setStatusRegister(false);
        window.location.href = "/login";
      })
      .catch((error) => {
        console.error("Registration error:", error);
        toast.error(error.response?.data?.message || "Registration failed. Please try again.");
        setStatusRegister(false);
      });
  }
        
  return (
    <Card className="w-full max-w-sm mx-auto mt-20">
      <CardHeader>
        <CardTitle>Register a new account</CardTitle>
        <CardDescription>
          Enter your username below to register a new account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                onChange={(e) => setUsername(e.target.value)}
                id="username"
                type="text"
                placeholder="username"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" onChange={(e) => setPassword(e.target.value)} type="password" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" onChange={(e) => setConfirmPassword(e.target.value)} type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button disabled={statusRegister} onClick={handleClickLogin} type="button" className="w-full bg-green-500 text-white border-green-500 hover:bg-green-600">
          {statusRegister ? <div className="d-flex">Registering... <Spinner/> </div> : "Register"}
        </Button>
        <Link to="/login" className="w-full text-center">
          <Button variant={"outline"} className="w-full bg-transparent">
            have an account? Login
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

export default RegisterPage;