import React from "react";
import { useFormContext } from "react-hook-form"; // Importamos hook de contexto de react-hook-form
import { Field, NativeSelect, Heading, Flex, Separator } from "@chakra-ui/react"; // Componentes de Chakra UI

/**
 * Componente StepTwo - Paso 2 del formulario de creación de aporte.
 * Este paso permite al usuario seleccionar información académica, como facultad, carrera, año y asignatura.
 *
 * @param {Object} props - Propiedades que recibe el componente.
 * @param {Object} props.data - Datos necesarios para renderizar las opciones del formulario (facultades, carreras, años, asignaturas).
 *
 * @returns {JSX.Element} - Un formulario con campos de selección para la información académica.
 */
const StepTwo = ({ data }) => {
  const { register } = useFormContext(); // Usamos el hook de contexto para acceder a la función 'register' y vincular los campos con react-hook-form

  return (
    <Flex flexDirection="column" gap="3" border="1px solid" borderColor="gray.200" p="3" borderRadius="md">
      <Heading as="h2" size="lg">
        Paso 2: Información Académica
      </Heading>
      <Separator /> {/* Separador visual entre el título y los campos de selección */}
      {/* Facultad */}
      <Field.Root w="100%">
        <NativeSelect.Root>
          <NativeSelect.Field
            {...register("facultyId")} // Vinculamos el campo 'facultyId' con react-hook-form mediante 'register'
            defaultValue="" // Valor por defecto (vacío, para que el usuario seleccione uno)
            focusRing="none" // Sin anillo de enfoque cuando el campo está seleccionado
            colorPalette="cyan" // Color del borde y la tipografía
            borderRadius="md" // Bordes redondeados
            bg="white" // Fondo blanco del campo de selección
          >
            <option value="">Seleccioná una facultad</option> {/* Opción por defecto que aparece como un placeholder */}
            {data?.faculties?.map((faculty) => (
              <option key={faculty.id} value={faculty.id}>
                {" "}
                {/* Iteramos sobre las facultades para mostrar las opciones */}
                {faculty.name}
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator /> {/* Indicador visual para la lista desplegable */}
        </NativeSelect.Root>
      </Field.Root>
      {/* Carrera */}
      <Field.Root w="100%">
        <NativeSelect.Root>
          <NativeSelect.Field
            {...register("degreeId")} // Vinculamos el campo 'degreeId' con react-hook-form
            defaultValue="" // Valor por defecto (vacío, para que el usuario seleccione uno)
            focusRing="none" // Sin anillo de enfoque cuando el campo está seleccionado
            colorPalette="cyan" // Color del borde y la tipografía
            borderRadius="md" // Bordes redondeados
            bg="white" // Fondo blanco del campo de selección
          >
            <option value="">Seleccioná una carrera</option> {/* Opción por defecto que aparece como un placeholder */}
            {data?.degrees?.map((degree) => (
              <option key={degree.id} value={degree.id}>
                {" "}
                {/* Iteramos sobre las carreras para mostrar las opciones */}
                {degree.name}
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator /> {/* Indicador visual para la lista desplegable */}
        </NativeSelect.Root>
      </Field.Root>
      {/* Año */}
      <Field.Root w="100%">
        <NativeSelect.Root>
          <NativeSelect.Field
            {...register("yearId")} // Vinculamos el campo 'yearId' con react-hook-form
            defaultValue="" // Valor por defecto (vacío, para que el usuario seleccione uno)
            focusRing="none" // Sin anillo de enfoque cuando el campo está seleccionado
            colorPalette="cyan" // Color del borde y la tipografía
            borderRadius="md" // Bordes redondeados
            bg="white" // Fondo blanco del campo de selección
          >
            <option value="">Seleccioná un año</option> {/* Opción por defecto que aparece como un placeholder */}
            {data?.years?.map((year) => (
              <option key={year.id} value={year.id}>
                {" "}
                {/* Iteramos sobre los años para mostrar las opciones */}
                {year.name}
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator /> {/* Indicador visual para la lista desplegable */}
        </NativeSelect.Root>
      </Field.Root>
      {/* Asignatura */}
      <Field.Root w="100%">
        <NativeSelect.Root>
          <NativeSelect.Field
            {...register("subjectId")} // Vinculamos el campo 'subjectId' con react-hook-form
            defaultValue="" // Valor por defecto (vacío, para que el usuario seleccione uno)
            focusRing="none" // Sin anillo de enfoque cuando el campo está seleccionado
            colorPalette="cyan" // Color del borde y la tipografía
            borderRadius="md" // Bordes redondeados
            bg="white" // Fondo blanco del campo de selección
          >
            <option value="">Seleccioná una asignatura</option>{" "}
            {/* Opción por defecto que aparece como un placeholder */}
            {data?.subjects?.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {" "}
                {/* Iteramos sobre las asignaturas para mostrar las opciones */}
                {subject.name}
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator /> {/* Indicador visual para la lista desplegable */}
        </NativeSelect.Root>
      </Field.Root>
    </Flex>
  );
};

export default StepTwo;
