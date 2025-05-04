"use client";

import { createContext, useContext, useState, useCallback } from "react";

const UserContributionsContext = createContext();

export function UserContributionsProvider({ children }) {
  const [userContributions, setUserContributions] = useState([]); //Aportes
  const [userSavedContributions, setUserSavedContributions] = useState([]); // Aportes guardados del usuario
  const [isLoadingFetchContributions, setIsLoadingFetchContributions] = useState(false);
  const [isLoadingFetchSavedContributions, setIsLoadingFetchSavedContributions] = useState(false);

  // Función memoizada para evitar recreación en cada render
  const fetchUserContributions = useCallback(async () => {
    setIsLoadingFetchContributions(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contribution/recoverUserContributions`, {
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error al recuperar los aportes del usuario");
      }
      setUserContributions(data.contributions);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingFetchContributions(false);
    }
  }, []); // Dependencias vacías ya que no usa valores externos

  // Función memoizada para evitar recreación en cada render
  const fetchUserSavedContributions = useCallback(async () => {
    try {
      setIsLoadingFetchSavedContributions(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/savedContribution/recoverUserSavedContributions`,
        {
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error al recuperar los aportes guardados del usuario");
      }
      setUserSavedContributions(data.savedContributions);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingFetchSavedContributions(false);
    }
  }, []); // Dependencias vacías ya que no usa valores externos

  return (
    <UserContributionsContext.Provider
      value={{
        userContributions,
        userSavedContributions,
        isLoadingFetchContributions,
        isLoadingFetchSavedContributions,
        fetchUserContributions,
        fetchUserSavedContributions,
      }}>
      {children}
    </UserContributionsContext.Provider>
  );
}

export function useUserContributions() {
  const context = useContext(UserContributionsContext);

  if (context === undefined) {
    throw new Error("useUserContributions (context) debe usarse dentro de un UserContributionsProvider");
  }

  return context;
}
