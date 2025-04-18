"use client"; // Indicamos que este componente se renderiza del lado del cliente (Client Component de Next.js)

// Importaciones de componentes de Chakra UI para construir la interfaz
import { Heading, Text, Button, Flex, Link } from "@chakra-ui/react";
// Importamos Link de Next.js para navegación entre rutas sin recargar la página
import NextLink from "next/link";
// Componente de filtro en cascada para búsqueda personalizada
import CascadeFilter from "../../components/cascadeFilter";

/**
 * Componente Hero: Sección principal de bienvenida en la página de inicio.
 * Contiene un título destacado, una descripción, un botón de registro y el filtro en cascada.
 *
 * @returns {JSX.Element} La sección de Hero renderizada.
 */
export default function Hero() {
  return (
    <Flex
      as="section" // Indicamos que este bloque representa una sección semántica
      h={{ base: "auto", md: "calc(100vh - 80px)" }} // Altura adaptable según el tamaño del viewport
      maxW="1200px" // Máximo ancho del contenedor
      mx="auto" // Centramos horizontalmente
      flexDirection="column" // Apilamos los elementos verticalmente
      alignItems="center" // Centramos horizontalmente el contenido
      justifyContent="center" // Centramos verticalmente
      gap={{ base: "6", md: "12" }} // Espaciado entre elementos
      textAlign="center" // Alineación del texto
      p={{ base: "6", md: "12" }} // Padding adaptable a diferentes tamaños de pantalla
    >
      {/* Contenedor interno del texto y botón */}
      <Flex
        maxW="800px"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={{ base: "6", md: "12" }}>
        {/* Título principal */}
        <Heading as="h1" fontSize={{ base: "4xl", md: "6xl" }} fontWeight="normal" lineHeight="1">
          Entre{" "}
          <Text as="span" fontWeight="extrabold" color="cyan.600">
            todos
          </Text>{" "}
          hacemos que estudiar sea más{" "}
          <Text as="span" fontWeight="extrabold" color="cyan.600">
            fácil.
          </Text>
        </Heading>

        {/* Descripción de la plataforma */}
        <Text fontSize={{ base: "lg", md: "xl" }} color="gray.500">
          Subí y descargá material útil y ayudá a otros estudiantes como vos. Unexo es la red académica colaborativa
          para estudiantes de la UNSJ.
        </Text>

        {/* Botón de registro enlazado a la ruta /register */}
        <Link
          as={NextLink}
          w="100%"
          display="flex"
          justifyContent="center"
          alignContent="center"
          focusRing="none"
          textDecoration="none"
          href="/register">
          <Button colorPalette="cyan" borderRadius="md">
            Registrate gratis
          </Button>
        </Link>
      </Flex>

      {/* Componente de filtro en cascada */}
      <CascadeFilter />
    </Flex>
  );
}
