"use client";

import { Table, Badge, Link, Heading, Separator, Flex, Box, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import NextLink from "next/link";
import { useUserContributions } from "@/context/UserContributionsContext";
import { IoIosTrendingUp } from "react-icons/io";
import DeleteContributionButton from "@/components/accountComponents/userContributions/DeleteContributionButton";
import UpdateContributionButton from "@/components/accountComponents/userContributions/UpdateContributionButton";
import TruncatedDescription from "@/components/accountComponents/userContributions/TruncatedDescription";
import TruncatedTitle from "@/components/accountComponents/userContributions/TruncatedTitle";

export default function AccountContribution() {
  const { userContributions, fetchUserContributions } = useUserContributions();

  useEffect(() => {
    fetchUserContributions();
  }, [fetchUserContributions]);

  return (
    <Flex
      as="section"
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
      {!userContributions.length ? (
        <Spinner size="md" alignSelf="center" />
      ) : (
        <Box overflowX="auto">
          <Box minW="800px">
            <Table.Root size="sm" variant="simple">
              <Table.Header>
                <Table.Row borderBottom="1px solid" borderColor="gray.200">
                  <Table.ColumnHeader>Título</Table.ColumnHeader>
                  <Table.ColumnHeader>descripción</Table.ColumnHeader>
                  <Table.ColumnHeader>Tipo</Table.ColumnHeader>
                  <Table.ColumnHeader>Link</Table.ColumnHeader>
                  <Table.ColumnHeader>Estado</Table.ColumnHeader>
                  <Table.ColumnHeader>Likes</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="end">Acciones</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {userContributions.map((item) => (
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
                      <Badge colorPalette={item.isActive ? "green" : "red"}>
                        {item.isActive ? "Activo" : "Inactivo"}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell>{item.likesCount}</Table.Cell>
                    <Table.Cell justifyContent="end" display="flex" gap="1" borderRadius="full">
                      {/* crear nuevos dos componentes que se encarguen de la parte de editar y eliminar */}
                      <UpdateContributionButton contribution={item} onSuccess={fetchUserContributions} />
                      <DeleteContributionButton contributionId={item.id} onSuccess={fetchUserContributions} />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Box>
      )}
    </Flex>
  );
}
