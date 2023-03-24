import "@/styles/globals.css";
import React from "react";
import { FabricContext } from "@/context/FabricContext";
export default function App({ Component, pageProps }) {
  return (
    <FabricContext.Provider value={React.createRef()}>
      <Component {...pageProps} />
    </FabricContext.Provider>
  );
}
