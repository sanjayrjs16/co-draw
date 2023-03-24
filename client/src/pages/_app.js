import "@/styles/globals.css";
import React from "react";
import { FabricContext } from "@/context/FabricContext";
import { ChakraProvider } from "@chakra-ui/react";
export default function App({ Component, pageProps }) {
  return (
    <FabricContext.Provider value={React.createRef()}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </FabricContext.Provider>
  );
}
