"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useLoading } from "@/context/LoadingContext";

import CascadeFilter from "@/components/CascadeFilter";
import { Flex, Spinner, Pagination, IconButton, ButtonGroup } from "@chakra-ui/react";
import CardResult from "@/components/CardResult";
import Contribution from "@/components/Contribution";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const { loadingPage, setLoadingPage } = useLoading();

  const PAGE_SIZE = 20;

  const totalPages = useMemo(() => Math.ceil(results.length / PAGE_SIZE), [results]);

  const paginatedResults = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return results.slice(startIndex, startIndex + PAGE_SIZE);
  }, [results, currentPage]);

  const handlePageChange = useCallback((newPage) => {
    setCurrentPage(newPage);
  }, []);

  const handlePrevPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const handleNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  useEffect(() => {
    setLoadingPage(true); // Inicio carga global página
    setIsLoading(true); // Inicio carga local resultados

    const fetchResults = async () => {
      const params = new URLSearchParams();
      for (const [key, value] of searchParams.entries()) {
        params.append(key, value);
      }
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/filter/cascadeFilter?${params.toString()}`);
        const json = await res.json();
        setResults(json.data.result);
        setSelectedResult(null);
        setCurrentPage(1);
      } catch (err) {
        console.error("Error cargando resultados:", err);
      } finally {
        setIsLoading(false); // Termino carga local
        setLoadingPage(false); // Termino carga global página
      }
    };

    fetchResults();
  }, [searchParams, setLoadingPage]);

  const handleFilterSubmit = (params) => {
    router.push(`/search?${params.toString()}`);
  };

  return (
    <Flex
      h={{ base: "1600px", md: "calc(100vh - 80px)" }}
      w="100%"
      mx="auto"
      p="6"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap="6"
      bgColor="gray.50">
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

      <Flex
        w="100%"
        maxW="1200px"
        height={{ base: "auto", md: "100%" }}
        flexDirection={{ base: "column", md: "row" }}
        overflow="hidden">
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
                backgroundPositionY="bottom"
              />
            )}
          </Flex>

          <Flex>
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
              backgroundPositionY="center"
            />
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SearchPage;
