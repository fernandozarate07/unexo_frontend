"use client";

import { createContext, useContext, useState, useCallback } from "react";

const UserContributionsContext = createContext();

export function UserContributionsProvider({ children }) {
  const [userContributions, setUserContributions] = useState([]);

  // Función memoizada para evitar recreación en cada render
  const fetchUserContributions = useCallback(async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contribution/recoverUserContributions`, {
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        setUserContributions(data.contributions);
        console.log("Contribuciones del usuario recuperadas:", data.contributions);
      } else {
        console.error("ERROR: Error al recuperar contribuciones:", data.message || res.statusText);
      }
    } catch (err) {
      console.error("ERROR: Error al recuperar contribuciones:", err);
    }
  }, []); // Dependencias vacías ya que no usa valores externos

  return (
    <UserContributionsContext.Provider
      value={{
        userContributions,
        fetchUserContributions,
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
