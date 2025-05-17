"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useUserContributions } from "@/context/UserContributionsContext";
import DeleteSavedContributionButton from "@/components/accountComponents/userSavedContributions/DeleteSavedContributionButton";
import TruncatedDescription from "@/components/accountComponents/userContributions/TruncatedDescription";
import TruncatedTitle from "@/components/accountComponents/userContributions/TruncatedTitle";
import {
  Table,
  Pagination,
  ButtonGroup,
  Heading,
  Separator,
  Flex,
  Box,
  Spinner,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

// Configuración
const PAGE_SIZE = 5;
const TABLE_COLUMNS = [
  { header: "Autor", accessor: "contribution.user.name" },
  { header: "Título", accessor: "contribution.title" },
  { header: "Descripción", accessor: "contribution.description" },
  { header: "Tipo", accessor: "contribution.type.name" },
  { header: "Acciones", accessor: "actions" },
];

/**
 * Componente que renderiza la lista de aportes guardados del usuario, con soporte para paginación.
 *
 * @returns {JSX.Element} Sección de la cuenta de usuario que muestra los aportes guardados.
 */
export default function AccountContribution() {
  const { userSavedContributions, fetchUserSavedContributions, isLoadingFetchSavedContributions } =
    useUserContributions();

  const [currentPage, setCurrentPage] = useState(1);

  /**
   * Calcula la cantidad total de páginas según la cantidad de aportes guardados.
   *
   * @type {number}
   */
  const totalPages = useMemo(() => Math.ceil(userSavedContributions.length / PAGE_SIZE), [userSavedContributions]);

  /**
   * Subconjunto paginado de los aportes a mostrar en la tabla actual.
   *
   * @type {Array}
   */
  const paginatedContributions = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return userSavedContributions.slice(startIndex, startIndex + PAGE_SIZE);
  }, [userSavedContributions, currentPage]);

  /**
   * Cambia a una página específica.
   * @param {number} newPage - Número de página al que se desea navegar.
   */
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

  /** Obtiene los aportes guardados al montar el componente. */
  useEffect(() => {
    fetchUserSavedContributions();
  }, [fetchUserSavedContributions]);

  /**
   * Renderiza el encabezado de la tabla.
   * @returns {JSX.Element}
   */
  const renderTableHeader = () => (
    <Table.Row borderBottom="1px solid" borderColor="gray.200">
      {TABLE_COLUMNS.map((column) => (
        <Table.ColumnHeader key={column.accessor}>{column.header}</Table.ColumnHeader>
      ))}
    </Table.Row>
  );

  /**
   * Renderiza una fila de la tabla con datos de un aporte guardado.
   * @param {Object} item - Objeto de aporte guardado.
   * @returns {JSX.Element}
   */
  const renderTableRow = (item) => (
    <Table.Row key={item.id}>
      <Table.Cell>
        <TruncatedTitle title={item.contribution.user.name} />
      </Table.Cell>
      <Table.Cell>
        <TruncatedTitle title={item.contribution.title} />
      </Table.Cell>
      <Table.Cell>
        <TruncatedDescription description={item.contribution.description} />
      </Table.Cell>
      <Table.Cell>{item.contribution.type.name}</Table.Cell>
      <Table.Cell>
        <DeleteSavedContributionButton contributionId={item.contribution.id} onSuccess={fetchUserSavedContributions} />
      </Table.Cell>
    </Table.Row>
  );

  /**
   * Renderiza los controles de paginación.
   * @returns {JSX.Element}
   */
  const renderPagination = () => (
    <Pagination.Root count={userSavedContributions.length} pageSize={PAGE_SIZE} page={currentPage}>
      <ButtonGroup variant="ghost" size="sm" wrap="wrap">
        <Pagination.PrevTrigger asChild>
          <IconButton onClick={handlePrevPage}>
            <LuChevronLeft />
          </IconButton>
        </Pagination.PrevTrigger>

        <Pagination.Items
          render={(page) => (
            <IconButton variant={{ base: "ghost", _selected: "outline" }} onClick={() => handlePageChange(page.value)}>
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
  );

  return (
    <Flex
      as="section"
      id="accountSavedContributions"
      scrollMarginTop="84px"
      p="3"
      w="100%"
      maxW="1200px"
      mx="auto"
      direction="column"
      gap="3"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      boxShadow="sm"
      bg="white">
      <Heading w="100%" fontSize="2xl" fontWeight="bold">
        Aportes guardados
      </Heading>
      <Separator />

      {isLoadingFetchSavedContributions ? (
        <Spinner size="md" alignSelf="center" />
      ) : userSavedContributions.length === 0 ? (
        <Text textAlign="center">No tienes aportes guardados.</Text>
      ) : (
        <Box overflowX="auto">
          <Flex minW="800px" flexDirection="column" gap="3">
            <Table.Root size="sm" showColumnBorder variant="line">
              <Table.Header>{renderTableHeader()}</Table.Header>
              <Table.Body>{paginatedContributions.map(renderTableRow)}</Table.Body>
            </Table.Root>
            {renderPagination()}
          </Flex>
        </Box>
      )}
    </Flex>
  );
}
