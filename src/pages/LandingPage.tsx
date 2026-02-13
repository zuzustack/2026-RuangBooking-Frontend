import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

function LandingPage() {
  return (
    // topbar
    <div className="min-h-screen">
      <header className="bg-blue-600 text-white p-4 flex">
        <h1 className="text-3xl font-bold">RuangBooking</h1>
        <div className="flex items-center ml-auto space-x-4">
          <Link to="/login">
            <Button className="text-white border-white  hover:bg-white hover:text-blue-600 bg-green-500">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button className="text-white border-white  hover:bg-white hover:text-blue-600 bg-green-500">
              Register
            </Button>
          </Link>
        </div>
      </header>

      {/* main content */}
      <main className="p-8 max-w-4xl mx-auto">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p>
            At RuangBooking, we aim to simplify the process of booking rooms and
            facilities for everyone. Whether you're planning a meeting, event,
            or study session, our platform makes it easy to find and reserve the
            perfect space.
          </p>
        </section>
      </main>

      {/* footer */}
      <footer className="bg-gray-200 text-center p-4 mt-8">
        <p>&copy; 2026 Zuzustack. Develop with ❤️</p>
      </footer>
    </div>
  );
}

export default LandingPage;
