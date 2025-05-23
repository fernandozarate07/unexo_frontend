import React, { useState } from "react"; // Importamos React y useState para manejar el estado local
import { Heading, Flex, Text, Input, Button, Spinner } from "@chakra-ui/react"; // Componentes de Chakra UI
import { useFormContext } from "react-hook-form"; // Hook de react-hook-form para gestionar el estado del formulario
import { GoCheckCircle, GoAlert } from "react-icons/go"; // Íconos de éxito y error

/**
 * Componente VerificationMessages
 * Muestra un mensaje de éxito o error según el estado de verificación del enlace.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.status - El estado actual de la verificación ("success", "error", o null).
 * @param {string} props.errorMessage - Mensaje de error en caso de fallo.
 * @param {string} props.successMessage - Mensaje de éxito si la verificación fue exitosa.
 *
 * @returns {JSX.Element|null} - Componente que muestra el mensaje adecuado según el estado.
 */
const VerificationMessages = ({ status, errorMessage, successMessage }) => {
  if (status === "success") {
    return (
      <Flex alignItems="center" gap="1" fontSize="xs" color="green.600">
        <GoCheckCircle />
        <Text>{successMessage || "El enlace de Google Drive es público."}</Text>
      </Flex>
    );
  }

  if (status === "error") {
    return (
      <Flex alignItems="center" gap="1" fontSize="xs" color="red.600">
        <GoAlert />
        <Text>{errorMessage || "El enlace de Google Drive no es público."}</Text>
      </Flex>
    );
  }

  return null;
};

/**
 * Componente StepFour - Paso 4 del formulario de creación de aporte.
 * Este paso permite al usuario ingresar el enlace de Google Drive y verificar si es público.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.linkIsVerified - Estado de la verificación del enlace ("checking", "success", "error").
 * @param {function} props.setLinkIsVerified - Función para actualizar el estado de la verificación del enlace.
 *
 * @returns {JSX.Element} - Un formulario que permite al usuario ingresar un enlace y verificarlo.
 */
const StepFour = ({ linkIsVerified, setLinkIsVerified }) => {
  const {
    register,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext(); // Extraemos funciones de react-hook-form para manejar la validación y el estado

  const [successMessage, setSuccessMessage] = useState(""); // Estado local para almacenar el mensaje de éxito

  /**
   * Función que realiza la verificación del enlace de Google Drive.
   * Llama al backend para verificar si el enlace es público.
   *
   * @param {string} link - El enlace de Google Drive a verificar.
   * @returns {string} - El mensaje de éxito del backend si la verificación fue exitosa.
   */
  const verifyDriveLink = async (link) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contribution/verify-link`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ linkDrive: link }), // Enviamos el enlace en el cuerpo de la solicitud
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "El enlace de Google Drive no es público.");
    }

    return data.message; // Retornamos el mensaje del backend si la verificación es exitosa
  };

  /**
   * Función que maneja el evento de verificación del enlace.
   * Valida si el enlace fue proporcionado y realiza la verificación.
   */
  const handleVerify = async () => {
    const linkDrive = getValues("linkDrive"); // Obtenemos el valor del campo de enlace

    if (!linkDrive) {
      setError("linkDrive", { message: "Por favor ingresa un enlace válido" }); // Si no hay enlace, mostramos un error
      return;
    }

    setLinkIsVerified("checking"); // Establecemos el estado de verificación a "checking"
    setSuccessMessage(""); // Limpiamos el mensaje de éxito

    try {
      const backendMessage = await verifyDriveLink(linkDrive); // Verificamos el enlace
      setLinkIsVerified("success"); // Si es exitoso, actualizamos el estado a "success"
      setSuccessMessage(backendMessage); // Mostramos el mensaje de éxito
      clearErrors("linkDrive"); // Limpiamos cualquier error en el campo de enlace
    } catch (error) {
      setLinkIsVerified("error"); // Si hay error, actualizamos el estado a "error"
      setError("linkDrive", { message: error.message }); // Establecemos el mensaje de error
    }
  };

  /**
   * Función que determina el color del borde del campo de entrada según el estado.
   *
   * @returns {string} - El color del borde (rojo, verde o gris).
   */
  const getBorderColor = () => {
    if (errors.linkDrive) return "red.600"; // Si hay error, el borde es rojo
    if (linkIsVerified === "success") return "green.600"; // Si es exitoso, el borde es verde
    return "gray.300"; // Si no hay estado de verificación, el borde es gris
  };

  return (
    <Flex p="3" flex="1" flexDirection="column" gap="3" border="1px solid" borderColor="gray.200" borderRadius="md">
      <Heading as="h2" size="lg">
        Paso 4: Link de aporte
      </Heading>

      <Text fontSize="sm">
        Ingresa el link de Drive de tu aporte y verifícalo antes de completar el proceso. <strong>¡Importante!</strong>{" "}
        Asegúrate de que el link sea público.
      </Text>

      <Flex flexDirection={{ base: "column", md: "row" }} gap="3">
        <Flex flex="1">
          <Input
            placeholder="https://drive.google.com/..."
            {...register("linkDrive")} // Vinculamos el campo 'linkDrive' con react-hook-form
            bg="white"
            borderRadius="md"
            size="md"
            borderColor={getBorderColor()} // Aplicamos el color de borde según el estado
          />
        </Flex>
        <Button
          onClick={handleVerify} // Al hacer clic, verificamos el enlace
          colorScheme="cyan"
          size="md"
          isDisabled={linkIsVerified === "checking"} // Deshabilitamos el botón mientras se verifica
          alignSelf={{ base: "stretch", md: "center" }}>
          {linkIsVerified === "checking" ? <Spinner size="sm" /> : "Verificar link"}
        </Button>
      </Flex>

      <VerificationMessages
        status={linkIsVerified} // Pasamos el estado de verificación
        errorMessage={errors.linkDrive?.message} // Pasamos el mensaje de error
        successMessage={successMessage} // Pasamos el mensaje de éxito
      />
    </Flex>
  );
};

export default StepFour;
