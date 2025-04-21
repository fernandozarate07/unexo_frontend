import React from "react";
import { useFormContext } from "react-hook-form"; // Importamos hook de contexto de react-hook-form
import { Heading, Flex, Separator, Input, Textarea, Field } from "@chakra-ui/react"; // Componentes de Chakra UI

/**
 * Componente StepThree - Paso 3 del formulario de creación de aporte.
 * Este paso permite al usuario ingresar detalles sobre el aporte, como título y descripción.
 *
 * @returns {JSX.Element} - Un formulario con campos de entrada para el título y la descripción del aporte.
 */
const StepThree = () => {
  const { register } = useFormContext(); // Usamos el hook de contexto para acceder a la función 'register' y vincular los campos con react-hook-form

  return (
    <Flex p="3" flex="1" flexDirection="column" gap="3" border="1px solid" borderColor="gray.200" borderRadius="md">
      <Heading as="h2" size="lg">
        Paso 3: Detalles del Aporte
      </Heading>
      <Separator /> {/* Separador visual entre el título y los campos de entrada */}
      {/* Título */}
      <Field.Root w="100%">
        <Field.Label>Título del aporte</Field.Label>
        <Input
          {...register("title")} // Vinculamos el campo 'title' con react-hook-form
          placeholder="Ej: Final resuelto 2023" // Placeholder que muestra un ejemplo de lo que se espera
          defaultValue="" // Valor por defecto (vacío, para que el usuario ingrese algo)
          focusRing="none" // Sin anillo de enfoque cuando el campo está seleccionado
          colorPalette="cyan" // Color del borde y la tipografía
          borderRadius="md" // Bordes redondeados
          bg="white" // Fondo blanco del campo de entrada
        />
      </Field.Root>
      {/* Descripción */}
      <Field.Root w="100%" h="100%">
        <Field.Label>Descripción</Field.Label>
        <Textarea
          {...register("description")} // Vinculamos el campo 'description' con react-hook-form
          placeholder="Ej: Examen final de análisis matemático I, resuelto a mano con respuestas justificadas..." // Placeholder que muestra un ejemplo
          defaultValue="" // Valor por defecto (vacío, para que el usuario ingrese algo)
          h="100%" // Altura del campo de texto
          minH="200px" // Altura mínima
          focusRing="none" // Sin anillo de enfoque cuando el campo está seleccionado
          colorPalette="cyan" // Color del borde y la tipografía
          borderRadius="md" // Bordes redondeados
          bg="white" // Fondo blanco del campo de texto
        />
      </Field.Root>
    </Flex>
  );
};

export default StepThree;
