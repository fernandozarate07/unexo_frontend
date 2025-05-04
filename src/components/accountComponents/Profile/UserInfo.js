"use client";

import { Flex, Text, Button, Spinner, Input, Dialog, Portal, IconButton, Field } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormAlert from "@/components/formComponents/FormAlert";
import { TbUserEdit } from "react-icons/tb";

// Estados posibles durante la actualización del nombre del usuario
const UPDATE_STATES = {
  IDLE: "idle",
  UPDATING: "updating",
  SUCCESS: "success",
  ERROR: "error",
};

// Mensajes de error globales
const ERROR_MESSAGES = {
  UPDATE_ERROR: "ERROR: Error al actualizar el nombre",
  VALIDATION_ERROR: "ERROR: Error de validación",
};

/**
 * Componente principal que muestra la información del usuario
 * y permite editar su nombre desde un diálogo modal.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.user - Objeto del usuario autenticado.
 * @param {Function} props.refetchUser - Función para refrescar los datos del usuario luego de una actualización.
 */
export default function UserInfoSection({ user, refetchUser }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [updateState, setUpdateState] = useState(UPDATE_STATES.IDLE);
  const [globalError, setGlobalError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name || "",
    },
  });

  // Abre el diálogo con el nombre actual
  const handleEditClick = () => {
    reset({ name: user.name });
    setIsDialogOpen(true);
    setGlobalError(null);
    clearErrors();
    setUpdateState(UPDATE_STATES.IDLE);
  };

  // Cierra el diálogo y limpia errores
  const handleCancel = () => {
    setIsDialogOpen(false);
    setGlobalError(null);
    setUpdateState(UPDATE_STATES.IDLE);
  };

  /**
   * Llama al backend para actualizar el nombre del usuario.
   * @param {string} name - El nuevo nombre a guardar.
   */
  const updateUserName = async (name) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/updateName`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.errors) {
        throw errorData.errors;
      }
      throw new Error(errorData.message || ERROR_MESSAGES.UPDATE_ERROR);
    }
  };

  /**
   * Maneja el envío del formulario de edición del nombre.
   * @param {Object} data - Datos del formulario, incluyendo el nuevo nombre.
   */
  const handleSave = async (data) => {
    try {
      setUpdateState(UPDATE_STATES.UPDATING);
      setGlobalError(null);
      clearErrors();

      await updateUserName(data.name);
      await refetchUser();

      setUpdateState(UPDATE_STATES.SUCCESS);
      setIsDialogOpen(false);
    } catch (error) {
      setUpdateState(UPDATE_STATES.ERROR);
      if (Array.isArray(error)) {
        error.forEach((err) => {
          if (err.path === "name") {
            setGlobalError(err.msg);
          }
        });
      } else {
        setGlobalError(error.message);
      }
    }
  };

  if (!user) {
    return <Spinner size="md" alignSelf="center" />;
  }

  return (
    <>
      <UserProfileView user={user} onEditClick={handleEditClick} />

      <EditDialog
        isOpen={isDialogOpen}
        onClose={handleCancel}
        onSubmit={handleSubmit(handleSave)}
        isUpdating={updateState === UPDATE_STATES.UPDATING}
        errors={errors}
        register={register}
        globalError={globalError}
      />
    </>
  );
}

/**
 * Muestra el nombre y el email del usuario, junto con un botón para editar.
 *
 * @param {Object} props
 * @param {Object} props.user - Objeto con los datos del usuario.
 * @param {Function} props.onEditClick - Función para abrir el diálogo de edición.
 */
const UserProfileView = ({ user, onEditClick }) => (
  <Flex flexDirection="column" gap="1">
    <Flex alignItems="center" gap="3">
      <Text fontSize="xl" fontWeight="bold">
        {user.name}
      </Text>
      <IconButton borderRadius="full" variant="subtle" colorPalette="blue" size="2xs" onClick={onEditClick}>
        <TbUserEdit />
      </IconButton>
    </Flex>
    <Text fontSize={{ base: "xs", md: "sm" }}>{user.email}</Text>
  </Flex>
);

/**
 * Diálogo modal que permite editar el nombre del usuario.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Indica si el diálogo está abierto.
 * @param {Function} props.onClose - Función para cerrar el diálogo.
 * @param {Function} props.onSubmit - Función para manejar el envío del formulario.
 * @param {boolean} props.isUpdating - Indica si se está enviando el formulario.
 * @param {Function} props.register - Función de react-hook-form para registrar campos.
 * @param {string|null} props.globalError - Error global para mostrar en el formulario.
 */
const EditDialog = ({ isOpen, onClose, onSubmit, isUpdating, register, globalError }) => (
  <Dialog.Root open={isOpen} onOpenChange={(isOpen) => !isOpen && onClose()}>
    <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content w="100%" maxW="600px" p="6">
          <Dialog.Body as="form" onSubmit={onSubmit} p="0" display="flex" flexDirection="column" gap="3">
            <Field.Root p="0" display="flex" flexDirection="column" gap="3">
              <Field.Label>Nuevo nombre</Field.Label>
              <Input placeholder="Juan Perez" {...register("name")} />
            </Field.Root>

            <Dialog.Footer p="0">
              <Button flex="1" focusRing="none" type="submit" isDisabled={isUpdating} colorPalette="blue">
                {isUpdating ? <Spinner size="sm" /> : "Guardar cambios"}
              </Button>

              <Button flex="1" variant="surface" focusRing="none" onClick={onClose} isDisabled={isUpdating}>
                Cancelar
              </Button>
            </Dialog.Footer>

            {globalError && <FormAlert status="error" message={globalError} />}
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  </Dialog.Root>
);
