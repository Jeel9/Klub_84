import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import Button from "../../components/Button";
import Input from "../../components/Input";

export default function LoginPage({ onLogin }: any) {

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = async () => {

    const success = await invoke<boolean>("login", {
      username,
      password
    });

    if(success){
      onLogin();
    } else {
      alert("Invalid credentials");
    }

  };

  return (
    <div style={{width:300, display:"flex", flexDirection:"column", gap:20, alignItems:"center", justifyContent:"center", height:"100vh", margin:"0 auto"}}>

      <h2>Klub84 Login</h2>

      <Input
        placeholder="Username"
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
      />

      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />

      <Button onClick={handleLogin}>
        Login
      </Button>

    </div>
  );
}