"use client";
import { Flex, IconButton, Field, NativeSelect, useBreakpointValue } from "@chakra-ui/react";
import { IoIosSearch } from "react-icons/io";
import { useEffect, useState } from "react";

const cascadeFilter = ({ initialSelected = {}, onSubmit }) => {
  const [data, setData] = useState({
    types: [],
    faculties: [],
    degrees: [],
    years: [],
    subjects: [],
  });

  const [selected, setSelected] = useState({
    type: initialSelected.type || "",
    faculty: initialSelected.faculty || "",
    degree: initialSelected.degree || "",
    academicYear: initialSelected.academicYear || "",
    subject: initialSelected.subject || "",
  });

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
      ...(name === "type" && { faculty: "", degree: "", academicYear: "", subject: "" }),
      ...(name === "faculty" && { degree: "", academicYear: "", subject: "" }),
      ...(name === "degree" && { academicYear: "", subject: "" }),
      ...(name === "academicYear" && { subject: "" }),
    }));
  };

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

  const filteredFaculties = selected.type ? data.faculties : [];
  const filteredDegrees = data.degrees.filter((deg) => deg.facultyId === parseInt(selected.faculty));
  const filteredYears = data.years.filter((yr) => yr.degreeId === parseInt(selected.degree));
  const filteredSubjects = data.subjects.filter((sub) => sub.yearId === parseInt(selected.academicYear));

  return (
    <Flex as="form" w={{ base: "100%", md: "85%" }} onSubmit={handleSubmit} alignItems="center" justifyContent="center">
      <Flex
        w="100%"
        py={{ base: "3", md: "6" }}
        px={{ base: "3", md: "6" }}
        flexDirection={{ base: "column", md: "row" }}
        gap="3"
        align="center"
        justifyContent="center"
        boxShadow="sm"
        borderRadius="md">
        {/* Tipo de aporte */}
        <Field.Root w="100%">
          <NativeSelect.Root>
            <NativeSelect.Field
              name="type"
              value={selected.type}
              onChange={handleChange}
              focusRing="none"
              colorPalette="cyan"
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
        {/* Facultad */}
        <Field.Root w="100%">
          <NativeSelect.Root>
            <NativeSelect.Field
              name="faculty"
              value={selected.faculty}
              onChange={handleChange}
              focusRing="none"
              colorPalette="cyan"
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
        {/* Carrera */}
        <Field.Root w="100%">
          <NativeSelect.Root>
            <NativeSelect.Field
              name="degree"
              value={selected.degree}
              onChange={handleChange}
              focusRing="none"
              colorPalette="cyan"
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
        {/* Año */}
        <Field.Root w="100%">
          <NativeSelect.Root>
            <NativeSelect.Field
              name="academicYear"
              value={selected.academicYear}
              onChange={handleChange}
              focusRing="none"
              colorPalette="cyan"
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
        {/* Asignatura */}
        <Field.Root w="100%">
          <NativeSelect.Root>
            <NativeSelect.Field
              name="subject"
              value={selected.subject}
              onChange={handleChange}
              focusRing="none"
              colorPalette="cyan"
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
          colorPalette="cyan"
          size="sm"
          isDisabled={!selected.type}>
          <IoIosSearch />
        </IconButton>
      </Flex>
    </Flex>
  );
};

export default cascadeFilter;
