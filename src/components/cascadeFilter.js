"use client"; // Indica que este componente es del lado del cliente (Client Component)

// Chakra UI y librerías necesarias
import { Flex, IconButton, Field, NativeSelect, useBreakpointValue } from "@chakra-ui/react";
import { IoIosSearch } from "react-icons/io"; // Ícono de búsqueda
import { useEffect, useState } from "react";

/**
 * Componente cascadeFilter
 * Filtro en cascada para seleccionar tipo de aporte, facultad, carrera, año y asignatura.
 * Se usa para filtrar los aportes disponibles según distintos criterios académicos.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.initialSelected - Valores preseleccionados (útil al volver de la búsqueda).
 * @param {Function} props.onSubmit - Callback opcional para manejar el submit personalizado.
 */
const cascadeFilter = ({ initialSelected = {}, onSubmit }) => {
  // Estado para almacenar los datos recibidos del backend
  const [data, setData] = useState({
    types: [],
    faculties: [],
    degrees: [],
    years: [],
    subjects: [],
  });

  // Estado para almacenar las selecciones del usuario
  const [selected, setSelected] = useState({
    type: initialSelected.type || "",
    faculty: initialSelected.faculty || "",
    degree: initialSelected.degree || "",
    academicYear: initialSelected.academicYear || "",
    subject: initialSelected.subject || "",
  });
  // Carga inicial de datos al montar el componente
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/filter/recoverData`);
        const json = await res.json();
        setData(json.data);
      } catch (error) {
        console.error("Error recuperando datos iniciales:", error);
      }
    };
    fetchInitialData();
  }, []);

  /**
   * Maneja los cambios en los selects.
   * Limpia las selecciones inferiores en la cascada según corresponda.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelected((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "type" && { faculty: "", degree: "", academicYear: "", subject: "" }),
      ...(name === "faculty" && { degree: "", academicYear: "", subject: "" }),
      ...(name === "degree" && { academicYear: "", subject: "" }),
      ...(name === "academicYear" && { subject: "" }),
    }));
  };

  /**
   * Maneja el envío del formulario.
   * Construye los parámetros de búsqueda y redirige o ejecuta el callback si existe.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    Object.entries(selected).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    if (onSubmit) {
      onSubmit(params);
    } else {
      const queryString = params.toString();
      window.location.href = `/search?${queryString}`;
    }
  };

  // Datos filtrados para cada selector dependiente
  const filteredFaculties = selected.type ? data.faculties : [];
  const filteredDegrees = data.degrees.filter((deg) => deg.facultyId === parseInt(selected.faculty));
  const filteredYears = data.years.filter((yr) => yr.degreeId === parseInt(selected.degree));
  const filteredSubjects = data.subjects.filter((sub) => sub.yearId === parseInt(selected.academicYear));

  return (
    <Flex as="form" w="100%" onSubmit={handleSubmit} alignItems="center" justifyContent="center">
      <Flex
        w="100%"
        p={{ base: "3", md: "6" }}
        flexDirection={{ base: "column", md: "row" }}
        align="center"
        justifyContent="center"
        gap="3"
        boxShadow="sm"
        borderRadius="md">
        {/* Select: Tipo de aporte */}
        <Field.Root w="100%">
          <NativeSelect.Root>
            <NativeSelect.Field
              name="type"
              value={selected.type}
              onChange={handleChange}
              focusRing="none"
              colorPalette="blue"
              size={{ base: "sm", md: "md" }}
              borderRadius="md"
              bg="white">
              <option value="">Tipo de aporte</option>
              {data.types.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Field.Root>

        {/* Select: Facultad */}
        <Field.Root w="100%">
          <NativeSelect.Root>
            <NativeSelect.Field
              name="faculty"
              value={selected.faculty}
              onChange={handleChange}
              focusRing="none"
              colorPalette="blue"
              disabled={!selected.type}
              size={{ base: "sm", md: "md" }}
              borderRadius="md">
              <option value="">Facultad</option>
              {filteredFaculties.map((fac) => (
                <option key={fac.id} value={fac.id}>
                  {fac.name}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Field.Root>

        {/* Select: Carrera */}
        <Field.Root w="100%">
          <NativeSelect.Root>
            <NativeSelect.Field
              name="degree"
              value={selected.degree}
              onChange={handleChange}
              focusRing="none"
              colorPalette="blue"
              disabled={!filteredDegrees.length}
              size={{ base: "sm", md: "md" }}
              borderRadius="md">
              <option value="">Carrera</option>
              {filteredDegrees.map((deg) => (
                <option key={deg.id} value={deg.id}>
                  {deg.name}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Field.Root>

        {/* Select: Año */}
        <Field.Root w="100%">
          <NativeSelect.Root>
            <NativeSelect.Field
              name="academicYear"
              value={selected.academicYear}
              onChange={handleChange}
              focusRing="none"
              colorPalette="blue"
              disabled={!filteredYears.length}
              size={{ base: "sm", md: "md" }}
              borderRadius="md">
              <option value="">Año</option>
              {filteredYears.map((yr) => (
                <option key={yr.id} value={yr.id}>
                  {yr.name}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Field.Root>

        {/* Select: Asignatura */}
        <Field.Root w="100%">
          <NativeSelect.Root>
            <NativeSelect.Field
              name="subject"
              value={selected.subject}
              onChange={handleChange}
              focusRing="none"
              colorPalette="blue"
              disabled={!filteredSubjects.length}
              size={{ base: "sm", md: "md" }}
              borderRadius="md">
              <option value="">Asignatura</option>
              {filteredSubjects.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Field.Root>

        {/* Botón de búsqueda */}
        <IconButton
          w={{ base: "100%", md: "auto" }}
          type="submit"
          aria-label="Buscar"
          color="gray.200"
          borderRadius={{ base: "md", md: "full" }}
          colorPalette="blue"
          size="sm"
          isDisabled={!selected.type}>
          <IoIosSearch />
        </IconButton>
      </Flex>
    </Flex>
  );
};

export default cascadeFilter;
