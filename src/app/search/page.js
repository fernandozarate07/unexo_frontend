"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import CascadeFilter from "@/components/cascadeFilter";
import { Flex, Text } from "@chakra-ui/react";
import CardResult from "@/components/CardResult";
import Contribution from "@/components/Contribution";
import NextImage from "next/image";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);

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
    <Flex alignItems="flex-start" justifyContent="center" p="6" h="calc(100vh - 80px)">
      <Flex w="100%" h="100%" maxW="1200px" alignItems="center" justifyContent="center" flexDirection="column" gap="6">
        <CascadeFilter
          initialSelected={{
            type: searchParams.get("type"),
            faculty: searchParams.get("faculty"),
            degree: searchParams.get("degree"),
            academicYear: searchParams.get("academicYear"),
            subject: searchParams.get("subject"),
          }}
          onSubmit={handleFilterSubmit}
        />
        <Flex flex="1" overflow="hidden" w="100%">
          <Flex m="3" p="3" flex="1" overflow="auto" flexDirection="column" gap="3" boxShadow="md" borderRadius="md">
            {results.length > 0 ? (
              results.map((item) => (
                <CardResult
                  key={item.id}
                  result={item}
                  onClick={() => setSelectedResult(item)}
                  isSelected={selectedResult?.id === item.id}
                />
              ))
            ) : (
              <Flex flex="1" flexDirection="column" alignItems="center" justifyContent="center" gap="6">
                <NextImage
                  src="/404_search_list.svg"
                  alt="Preview"
                  width={400}
                  height={400}
                  style={{ objectFit: "contain" }}
                />
                <Text color="cyan.600" fontSize="sm" textAlign="center">
                  Aquí se mostrará la lista de resultados una vez se encuentren coincidencias con tu búsqueda.
                </Text>
              </Flex>
            )}
          </Flex>
          <Flex m="3" p="3" flex="1.5" overflow="auto" boxShadow="md" borderRadius="md">
            {selectedResult ? (
              <Contribution result={selectedResult} />
            ) : (
              <Flex flex="1" flexDirection="column" alignItems="center" justifyContent="center" gap="6">
                <NextImage
                  src="/404_search.svg"
                  alt="Preview"
                  width={400}
                  height={400}
                  style={{ objectFit: "contain" }}
                />
                <Text color="cyan.600" fontSize="xs" textAlign="center">
                  Aquí verás la información detallada del aporte una vez selecciones uno.
                </Text>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SearchPage;
