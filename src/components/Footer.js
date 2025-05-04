"use client"; // Indica que este componente se renderiza del lado del cliente (Client Component)

// Chakra UI y Next.js imports para estructura visual, navegación e íconos
import { Flex, Text, Stack, HStack, Link, IconButton } from "@chakra-ui/react";
// import { Icon } from "@chakra-ui/icons"; // Comentado, posiblemente para íconos personalizados en el futuro
import { FaInstagram } from "react-icons/fa"; // Ícono de Instagram
import NextImage from "next/image"; // Componente optimizado para imágenes en Next.js
import NextLink from "next/link"; // Componente de enlace para navegación interna en Next.js

/**
 * Componente Footer
 * Muestra el pie de página en todas las vistas de la aplicación.
 * Incluye enlaces legales, información de contacto, redes sociales y branding.
 */
export default function Footer() {
  return (
    <Flex
      as="footer"
      w="100%"
      p="6"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap="6"
      bg="white"
      borderTop="1px solid"
      borderColor="gray.200">
      {/* Contenedor principal del contenido del footer */}
      <Flex
        w="100%"
        maxW="1200px"
        flexDirection={{ base: "column", md: "row" }} // Responsivo: columna en móvil, fila en desktop
        justifyContent="space-between"
        alignItems={{ base: "flex-start", md: "center" }}
        gap={{ base: "6", md: "12" }}>
        {/* Sección izquierda: enlaces y contacto */}
        <Flex flexDirection="column" gap="3">
          {/* Enlaces legales e informativos */}
          <Flex flexDirection="column" gap="3">
            <Link
              as={NextLink}
              href="/about"
              focusRing="none"
              _focus={{ boxShadow: "none" }}
              textDecoration="none"
              _hover={{ color: "blue.600" }}>
              Sobre Unexo
            </Link>
            <Link
              as={NextLink}
              href="/privacyPolicy"
              focusRing="none"
              _focus={{ boxShadow: "none" }}
              textDecoration="none"
              _hover={{ color: "blue.600" }}>
              Política de privacidad
            </Link>
            <Link
              as={NextLink}
              href="/termsConditions"
              focusRing="none"
              _focus={{ boxShadow: "none" }}
              textDecoration="none"
              _hover={{ color: "blue.600" }}>
              Términos y condiciones
            </Link>
          </Flex>

          {/* Íconos de redes sociales */}
          <Flex gap="3">
            <IconButton
              type="submit"
              aria-label="Instagram" // Accesibilidad: describe la función del botón
              color="gray.200"
              borderRadius="full"
              colorPalette="blue"
              size="xs">
              <FaInstagram />
            </IconButton>
          </Flex>
        </Flex>

        {/* Sección derecha: logo y créditos */}
        <Flex
          w={{ base: "100%", md: "auto" }}
          h="full"
          flexDirection="column"
          alignItems="center"
          justifyContent="center">
          {/* Imagen del logo de Unexo */}
          <NextImage src="/unexo_logo_nav.svg" alt="Logo" width={180} height={90} />
          {/* Información de contacto */}
          <Text>
            Contactanos a{" "}
            <Link
              href="mailto:unexoapp@gmail.com"
              aria-label="enviar email a unexoapp@gmail.com"
              focusRing="none"
              textDecoration="none"
              fontWeight="bold"
              color="blue.600">
              unexoapp@gmail.com
            </Link>
          </Text>
        </Flex>
      </Flex>
      {/* Créditos del desarrollador */}
      <Text fontSize="sm">
        Hecho para los alumnos de la UNSJ. Les deseamos muchos éxitos en su carrera. © 2025 {""}
        <Link
          href="#"
          aria-label="Instagram del la app"
          focusRing="none"
          textDecoration="none"
          fontWeight="bold"
          color="blue.600">
          Unexo
        </Link>
      </Text>
    </Flex>
  );
}
