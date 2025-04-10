"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import CascadeFilter from "@/components/cascadeFilter";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [results, setResults] = useState([]);

  const selectedFromParams = {};
  ["type", "faculty", "degree", "academicYear", "subject"].forEach((key) => {
    const val = searchParams.get(key);
    if (val) selectedFromParams[key] = val;
  });

  useEffect(() => {
    const fetchResults = async () => {
      const params = new URLSearchParams();
      for (const [key, value] of searchParams.entries()) {
        params.append(key, value);
      }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/filter/cascadeFilter?${params.toString()}`);
        const json = await res.json();
        setResults(json.data.result);
      } catch (err) {
        console.error("Error cargando resultados:", err);
      }
    };

    fetchResults();
  }, [searchParams]);

  const handleFilterSubmit = (params) => {
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <CascadeFilter initialSelected={selectedFromParams} onSubmit={handleFilterSubmit} />

      <h2 style={{ fontSize: "1.25rem", margin: "2rem 0 1rem" }}>Resultados</h2>
      {results.length === 0 ? (
        <p>No se encontraron resultados.</p>
      ) : (
        <ul>
          {results.map((item) => (
            <li key={item.id}>{item.title || item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchPage;
