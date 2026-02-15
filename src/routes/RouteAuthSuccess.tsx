import Dashboard from "@/pages/Dashboard";

const RouteAuthSuccess = [
  {
    index: true,
    element: <Dashboard />,
  },
  {
    path: "ruangan",
    element: <div>Ruangan</div>,
  },
  {
    path: "booking",
    element: <div>Booking</div>,
  }
];

export default RouteAuthSuccess;