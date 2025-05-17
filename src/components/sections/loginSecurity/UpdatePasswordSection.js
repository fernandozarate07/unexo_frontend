"use client";

import { Flex, Heading, Separator } from "@chakra-ui/react";
import { useAuth } from "@/context/AuthContext";
import UpdatePassword from "@/components/configurationComponents/UpdatePassword";

/**
 * UpdatePasswordSection
 *
 * Componente base para cambiar contraseña.
 *
 * @returns {JSX.Element} Seccion de cambiar contraseña
 */
export default function AccountProfile() {
  return (
    <Flex
      as="section"
      id="updatePassword"
      scrollMarginTop="84px"
      w="100%"
      maxW="1200px"
      mx="auto"
      flexDirection="column"
      justifyContent="center"
      gap="3"
      p="3"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      boxShadow="sm"
      bg="white">
      {/* Encabezado */}
      <Heading w="100%" fontSize="2xl" fontWeight="bold">
        Cambiar contraseña
      </Heading>

      {/* Separador visual entre el título y el contenido */}
      <Separator />

      {/* Contenedor de las secciones de foto de perfil e información del usuario */}
      <Flex gap="6" alignItems="center">
        {/* Boton componente que cambia contraseña */}
        <UpdatePassword />
      </Flex>
    </Flex>
  );
}
