"use client"; // Indicador para que Next.js lo trate como un componente del lado del cliente

// Hooks de React y Next.js
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// Componentes personalizados
import CascadeFilter from "@/components/cascadeFilter";
import { Flex, Text } from "@chakra-ui/react";
import CardResult from "@/components/CardResult";
import Contribution from "@/components/Contribution";
import NextImage from "next/image";

// Componente principal de la página de búsqueda
const SearchPage = () => {
  const searchParams = useSearchParams(); // Hook de Next para acceder a los query params de la URL
  const router = useRouter(); // Hook para cambiar de ruta programáticamente
  const [results, setResults] = useState([]); // Estado con los resultados obtenidos del filtro
  const [selectedResult, setSelectedResult] = useState(null); // Resultado seleccionado en la lista

  // Efecto que se dispara cuando cambian los searchParams (query de la URL)
  useEffect(() => {
    const fetchResults = async () => {
      const params = new URLSearchParams();
      for (const [key, value] of searchParams.entries()) {
        params.append(key, value); // Convierte los query params en string para el fetch
      }

      try {
        // Llamada a la API del backend con los filtros
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/filter/cascadeFilter?${params.toString()}`);
        const json = await res.json();
        setResults(json.data.result); // Setea los resultados
      } catch (err) {
        console.error("Error cargando resultados:", err);
      }
    };

    fetchResults(); // Llama a la función cuando cambia la URL
  }, [searchParams]);

  // Función para actualizar los filtros (se actualiza la URL)
  const handleFilterSubmit = (params) => {
    router.push(`/search?${params.toString()}`);
  };

  return (
    // Contenedor principal de la página
    <Flex
      h={{ base: "1600px", md: "calc(100vh - 80px)" }} // altura responsiva
      maxW="1200px"
      mx="auto"
      p="6"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap="6">
      {/* Filtro en cascada con valores iniciales desde la URL */}
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

      {/* Contenedor que divide la vista en lista de resultados (izquierda) y detalle (derecha) */}
      <Flex
        w="100%"
        height={{ base: "auto", md: "100%" }}
        flexDirection={{ base: "column", md: "row" }}
        overflow="hidden"
        boxShadow="md"
        borderRadius="md">
        {/* Columna izquierda: lista de resultados */}
        <Flex
          m="3"
          p="3"
          flex="1"
          overflow="auto"
          flexDirection="column"
          gap="3"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md">
          {/* Si hay resultados, los renderiza como tarjetas. Si no, muestra mensaje e imagen */}
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

        {/* Columna derecha: detalle del resultado seleccionado */}
        <Flex m="3" p="3" flex="1.5" overflow="auto" border="1px solid" borderColor="gray.200" borderRadius="md">
          {selectedResult ? (
            <Contribution result={selectedResult} />
          ) : (
            <Flex flex="1.5" flexDirection="column" alignItems="center" justifyContent="center" gap="6">
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
  );
};

export default SearchPage;
