"use client";

import "@styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import Chatbot from "@components/Chatbot";

function Rootlayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* className="app" remove since this is not set to initial css */}
        <main>
          <SessionProvider>
            <ChakraProvider>{children}</ChakraProvider>
          </SessionProvider>
          {/* <Chatbot /> */}
        </main>
      </body>
    </html>
  );
}

export default Rootlayout;
