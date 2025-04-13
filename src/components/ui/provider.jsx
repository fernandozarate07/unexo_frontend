"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

export function UiProvider({ children }) {
  return <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>;
}
