import { createBrowserRouter } from "react-router";
import Home from "../../features/home/Home";
import App from "../layout/App";
import EventDetails from "../../features/events/details/EventDetails";
import EventDashboard from "../../features/events/dashboard/EventDashboard";
import EventForm from "../../features/events/form/EventForm";
import ErrorBoundary from "../layout/ErrorBoundary";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "events",
        element: <EventDashboard />,
      },
      {
        path: "events/:id",
        element: <EventDetails />,
      },
      {
        path: "manage/:id",
        element: <EventForm />,
      },
      {
        path: "createEvent",
        element: <EventForm />,
      }
    ]
  }
]);