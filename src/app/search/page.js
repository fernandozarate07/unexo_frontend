"use client"; // Indicador para que Next.js lo trate como un componente del lado del cliente

// Hooks de React y Next.js
import { useEffect, useState, useMemo, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

// Componentes personalizados
import CascadeFilter from "@/components/CascadeFilter";
import { Flex, Text, Spinner, Pagination, IconButton, ButtonGroup } from "@chakra-ui/react";
import CardResult from "@/components/CardResult";
import Contribution from "@/components/Contribution";

// Componente principal de la página de búsqueda
const SearchPage = () => {
  const searchParams = useSearchParams(); // Hook de Next para acceder a los query params de la URL
  const router = useRouter(); // Hook para cambiar de ruta programáticamente
  const [results, setResults] = useState([]); // Estado con los resultados obtenidos del filtro
  const [selectedResult, setSelectedResult] = useState(null); // Resultado seleccionado en la lista
  const [isLoading, setIsloading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const PAGE_SIZE = 20;
  const TABLE_COLUMNS = [
    { header: "Autor", accessor: "contribution.user.name" },
    { header: "Título", accessor: "contribution.title" },
    { header: "Descripción", accessor: "contribution.description" },
    { header: "Tipo", accessor: "contribution.type.name" },
    { header: "Acciones", accessor: "actions" },
  ];
  const totalPages = useMemo(() => Math.ceil(results.length / PAGE_SIZE), [results]);

  const paginatedResults = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return results.slice(startIndex, startIndex + PAGE_SIZE);
  }, [results, currentPage]);

  const handlePageChange = useCallback((newPage) => {
    setCurrentPage(newPage);
  }, []);

  /** Navega a la página anterior. */
  const handlePrevPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  /** Navega a la página siguiente. */
  const handleNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  // Efecto que se dispara cuando cambian los searchParams (query de la URL)
  useEffect(() => {
    setIsloading(true);
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
      } finally {
        setIsloading(false);
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
      w="100%"
      mx="auto"
      p="6"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap="6"
      bgColor="gray.50">
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
        maxW="1200px"
        height={{ base: "auto", md: "100%" }}
        flexDirection={{ base: "column", md: "row" }}
        overflow="hidden">
        {/* Columna izquierda: lista de resultados */}
        <Flex
          m="3"
          px="3"
          py="3"
          flexDirection="column"
          flex="1"
          gap="3"
          boxShadow="md"
          borderRadius="md"
          bgColor="white">
          <Flex overflow="auto" flex="1" flexDirection="column" gap="3">
            {isLoading ? (
              <Flex flex="1" flexDirection="column" alignItems="center" justifyContent="center">
                <Spinner size="xl" alignSelf="center" />
              </Flex>
            ) : results.length > 0 ? (
              paginatedResults.map((item) => (
                <CardResult
                  key={item.id}
                  result={item}
                  onClick={() => setSelectedResult(item)}
                  isSelected={selectedResult?.id === item.id}
                />
              ))
            ) : (
              <Flex
                flex="1"
                justifyContent="center"
                bgImage="url(/404_2.svg)"
                bgRepeat="no-repeat"
                bgSize="400px"
                backgroundPositionX="center"
                backgroundPositionY="bottom"></Flex>
            )}
          </Flex>
          <Flex>
            {/* paginación de los resultado de busqueda  */}
            <Pagination.Root count={results.length} pageSize={PAGE_SIZE} page={currentPage}>
              <ButtonGroup variant="ghost" size="sm" wrap="wrap">
                <Pagination.PrevTrigger asChild>
                  <IconButton onClick={handlePrevPage}>
                    <LuChevronLeft />
                  </IconButton>
                </Pagination.PrevTrigger>

                <Pagination.Items
                  render={(page) => (
                    <IconButton
                      variant={{ base: "ghost", _selected: "outline" }}
                      onClick={() => handlePageChange(page.value)}>
                      {page.value}
                    </IconButton>
                  )}
                />

                <Pagination.NextTrigger asChild>
                  <IconButton onClick={handleNextPage}>
                    <LuChevronRight />
                  </IconButton>
                </Pagination.NextTrigger>
              </ButtonGroup>
            </Pagination.Root>
          </Flex>
        </Flex>
        {/* Columna derecha: detalle del resultado seleccionado */}
        <Flex m="3" px="4" py="3" flex="1.5" overflow="auto" boxShadow="md" borderRadius="md" bgColor="white">
          {selectedResult ? (
            <Contribution result={selectedResult} selectedResult={selectedResult} />
          ) : (
            <Flex
              flex="1.5"
              justifyContent="center"
              gap="6"
              bgImage="url(/404.svg)"
              bgRepeat="no-repeat"
              bgSize="400px"
              backgroundPositionX="center"
              backgroundPositionY="center"></Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SearchPage;
