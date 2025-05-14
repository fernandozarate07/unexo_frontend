"use client";

import { Flex, Heading, Separator } from "@chakra-ui/react";
import { useAuth } from "@/context/AuthContext";
import ProfilePhotoSection from "@/components/accountComponents/Profile/ProfilePhoto";
import UserInfoSection from "@/components/accountComponents/Profile/UserInfo";

/**
 * AccountProfile
 *
 * Página de perfil de usuario.
 * Muestra la foto de perfil y la información del usuario en secciones separadas,
 * permitiendo actualizaciones en ambas a través del contexto de autenticación.
 *
 * @returns {JSX.Element} Sección de perfil de cuenta.
 */
export default function AccountProfile() {
  // Obtiene el usuario actual y una función para refrescar sus datos desde el contexto de autenticación
  const { user, refetchUser } = useAuth();

  return (
    <Flex
      as="section"
      id="accountProfile"
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
      boxShadow="sm">
      {/* Encabezado de la sección de perfil */}
      <Heading w="100%" fontSize="2xl" fontWeight="bold">
        Perfil
      </Heading>

      {/* Separador visual entre el título y el contenido */}
      <Separator />

      {/* Contenedor de las secciones de foto de perfil e información del usuario */}
      <Flex gap="6" alignItems="center">
        {/* Sección de edición de foto de perfil */}
        <ProfilePhotoSection user={user} refetchUser={refetchUser} />

        {/* Sección de visualización y edición de información del usuario */}
        <UserInfoSection user={user} refetchUser={refetchUser} />
      </Flex>
    </Flex>
  );
}
