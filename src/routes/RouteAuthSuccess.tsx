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
    element: <div>Booking</div>,
  }
];

export default RouteAuthSuccess;