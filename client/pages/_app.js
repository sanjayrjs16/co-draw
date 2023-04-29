import "../src/styles/globals.css";
import React from "react";
import { FabricContext } from "@/context/FabricContext";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "@reduxjs/toolkit";
import { store } from "@/redux/store/configureStore";
export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <FabricContext.Provider value={React.createRef()}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </FabricContext.Provider>
    </Provider>
  );
}
