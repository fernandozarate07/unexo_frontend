"use client"; // Indicamos que este archivo es para el lado del cliente, como un componente de React

import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form"; // Importamos las herramientas necesarias de react-hook-form
import { Button, Flex, Heading, Separator } from "@chakra-ui/react"; // Componentes de Chakra UI para la interfaz

// Importamos los pasos del formulario y otros componentes auxiliares
import StepOne from "../../components/createContributionForm/StepOne";
import StepTwo from "../../components/createContributionForm/StepTwo";
import StepThree from "../../components/createContributionForm/StepThree";
import StepFour from "../../components/createContributionForm/StepFour";
import CheckboxResponsibility from "../../components/createContributionForm/CheckboxResponsability";
import FormAlert from "../../components/createContributionForm/FormAlert";

// Estados posibles para la verificación del link (Google Drive)
const LINK_VERIFICATION_STATES = {
  IDLE: "idle", // Estado inicial (sin verificar)
  CHECKING: "checking", // En proceso de verificación
  SUCCESS: "success", // Link verificado exitosamente
  ERROR: "error", // Error al verificar el link
};

// Valores predeterminados del formulario (valores iniciales de cada campo)
const DEFAULT_FORM_VALUES = {
  typeId: null,
  facultyId: null,
  degreeId: null,
  yearId: null,
  subjectId: null,
  title: "",
  description: "",
  linkDrive: "",
};

