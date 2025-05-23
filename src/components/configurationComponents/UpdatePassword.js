// COMPONENTE PARA CAMBIAR CONTRASEÑA DEL USUARIO

"use client";

import { Flex, Button, Spinner, Input, Dialog, Portal, Field } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FormAlert from "@/components/formComponents/FormAlert";

const UPDATE_STATES = {
  IDLE: "idle",
  UPDATING: "updating",
  SUCCESS: "success",
  ERROR: "error",
};

const ERROR_MESSAGES = {
  UPDATE_ERROR: "ERROR: Error al actualizar la contraseña",
};

export default function UserInfoSection() {
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
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleEditClick = () => {
    setIsDialogOpen(true);
    setGlobalError(null);
    clearErrors();
    setUpdateState(UPDATE_STATES.IDLE);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    reset();
    setGlobalError(null);
    setUpdateState(UPDATE_STATES.IDLE);
  };

  const updatePassword = async (data) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/password`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.errors) {
        throw errorData.errors;
      }
      throw new Error(errorData.message || ERROR_MESSAGES.UPDATE_ERROR);
    }
  };

  const handleSave = async (data) => {
    try {
      setUpdateState(UPDATE_STATES.UPDATING);
      setGlobalError(null);
      clearErrors();

      await updatePassword(data);

      setUpdateState(UPDATE_STATES.SUCCESS);
      setIsDialogOpen(false);
      reset();
    } catch (error) {
      setUpdateState(UPDATE_STATES.ERROR);
      if (Array.isArray(error)) {
        const messages = error.map((e) => e.msg).join(" ");
        setGlobalError(messages);
      } else {
        setGlobalError(error.message);
      }
    }
  };

  return (
    <>
      <UserProfileView onEditClick={handleEditClick} />

      <EditDialog
        isOpen={isDialogOpen}
        onClose={handleCancel}
        onSubmit={handleSubmit(handleSave)}
        isUpdating={updateState === UPDATE_STATES.UPDATING}
        register={register}
        globalError={globalError}
        errors={errors}
      />
    </>
  );
}

const UserProfileView = ({ onEditClick }) => (
  <Flex flexDirection="column">
    <Button variant="subtle" colorPalette="blue" size="2xs" onClick={onEditClick}>
      Cambiar contraseña
    </Button>
  </Flex>
);

const EditDialog = ({ isOpen, onClose, onSubmit, isUpdating, register, globalError, errors }) => (
  <Dialog.Root open={isOpen} onOpenChange={(isOpen) => !isOpen && onClose()}>
    <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content w="100%" maxW="600px" p="6">
          <Dialog.Body as="form" onSubmit={onSubmit} p="0" display="flex" flexDirection="column" gap="3">
            <Field.Root>
              <Field.Label>Contraseña actual</Field.Label>
              <Input type="password" {...register("currentPassword", { required: true })} />
            </Field.Root>

            <Field.Root>
              <Field.Label>Nueva contraseña</Field.Label>
              <Input type="password" {...register("newPassword", { required: true, minLength: 6 })} />
            </Field.Root>

            <Field.Root>
              <Field.Label>Confirmar nueva contraseña</Field.Label>
              <Input type="password" {...register("confirmPassword", { required: true })} />
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
