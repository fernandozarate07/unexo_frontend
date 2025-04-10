"use client";
import { Box, Separator, HStack, IconButton, Field, NativeSelect, useBreakpointValue } from "@chakra-ui/react";
import { IoIosSearch } from "react-icons/io";
import { useEffect, useState } from "react";

const WaterfallFilter = () => {
  const [data, setData] = useState({
    types: [],
    faculties: [],
    degrees: [],
    years: [],
    subjects: [],
  });

  const [selected, setSelected] = useState({
    type: "",
    faculty: "",
    degree: "",
    academicYear: "",
    subject: "",
  });

  // Detectar tamaño de pantalla
  const isSmallScreen = useBreakpointValue({ base: true, md: false });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelected((prev) => ({
      ...prev,
      [name]: value,
      // al cambiar algo, resetear selectores siguientes
      ...(name === "faculty" && { degree: "", academicYear: "", subject: "" }),
      ...(name === "degree" && { academicYear: "", subject: "" }),
      ...(name === "academicYear" && { subject: "" }),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const params = new URLSearchParams();

    Object.entries(selected).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/filter/cascadeFilter?${params.toString()}`);
      const result = await res.json();
      console.log("Resultados filtrados:", result.data.result);
      window.location.href = "/search";
    } catch (error) {
      console.error("Error al filtrar:", error);
    }
  };

  const filteredDegrees = data.degrees.filter((deg) => deg.facultyId === parseInt(selected.faculty));

  const filteredYears = data.years.filter((yr) => yr.degreeId === parseInt(selected.degree));

  const filteredSubjects = data.subjects.filter((sub) => sub.yearId === parseInt(selected.academicYear));

  return (
    <Box as="form" onSubmit={handleSubmit} w="full" display="flex" alignContent="center" justifyContent="center">
      <HStack
        gap={{ base: "2", md: "4", lg: "6" }}
        align="center"
        px={{ base: "4", md: "8", lg: "12" }}
        py={{ base: "3", md: "4", lg: "6" }}
        borderRadius={{ base: "md", md: "full" }}
        flexWrap={{ base: "wrap", md: "nowrap" }}
        justifyContent="center"
        boxShadow="sm">
        {/* Tipo de aporte */}
        <Field.Root minWidth={{ base: "100%", md: "auto" }}>
          <Field.Label fontSize={{ base: "sm", md: "md" }}>Tipo de aporte</Field.Label>
          <NativeSelect.Root>
            <NativeSelect.Field
              name="type"
              value={selected.type}
              onChange={handleChange}
              focusRing="none"
              colorPalette="cyan"
              size={{ base: "sm", md: "md" }}>
              <option value="">Seleccionar</option>
              {data.types.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Field.Root>

        {!isSmallScreen && <Separator orientation="vertical" height="full" />}

        {/* Facultad */}
        <Field.Root minWidth={{ base: "100%", md: "auto" }}>
          <Field.Label fontSize={{ base: "sm", md: "md" }}>Facultad</Field.Label>
          <NativeSelect.Root>
            <NativeSelect.Field
              name="faculty"
              value={selected.faculty}
              onChange={handleChange}
              focusRing="none"
              colorPalette="cyan"
              size={{ base: "sm", md: "md" }}>
              <option value="">Seleccionar</option>
              {data.faculties.map((fac) => (
                <option key={fac.id} value={fac.id}>
                  {fac.name}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Field.Root>

        {/* Carrera */}
        <Field.Root minWidth={{ base: "100%", md: "auto" }}>
          <Field.Label fontSize={{ base: "sm", md: "md" }}>Carrera</Field.Label>
          <NativeSelect.Root>
            <NativeSelect.Field
              name="degree"
              value={selected.degree}
              onChange={handleChange}
              focusRing="none"
              colorPalette="cyan"
              disabled={!filteredDegrees.length}
              size={{ base: "sm", md: "md" }}>
              <option value="">Seleccionar</option>
              {filteredDegrees.map((deg) => (
                <option key={deg.id} value={deg.id}>
                  {deg.name}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Field.Root>

        {/* Año */}
        <Field.Root minWidth={{ base: "100%", md: "auto" }}>
          <Field.Label fontSize={{ base: "sm", md: "md" }}>Año</Field.Label>
          <NativeSelect.Root>
            <NativeSelect.Field
              name="academicYear"
              value={selected.academicYear}
              onChange={handleChange}
              focusRing="none"
              colorPalette="cyan"
              disabled={!filteredYears.length}
              size={{ base: "sm", md: "md" }}>
              <option value="">Seleccionar</option>
              {filteredYears.map((yr) => (
                <option key={yr.id} value={yr.id}>
                  {yr.name}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Field.Root>

        {/* Asignatura */}
        <Field.Root minWidth={{ base: "100%", md: "auto" }}>
          <Field.Label fontSize={{ base: "sm", md: "md" }}>Asignatura</Field.Label>
          <NativeSelect.Root>
            <NativeSelect.Field
              name="subject"
              value={selected.subject}
              onChange={handleChange}
              focusRing="none"
              colorPalette="cyan"
              disabled={!filteredSubjects.length}
              size={{ base: "sm", md: "md" }}>
              <option value="">Seleccionar</option>
              {filteredSubjects.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Field.Root>

        {!isSmallScreen && <Separator orientation="vertical" height="full" />}

        {/* Botón de búsqueda */}
        <IconButton
          type="submit"
          aria-label="Buscar"
          color="gray.200"
          rounded="full"
          colorPalette="cyan"
          size={{ base: "md", md: "lg" }}
          mt={{ base: "2", md: "0" }}>
          <IoIosSearch />
        </IconButton>
      </HStack>
    </Box>
  );
};

export default WaterfallFilter;
