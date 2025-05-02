import { Text, IconButton, Popover, Portal, Flex } from "@chakra-ui/react";
import { FaAngleDown } from "react-icons/fa";

// Longitud máxima para truncar la descripción
const MAX_DESCRIPTION_LENGTH = 60;

/**
 * Componente que muestra una descripción truncada si su longitud excede el límite.
 * Si la descripción es truncada, se ofrece una opción para verla completa.
 *
 * @component
 * @param {Object} props - Props del componente.
 * @param {string} props.description - Descripción que se va a mostrar, truncada si es necesario.
 * @returns {JSX.Element|null} El componente renderizado o null si no se proporciona descripción.
 */
export default function TruncatedDescription({ description }) {
  if (!description) return null;

  // Determina si la descripción debe ser truncada
  const shouldTruncate = description.length > MAX_DESCRIPTION_LENGTH;
  // Genera la descripción truncada con puntos suspensivos si es necesario
  const truncatedText = shouldTruncate ? `${description.slice(0, MAX_DESCRIPTION_LENGTH)}...` : description;

  return (
    <Flex align="center">
      <Text>{truncatedText}</Text>

      {/* Si la descripción es truncada, se muestra el popover con la descripción completa */}
      {shouldTruncate && <DescriptionPopover description={description} />}
    </Flex>
  );
}

/**
 * Componente Popover que muestra la descripción completa cuando el usuario lo solicita.
 *
 * @component
 * @param {Object} props - Props del componente.
 * @param {string} props.description - Descripción completa que se muestra al abrir el popover.
 * @returns {JSX.Element} El componente Popover para mostrar la descripción completa.
 */
function DescriptionPopover({ description }) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <IconButton size="xs" variant="ghost" aria-label="Ver descripción completa">
          <FaAngleDown />
        </IconButton>
      </Popover.Trigger>

      <Portal>
        <Popover.Positioner>
          <Popover.Content w="100%" maxW={{ base: "300px", md: "600px" }}>
            <Popover.Arrow />
            <Popover.Body whiteSpace="pre-wrap">{description}</Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
}
