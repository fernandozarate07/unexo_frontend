"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import NextLink from "next/link";
import { useUserContributions } from "@/context/UserContributionsContext";
import { IoIosTrendingUp } from "react-icons/io";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import DeleteContributionButton from "@/components/accountComponents/userContributions/DeleteContributionButton";
import UpdateContributionButton from "@/components/accountComponents/userContributions/UpdateContributionButton";
import TruncatedDescription from "@/components/accountComponents/userContributions/TruncatedDescription";
import TruncatedTitle from "@/components/accountComponents/userContributions/TruncatedTitle";
import {
  Table,
  Badge,
  Link,
  Heading,
  Separator,
  Flex,
  Box,
  Spinner,
  Text,
  Pagination,
  ButtonGroup,
  IconButton,
} from "@chakra-ui/react";

/**
 * Número máximo de aportes mostrados por página.
 * @constant
 * @type {number}
 */
const PAGE_SIZE = 5;

/**
 * Columnas que se muestran en la tabla de aportes.
 * @constant
 * @type {Array<{ header: string, accessor: string }>}
 */
const TABLE_COLUMNS = [
  { header: "Título", accessor: "title" },
  { header: "Descripción", accessor: "description" },
  { header: "Tipo", accessor: "type.name" },
  { header: "Link", accessor: "url" },
  { header: "Estado", accessor: "isActive" },
  { header: "Likes", accessor: "likesCount" },
  { header: "Acciones", accessor: "actions" },
];

/**
 * Componente que muestra los aportes realizados por el usuario en su cuenta.
 * Incluye paginación, acciones de editar y eliminar, y vista truncada de los títulos y descripciones.
 *
 * @component
 * @returns {JSX.Element} Sección de contribuciones del usuario con tabla paginada.
 */
export default function AccountContribution() {
  const { userContributions, fetchUserContributions, isLoadingFetchContributions } = useUserContributions();

  const [currentPage, setCurrentPage] = useState(1);

  /**
   * Calcula el total de páginas necesarias en base al tamaño de página y la cantidad de contribuciones.
   * @returns {number}
   */
  const totalPages = useMemo(() => Math.ceil(userContributions.length / PAGE_SIZE), [userContributions]);

  /**
   * Obtiene el subconjunto de contribuciones correspondientes a la página actual.
   * @returns {Array} Contribuciones paginadas
   */
  const paginatedContributions = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return userContributions.slice(startIndex, startIndex + PAGE_SIZE);
  }, [userContributions, currentPage]);

  /**
   * Cambia a una página específica.
   * @param {number} newPage - Número de página al que se quiere cambiar.
   */
  const handlePageChange = useCallback((newPage) => {
    setCurrentPage(newPage);
  }, []);

  /**
   * Cambia a la página anterior si existe.
   */
  const handlePrevPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  /**
   * Cambia a la página siguiente si existe.
   */
  const handleNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  /**
   * Efecto para obtener las contribuciones del usuario al montar el componente.
   */
  useEffect(() => {
    fetchUserContributions();
  }, [fetchUserContributions]);

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
   * Renderiza una fila de la tabla con los datos de una contribución.
   * @param {Object} item - Objeto con los datos de una contribución.
   * @returns {JSX.Element}
   */
  const renderTableRow = (item) => (
    <Table.Row key={item.id}>
      <Table.Cell>
        <TruncatedTitle title={item.title} />
      </Table.Cell>
      <Table.Cell>
        <TruncatedDescription description={item.description} />
      </Table.Cell>
      <Table.Cell>{item.type.name}</Table.Cell>
      <Table.Cell>
        <Link
          as={NextLink}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          color="blue.500"
          focusRing="none"
          textDecoration="none">
          Ir a Drive <IoIosTrendingUp />
        </Link>
      </Table.Cell>
      <Table.Cell>
        <Badge colorPalette={item.isActive ? "green" : "red"}>{item.isActive ? "Activo" : "Inactivo"}</Badge>
      </Table.Cell>
      <Table.Cell>{item.likesCount}</Table.Cell>
      <Table.Cell>
        <DeleteContributionButton contributionId={item.id} onSuccess={fetchUserContributions} />
        <UpdateContributionButton contribution={item} onSuccess={fetchUserContributions} />
      </Table.Cell>
    </Table.Row>
  );

  /**
   * Renderiza la sección de paginación con botones para navegar entre páginas.
   * @returns {JSX.Element}
   */
  const renderPagination = () => (
    <Pagination.Root count={userContributions.length} pageSize={PAGE_SIZE} page={currentPage}>
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
      id="accountContribution"
      scrollMarginTop="80px"
      p="3"
      w="100%"
      maxW="1200px"
      mx="auto"
      direction="column"
      gap="3"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md">
      <Heading w="100%" fontSize="2xl" fontWeight="bold">
        Mis aportes
      </Heading>
      <Separator />

      {isLoadingFetchContributions ? (
        <Spinner size="md" alignSelf="center" />
      ) : userContributions.length === 0 ? (
        <Text textAlign="center">No tienes aportes subidos.</Text>
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
