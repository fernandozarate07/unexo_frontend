import { Flex, Text, Checkbox } from "@chakra-ui/react"; // Importamos los componentes necesarios de Chakra UI

/**
 * Componente CheckboxResponsibility
 * Muestra un mensaje informativo y un checkbox que el usuario debe marcar para declarar que tiene derecho a compartir el archivo.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} props.checkboxIsChecked - Estado del checkbox (si está marcado o no).
 * @param {function} props.setCheckboxIsChecked - Función para actualizar el estado del checkbox.
 *
 * @returns {JSX.Element} - Un bloque de contenido con un mensaje informativo y un checkbox.
 */
const CheckboxResponsibility = ({ checkboxIsChecked, setCheckboxIsChecked }) => {
  return (
    <Flex
      w={{ base: "100%", md: "40%" }} // Ancho ajustable según el tamaño de la pantalla
      p="3" // Espaciado interno
      flexDirection="column" // Dirección de los elementos dentro del Flex (column)
      gap="3" // Espacio entre los elementos
      border="1px solid" // Borde alrededor del contenedor
      borderColor="gray.200" // Color del borde
      borderRadius="md" // Bordes redondeados
    >
      <Text fontSize="xs">
        En Unexo creemos en compartir con honestidad. Si el archivo no lo creaste vos, pero te ayudó a aprobar y querés
        compartirlo, ¡genial! Solo asegurate de tener permiso del propietario, que esté bien clasificado y que no sea
        contenido que ya existe en la plataforma.
      </Text>

      <Checkbox.Root
        checked={checkboxIsChecked} // El estado del checkbox (si está marcado o no)
        onCheckedChange={(e) => setCheckboxIsChecked(!!e.checked)} // Actualiza el estado al cambiar el estado del checkbox
      >
        <Checkbox.HiddenInput /> {/* Input oculto, no visible pero necesario para el funcionamiento del checkbox */}
        <Checkbox.Control /> {/* Control visual del checkbox */}
        <Checkbox.Label fontSize="xs">
          Declaro que tengo derecho a compartir este archivo y que no estoy subiendo contenido ajeno sin permiso.
        </Checkbox.Label>
      </Checkbox.Root>
    </Flex>
  );
};

export default CheckboxResponsibility;
