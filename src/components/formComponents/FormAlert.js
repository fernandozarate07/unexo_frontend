import { Alert } from "@chakra-ui/react";

/**
 * Componente FormAlert que muestra una alerta con un mensaje.
 *
 * @param {Object} props - Las propiedades que recibe el componente.
 * @param {string} props.status - El estado de la alerta (ej. "success", "error", "warning", etc.).
 * @param {string} props.message - El mensaje que se muestra en la alerta.
 *
 * @returns {JSX.Element} El componente que renderiza la alerta con el mensaje y estado especificados.
 */
const FormAlert = ({ status, message }) => {
  return (
    <Alert.Root
      status={status} // El estado de la alerta, como "success", "error", etc.
      position="absolute" // Posición absoluta para poder mover la alerta en la pantalla.
      bottom="-54px" // Coloca la alerta a 80px de la parte inferior de la pantalla.
      left="50%" // Centra la alerta horizontalmente en la pantalla.
      transform="translateX(-50%)" // Ajuste para un centrado perfecto.
      width="100%" // El ancho de la alerta será 100% del contenedor padre.
      maxWidth="600px" // El ancho máximo será 500px, no más.
      borderRadius="md" // Bordes redondeados con un radio mediano.
      fontSize="sm" // Establece el tamaño de fuente pequeño para el mensaje.
    >
      <Alert.Indicator /> {/* Indicador visual de la alerta */}
      <Alert.Title>{message}</Alert.Title> {/* El mensaje de la alerta, que se pasa como prop */}
    </Alert.Root>
  );
};

export default FormAlert; // Exporta el componente para usarlo en otras partes de la aplicación.
