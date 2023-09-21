import { useEffect, useState } from "react";
import liff from "@line/liff";
import { AppRoutes as Routes } from "./router"
import "./App.css";

function App() {

  useEffect(() => {
    liff
      .init({
        liffId: import.meta.env.VITE_LIFF_ID
      })
      .then(() => {
        console.log("LIFF init succeeded.");
      })
      .catch((e) => {
        console.error("LIFF init failed.", e);
      });
  });

  return (
    <div className="App">
        <Routes />
    </div>
  );
}

export default App;
