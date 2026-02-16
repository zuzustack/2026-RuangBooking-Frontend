import BookingPage from "@/pages/BookingPage";
import Dashboard from "@/pages/Dashboard";
import RoomPage from "@/pages/RoomPage";

const RouteAuthSuccess = [
  {
    index: true,
    element: <Dashboard />,
  },
  {
    path: "ruangan",
    element: <RoomPage />,
  },
  {
    path: "booking",
    element: <BookingPage />,
  }
];

export default RouteAuthSuccess;