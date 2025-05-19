// components/RouteChangeHandler.js
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLoading } from "@/context/LoadingContext";

export default function RouteChangeHandler() {
  const pathname = usePathname();
  const { setLoadingPage } = useLoading();

  useEffect(() => {
    setLoadingPage(true);
    const timeout = setTimeout(() => {
      setLoadingPage(false);
    }, 400); // tiempo artificial de carga para que se vea el loader

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}
