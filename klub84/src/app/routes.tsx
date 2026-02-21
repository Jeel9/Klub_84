import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import MembersPage from "./modules/pages/MembersPage";
import PaymentsPage from "./modules/pages/PaymentsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "members",
        element: <MembersPage />,
      },
      {
        path: "payments",
        element: <PaymentsPage />,
      },
    ],
  },
]);

export default router;
