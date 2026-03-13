import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Toolbar";
import LoginPage from "../modules/pages/LoginPage";
import { useState } from "react";


export default function AppLayout() {
  const [loggedIn,setLoggedIn] = useState(false);

  if(!loggedIn){
    return <LoginPage onLogin={()=>setLoggedIn(true)} />;
  }

  return (
    <div className="app-layout">
      
      <Sidebar />

      <div className="main-content">
        <Topbar />
        <div className="content-area">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
