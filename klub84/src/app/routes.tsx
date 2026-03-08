import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import MembersPage from "./modules/pages/MembersPage";
import PaymentsPage from "./modules/pages/PaymentsPage";
import SharesPage from "./modules/pages/SharePage";
import PurchasesPage from "./modules/pages/PurchasePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout/>,
    children: [
      {
        path: "members",
        element: <MembersPage/>,
      },
      {
        path: "payments",
        element: <PaymentsPage/>,
      },
      {
        path: "shares",
        element: <SharesPage/>,
      },
      {
        path: "dashboard",
        element: <PurchasesPage/>,
      },
    ],
  },
]);

export default router;
