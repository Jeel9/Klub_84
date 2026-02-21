import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Toolbar";
import { invoke } from "@tauri-apps/api/core";

function TestPurchase() {
  const test = async () => {
    try {
      // 1️⃣ Create purchase
      await invoke("create_share_purchase", {
        memberId: "K84-0002",     // use real member_id from your DB
        companyId: 1,
        schemeId: "K84-0001",        // use actual scheme_id from schemes table
        quantity: 5,
        pricePerShare: 5000,
        firstPayment: 5000
      });

      console.log("Purchase created");

      // 2️⃣ Fetch purchases
      const purchases = await invoke("get_member_share_purchases", {
        memberId: "K84-0002"
      });

      console.log("Purchases:", purchases);

    } catch (err) {
      console.error(err);
    }
  };

  return <button onClick={test}>Test Purchase</button>;
}

export default function AppLayout() {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-content">
        <Topbar />
        <div className="content-area">
          <Outlet />
          <TestPurchase />
        </div>
      </div>
    </div>
  );
}
