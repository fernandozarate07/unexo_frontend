import { Text, IconButton, Popover, Portal, Flex } from "@chakra-ui/react";
import { FaAngleDown } from "react-icons/fa";

// Longitud máxima para truncar el título
const MAX_TITLE_LENGTH = 30;

/**
 * Componente que muestra un título truncado si su longitud excede el límite.
 * Si el título es truncado, se ofrece una opción para verlo completo.
 *
 * @component
 * @param {Object} props - Props del componente.
 * @param {string} props.title - Título que se va a mostrar, truncado si es necesario.
 * @returns {JSX.Element|null} El componente renderizado o null si no se proporciona título.
 */
export default function TruncatedDescription({ title }) {
  if (!title) return null;

  // Determina si el título debe ser truncado
  const shouldTruncate = title.length > MAX_TITLE_LENGTH;
  // Genera el título truncado con puntos suspensivos si es necesario
  const truncatedText = shouldTruncate ? `${title.slice(0, MAX_TITLE_LENGTH)}...` : title;

  return (
    <Flex align="center">
      <Text>{truncatedText}</Text>

      {/* Si el título es truncado, se muestra el popover con el título completo */}
      {shouldTruncate && <TitlePopover title={title} />}
    </Flex>
  );
}

/**
 * Componente Popover que muestra el título completo cuando el usuario lo solicita.
 *
 * @component
 * @param {Object} props - Props del componente.
 * @param {string} props.title - Título completo que se muestra al abrir el popover.
 * @returns {JSX.Element} El componente Popover para mostrar el título completo.
 */
function TitlePopover({ title }) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <IconButton size="xs" variant="ghost" aria-label="Ver título completo" borderRadius="full">
          <FaAngleDown />
        </IconButton>
      </Popover.Trigger>

      <Portal>
        <Popover.Positioner>
          <Popover.Content w="100%" maxW={{ base: "300px", md: "600px" }}>
            <Popover.Arrow />
            <Popover.Body whiteSpace="pre-wrap">{title}</Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
}
