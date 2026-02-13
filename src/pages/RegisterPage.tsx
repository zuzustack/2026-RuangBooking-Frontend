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
import { Link } from "react-router-dom";

function RegisterPage() {
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
              <Input id="password" type="password" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full bg-green-500 text-white border-green-500 hover:bg-green-600">
          Register
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