const CreateContribution = () => {
  /**
   * Estado local para almacenar los datos iniciales de los filtros (tipo de aporte, facultad, etc.)
   * @type {Array<Object>}
   */
  const [data, setData] = useState([]);

  /**
   * Estado para manejar la verificación del enlace de Google Drive.
   * @type {string} - Uno de los valores definidos en LINK_VERIFICATION_STATES.
   */
  const [linkIsVerified, setLinkIsVerified] = useState(LINK_VERIFICATION_STATES.IDLE);

  /**
   * Estado para controlar si el usuario ha aceptado los términos en el formulario.
   * @type {boolean}
   */
  const [checkboxIsChecked, setCheckboxIsChecked] = useState(false);

  /**
   * Estado para manejar los mensajes de error al intentar enviar el formulario.
   * @type {string}
   */
  const [submitError, setSubmitError] = useState("");

  /**
   * Estado para indicar si el formulario fue enviado con éxito.
   * @type {boolean}
   */
  const [submitSuccess, setSubmitSuccess] = useState(false);

  /**
   * Hook de react-hook-form para el manejo del formulario.
   * Contiene métodos para validar, manejar los valores y errores del formulario.
   */
  const methods = useForm({ defaultValues: DEFAULT_FORM_VALUES });

  /**
   * useEffect para cargar los datos iniciales cuando el componente se monta.
   * Estos datos se usan para poblar los filtros en el formulario.
   */
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Se hace una solicitud GET al backend para obtener los datos de los filtros
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/filter/recoverData`);
        const json = await res.json();
        setData(json.data); // Guardamos los datos recibidos en el estado 'data'
      } catch (error) {
        console.error("Error recuperando datos iniciales:", error); // Si ocurre un error, se muestra en la consola
      }
    };

    fetchInitialData(); // Llamada a la función que carga los datos
  }, []); // Se ejecuta solo una vez al montar el componente

  /**
   * Función que valida los datos del formulario antes de enviarlo.
   * Verifica que todos los campos sean válidos.
   *
   * @param {Object} formData - Los datos del formulario a validar.
   * @param {number} formData.typeId - El tipo de aporte seleccionado.
   * @param {number} formData.facultyId - La facultad seleccionada.
   * @param {number} formData.degreeId - La carrera seleccionada.
   * @param {number} formData.yearId - El año seleccionado.
   * @param {number} formData.subjectId - La asignatura seleccionada.
   * @param {string} formData.title - El título del aporte.
   * @param {string} formData.description - La descripción del aporte.
   * @param {string} formData.linkDrive - El enlace de Google Drive del aporte.
   *
   * @returns {string|null} - Un mensaje de error si la validación falla, o null si todo es válido.
   */
  const validateForm = (formData) => {
    // Validación de los campos académicos
    if (!formData.typeId || !formData.facultyId || !formData.degreeId || !formData.yearId || !formData.subjectId) {
      return "Por favor completá todos los campos académicos antes de continuar.";
    }

    // Validación del título
    if (!formData.title || formData.title.trim().length < 15) {
      return "El título debe tener al menos 15 caracteres.";
    }

    // Validación de la descripción
    if (!formData.description || formData.description.trim().length < 15) {
      return "La descripción debe tener al menos 15 caracteres.";
    }

    // Verificación del enlace de Google Drive
    if (linkIsVerified !== LINK_VERIFICATION_STATES.SUCCESS) {
      return "Debés verificar el link de Google Drive antes de continuar.";
    }

    // Validación de aceptación de términos
    if (!checkboxIsChecked) {
      return "Debés aceptar los términos antes de continuar.";
    }

    return null; // Si todo es válido, retornamos null
  };

  /**
   * Función que se ejecuta cuando el formulario se envía con éxito.
   * Reinicia el formulario y resetea los estados.
   */
  const handleSubmitSuccess = () => {
    methods.reset(); // Reinicia los valores del formulario
    setLinkIsVerified(LINK_VERIFICATION_STATES.IDLE); // Resetea el estado de verificación del link
    setCheckboxIsChecked(false); // Resetea el estado del checkbox
    setSubmitSuccess(true); // Marca como exitoso el envío
    setSubmitError(""); // Limpia cualquier mensaje de error
  };

  /**
   * Función que maneja el envío del formulario.
   * Valida los datos y si todo está correcto, envía los datos al backend.
   *
   * @param {Object} formData - Los datos del formulario a enviar.
   */
  const onSubmit = async (formData) => {
    setSubmitSuccess(false); // Reseteamos el estado de éxito
    const validationError = validateForm(formData); // Validamos los datos del formulario

    // Si hay un error de validación, lo mostramos y no enviamos el formulario
    if (validationError) {
      setSubmitError(validationError);
      return;
    }

    try {
      // Enviamos los datos del formulario al backend
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contribution/create`, {
        method: "POST", // Método POST para enviar los datos
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Incluir cookies para la autenticación
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          typeId: formData.typeId,
          facultyId: formData.facultyId,
          degreeId: formData.degreeId,
          yearId: formData.yearId,
          subjectId: formData.subjectId,
          linkDrive: formData.linkDrive,
        }),
      });

      // Si la respuesta no es exitosa, mostramos un error
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.message || "Error al crear el aporte. Intenta de nuevo.");
      }

      handleSubmitSuccess(); // Si la creación fue exitosa, manejamos el éxito
    } catch (error) {
      console.error("Error al enviar el aporte:", error); // Mostramos el error en la consola
      setSubmitError(error.message || "Hubo un problema al subir tu aporte. Intentá de nuevo.");
    }
  };

  return (
    <FormProvider {...methods}>
      {/* Proveemos los métodos de react-hook-form al formulario */}
      <Flex w="100%" justify="center" align="center" direction="column" p="6">
        <Flex
          as="form"
          onSubmit={methods.handleSubmit(onSubmit)} // Llamamos a la función onSubmit cuando el formulario es enviado
          width="100%"
          maxWidth="1200px"
          direction="column"
          gap="6"
          p="6"
          boxShadow="md"
          borderRadius="md"
          bg="white">
          <Heading as="h1" size="2xl">
            Compartí tu aporte
          </Heading>
          <Separator />
          {/* Contenido del formulario dividido en pasos */}
          <Flex gap="6" flexDirection={{ base: "column", md: "row" }}>
            <Flex w={{ base: "100%", md: "40%" }} direction="column" gap="6">
              <StepOne data={data} />
              <StepTwo data={data} />
            </Flex>
            <StepThree />
          </Flex>
          <Flex gap="6" flexDirection={{ base: "column", md: "row" }}>
            <StepFour linkIsVerified={linkIsVerified} setLinkIsVerified={setLinkIsVerified} />
            <CheckboxResponsibility checkboxIsChecked={checkboxIsChecked} setCheckboxIsChecked={setCheckboxIsChecked} />
          </Flex>
          <Separator />

          {/* Sección del botón de submit y alertas */}
          <SubmitButtonSection submitError={submitError} submitSuccess={submitSuccess} />
        </Flex>
      </Flex>
    </FormProvider>
  );
};

/**
 * Componente para mostrar el botón de submit y las alertas de error o éxito.
 *
 * @param {Object} props - Propiedades que recibe el componente.
 * @param {string} props.submitError - Mensaje de error en el envío.
 * @param {boolean} props.submitSuccess - Bandera que indica si el formulario fue enviado con éxito.
 *
 * @returns {JSX.Element} - Componente de la sección de submit.
 */
const SubmitButtonSection = ({ submitError, submitSuccess }) => (
  <Flex position="relative" flexDirection="column" alignItems="center">
    <Button type="submit" width={{ base: "100%", md: "400px" }} colorPalette="cyan">
      Subir Aporte
    </Button>

    {/* Mostrar alerta si hay error o éxito */}
    {submitError && <FormAlert status="warning" message={submitError} />}
    {submitSuccess && <FormAlert status="success" message="Gracias por tu aporte a Unexo." />}
  </Flex>
);

export default CreateContribution;
