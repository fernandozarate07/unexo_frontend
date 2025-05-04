/**
 * Componente UpdateContributionButton
 * Permite al usuario editar un aporte académico mediante un modal con formulario.
 * Verifica si el link de Google Drive es público antes de permitir la actualización.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.contribution - Objeto con los datos actuales del aporte.
 * @param {Function} props.onSuccess - Callback que se ejecuta tras una edición exitosa.
 *
 * @returns {JSX.Element}
 */

import { Button, Dialog, Portal, Spinner, Input, Textarea, Field, Switch, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { MdEditSquare } from "react-icons/md";
import { useForm, Controller } from "react-hook-form";
import FormAlert from "@/components/formComponents/FormAlert";

// Constantes de estados de verificación
const LINK_VERIFICATION_STATES = {
  IDLE: "idle",
  CHECKING: "checking",
  SUCCESS: "success",
  ERROR: "error",
};

// Mensajes de error globales reutilizables
const ERROR_MESSAGES = {
  LINK_REQUIRED: "ERROR: Por favor ingresa un enlace",
  LINK_NOT_PUBLIC: "ERROR: El enlace de Google Drive no es público.",
  LINK_VERIFICATION_FAILED: "ERROR: Error al verificar el enlace",
  VALIDATION_ERROR: "ERROR: Error de validación",
  UPDATE_ERROR: "ERROR: Error al editar el aporte",
  VERIFY_FIRST: "ERROR: Verifica el link antes de editar los datos",
};

// Mensajes de éxito
const SUCCESS_MESSAGES = {
  LINK_VALID: "SUCCESS: El enlace es válido y público!",
};

export default function UpdateContributionButton({ contribution, onSuccess }) {
  // Estados del componente
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [globalError, setGlobalError] = useState(null);
  const initialLink = contribution?.url || "";
  const [currentLink, setCurrentLink] = useState(initialLink);
  const [linkVerificationState, setLinkVerificationState] = useState(LINK_VERIFICATION_STATES.IDLE);

  // Hook para gestionar el formulario
  const {
    register,
    handleSubmit,
    control,
    reset,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      contributionId: contribution?.id || "",
      title: contribution?.title || "",
      description: contribution?.description || "",
      isActive: contribution?.isActive ?? true,
      linkDrive: contribution?.url || "",
    },
  });

  /**
   * Maneja el cambio del campo del link.
   * Reinicia la verificación si el link cambia respecto al original.
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  const handleLinkChange = (event) => {
    setCurrentLink(event.target.value);
    if (event.target.value !== initialLink) {
      setLinkVerificationState(LINK_VERIFICATION_STATES.IDLE);
    }
  };

  /**
   * Verifica si el link de Google Drive es público.
   * @async
   * @param {string} link - Enlace a verificar.
   * @returns {Promise<string>} - Mensaje de éxito si es público.
   * @throws {Error} - Si el link no es válido o no es público.
   */
  const verifyDriveLink = async (link) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contribution/checkIsPublicLink`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ linkDrive: link }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || ERROR_MESSAGES.LINK_NOT_PUBLIC);
    }
    return data.message;
  };

  /**
   * Ejecuta la verificación del link actual.
   */
  const handleVerify = async () => {
    if (!currentLink) {
      setLinkVerificationState(LINK_VERIFICATION_STATES.ERROR);
      setError("linkDrive", {
        type: "manual",
        message: ERROR_MESSAGES.LINK_REQUIRED,
      });
      return;
    }

    setLinkVerificationState(LINK_VERIFICATION_STATES.CHECKING);
    clearErrors("linkDrive");

    try {
      await verifyDriveLink(currentLink);
      setLinkVerificationState(LINK_VERIFICATION_STATES.SUCCESS);
    } catch (error) {
      setLinkVerificationState(LINK_VERIFICATION_STATES.ERROR);
      setError("linkDrive", {
        type: "manual",
        message: error.message || ERROR_MESSAGES.LINK_VERIFICATION_FAILED,
      });
    }
  };

  /**
   * Envía los datos del formulario si el link es válido o no fue modificado.
   * @param {Object} data - Datos del formulario.
   */
  const handleSubmitData = (data) => {
    if (currentLink !== initialLink && linkVerificationState !== LINK_VERIFICATION_STATES.SUCCESS) {
      setGlobalError(ERROR_MESSAGES.VERIFY_FIRST);
      return;
    }
    handleUpdate(data);
  };

  /**
   * Llama al endpoint para actualizar el aporte en la base de datos.
   * @async
   * @param {Object} data - Datos del aporte a actualizar.
   */
  const handleUpdate = async (data) => {
    setIsUpdating(true);
    setGlobalError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contribution/update`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        const errorMessage = responseData.errors?.[0]?.msg || responseData.message || ERROR_MESSAGES.UPDATE_ERROR;
        throw new Error(errorMessage);
      }

      await onSuccess(); // Callback para actualizar vista
      reset({
        contributionId: responseData.id || data.contributionId,
        title: responseData.title || data.title,
        description: responseData.description || data.description,
        isActive: responseData.isActive ?? data.isActive,
        linkDrive: responseData.url || data.linkDrive,
      });
      setIsDialogOpen(false);
      setLinkVerificationState(LINK_VERIFICATION_STATES.IDLE);
    } catch (error) {
      setGlobalError(error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  /**
   * Cancela la edición y resetea el estado del formulario y verificación.
   */
  const handleCancel = () => {
    setIsDialogOpen(false);
    setGlobalError(null);
    reset();
    setLinkVerificationState(LINK_VERIFICATION_STATES.IDLE);
    setCurrentLink(initialLink);
  };

  /**
   * Devuelve el color del borde del input según el estado de validación.
   * @returns {string} - Color en formato de Chakra UI (ej: "red.600").
   */
  const getBorderColor = () => {
    if (errors.linkDrive) return "red.600";
    if (linkVerificationState === LINK_VERIFICATION_STATES.SUCCESS) return "green.600";
    if (linkVerificationState === LINK_VERIFICATION_STATES.ERROR) return "red.600";
    return "gray.300";
  };

  // Render
  return (
    <>
      <Button mr="1" size="2xs" onClick={() => setIsDialogOpen(true)}>
        <MdEditSquare />
      </Button>

      <Portal>
        <Dialog.Root open={isDialogOpen} onOpenChange={(open) => !open && handleCancel()}>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content w="100%" maxW="600px" p="6" flexDirection="column" gap="3">
              <Dialog.Body as="form" p="0" display="flex" flexDirection="column" gap="3">
                <Field.Root p="0" display="flex" flexDirection="column" gap="3">
                  <Field.Label>Título</Field.Label>
                  <Input {...register("title")} />

                  <Field.Label>Descripción</Field.Label>
                  <Textarea {...register("description")} minH="200px" borderRadius="md" />

                  <Flex flexDirection={{ base: "column", md: "row" }} gap="3" w="100%">
                    <Flex flex="1" direction="column">
                      <Input
                        {...register("linkDrive")}
                        bg="white"
                        borderRadius="md"
                        size="md"
                        borderColor={getBorderColor()}
                        value={currentLink}
                        onChange={handleLinkChange}
                      />
                    </Flex>
                    <Button
                      onClick={handleVerify}
                      colorScheme="cyan"
                      size="md"
                      isDisabled={linkVerificationState === LINK_VERIFICATION_STATES.CHECKING}
                      alignSelf={{ base: "stretch", md: "center" }}>
                      {linkVerificationState === LINK_VERIFICATION_STATES.CHECKING ? (
                        <Spinner size="sm" />
                      ) : (
                        "Verificar link"
                      )}
                    </Button>
                  </Flex>

                  <Field.Label>Activo</Field.Label>
                  <Controller
                    name="isActive"
                    control={control}
                    render={({ field }) => (
                      <Field.Root>
                        <Switch.Root
                          name={field.name}
                          checked={field.value}
                          onCheckedChange={({ checked }) => field.onChange(checked)}>
                          <Switch.HiddenInput onBlur={field.onBlur} />
                          <Switch.Control />
                        </Switch.Root>
                      </Field.Root>
                    )}
                  />
                </Field.Root>
              </Dialog.Body>

              <Dialog.Footer p="0">
                <Button onClick={handleSubmit(handleSubmitData)} flex="1" isDisabled={isUpdating} focusRing="none">
                  {isUpdating ? <Spinner size="sm" /> : "Guardar cambios"}
                </Button>
                <Button flex="1" variant="surface" onClick={handleCancel} isDisabled={isUpdating}>
                  Cancelar
                </Button>
              </Dialog.Footer>

              {globalError && <FormAlert status="error" message={globalError} />}
              {errors.linkDrive && <FormAlert status="error" message={errors.linkDrive.message} />}
              {linkVerificationState === LINK_VERIFICATION_STATES.SUCCESS && (
                <FormAlert status="success" message={SUCCESS_MESSAGES.LINK_VALID} />
              )}
            </Dialog.Content>
          </Dialog.Positioner>
        </Dialog.Root>
      </Portal>
    </>
  );
}
