"use client";

import React, { createContext, useState, useContext } from "react";

const LoadingContext = createContext({
  loading: false,
  setLoading: () => {},
});

export const LoadingProvider = ({ children }) => {
  const [loadingPage, setLoadingPage] = useState(true);

  return <LoadingContext.Provider value={{ loadingPage, setLoadingPage }}>{children}</LoadingContext.Provider>;
};

// Hook para usarlo fácilmente
export const useLoading = () => useContext(LoadingContext);
