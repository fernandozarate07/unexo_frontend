import React from "react";
import { useFormContext } from "react-hook-form"; // Importamos hook de contexto de react-hook-form
import { Field, NativeSelect, Heading, Flex, Separator } from "@chakra-ui/react"; // Componentes de Chakra UI

/**
 * Componente StepOne - Paso 1 del formulario de creación de aporte.
 * Este paso permite al usuario seleccionar el tipo de aporte desde un menú desplegable.
 *
 * @param {Object} props - Propiedades que recibe el componente.
 * @param {Object} props.data - Datos necesarios para renderizar las opciones del formulario (en este caso, los tipos de aporte).
 *
 * @returns {JSX.Element} - Un formulario con un campo de selección de tipo de aporte.
 */
const StepOne = ({ data }) => {
  const { register } = useFormContext(); // Usamos el hook de contexto para acceder a la función 'register' y vincular el campo con react-hook-form

  return (
    <Flex flexDirection="column" gap="3" border="1px solid" borderColor="gray.200" p="3" borderRadius="md">
      <Heading as="h2" size="lg">
        {" "}
        {/* Título del paso */}
        Paso 1: Tipo de Aporte
      </Heading>
      <Separator /> {/* Separador visual entre el título y el campo de selección */}
      <Field.Root w="100%">
        <NativeSelect.Root>
          {/* Campo de selección de tipo de aporte */}
          <NativeSelect.Field
            {...register("typeId")} // Vinculamos el campo con react-hook-form mediante 'register'
            defaultValue="" // Valor por defecto (vacío, para que el usuario seleccione uno)
            focusRing="none" // Sin anillo de enfoque cuando el campo está seleccionado
            colorPalette="cyan" // Color del borde y la tipografía
            borderRadius="md" // Bordes redondeados
            bg="white" // Fondo blanco del campo de selección
          >
            <option value="">Tipo de aporte</option> {/* Opción por defecto que aparece como un placeholder */}
            {data?.types?.map((type) => (
              <option key={type.id} value={type.id}>
                {" "}
                {/* Iteramos sobre los tipos de aporte para mostrar las opciones */}
                {type.name}
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator /> {/* Indicador visual para la lista desplegable */}
        </NativeSelect.Root>
      </Field.Root>
    </Flex>
  );
};

export default StepOne;
