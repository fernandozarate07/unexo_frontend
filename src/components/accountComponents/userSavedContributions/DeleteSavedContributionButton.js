import { Button, Dialog, Portal, Spinner, Text, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import FormAlert from "@/components/formComponents/FormAlert";

/**
 * Botón que permite al usuario eliminar un aporte.
 * Muestra un diálogo de confirmación antes de proceder con la eliminación.
 *
 * @component
 * @param {Object} props
 * @param {string} props.contributionId - ID del aporte a quitar de la lista de guardados.
 * @param {Function} [props.onSuccess] - Callback que se ejecuta tras una eliminación exitosa.
 */
export default function DeleteContributionButton({ contributionId, onSuccess }) {
  const [state, setState] = useState({
    isDialogOpen: false,
    isDeleting: false,
    error: null,
  });

  const { isDialogOpen, isDeleting, error } = state;

  /**
   * Actualiza el estado parcial del componente.
   * @param {Object} newState - Fragmento de estado a actualizar.
   */
  const updateState = (newState) => {
    setState((prev) => ({ ...prev, ...newState }));
  };

  /**
   * Maneja la solicitud de eliminación del aporte.
   */
  const handleDelete = async () => {
    updateState({ isDeleting: true, error: null });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/savedContribution/${contributionId}/toggle`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "ERROR: Error al quitar el aporte de guardados");
      }

      onSuccess?.(); // Ejecuta callback si se proporciona
      updateState({ isDialogOpen: false });
    } catch (error) {
      updateState({ error: error.message });
    } finally {
      updateState({ isDeleting: false });
    }
  };

  /**
   * Cierra el diálogo sin eliminar el aporte.
   */
  const handleCancel = () => {
    updateState({ isDialogOpen: false, error: null });
  };

  /**
   * Abre el diálogo de confirmación.
   */
  const openDialog = () => {
    updateState({ isDialogOpen: true });
  };

  return (
    <>
      <IconButton mr="1" size="2xs" variant="surface" onClick={openDialog} borderRadius="full">
        <MdDelete />
      </IconButton>

      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => updateState({ isDialogOpen: false })}
        onDelete={handleDelete}
        onCancel={handleCancel}
        isDeleting={isDeleting}
        error={error}
      />
    </>
  );
}

/**
 * Diálogo de confirmación para eliminar un aporte.
 *
 * @component
 * @param {Object} props
 * @param {boolean} props.isOpen - Indica si el diálogo está abierto.
 * @param {Function} props.onClose - Callback al cerrar el diálogo.
 * @param {Function} props.onDelete - Callback al confirmar la eliminación.
 * @param {Function} props.onCancel - Callback al cancelar la acción.
 * @param {boolean} props.isDeleting - Indica si se está procesando la eliminación.
 * @param {string|null} props.error - Mensaje de error en caso de fallo.
 */
function ConfirmationDialog({ isOpen, onClose, onDelete, onCancel, isDeleting, error }) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content w="100%" maxW="600px" p="6" flexDirection="column" gap="3">
            <Dialog.Body p="0">
              <Text textAlign="center">
                ¿Estás seguro de que querés eliminar este aporte de tus guardados? Esta acción no se puede deshacer.
              </Text>
            </Dialog.Body>

            <Dialog.Footer p="0">
              <Button flex="1" colorPalette="blue" onClick={onDelete} isDisabled={isDeleting} focusRing="none">
                {isDeleting ? <Spinner size="sm" /> : "Eliminar"}
              </Button>

              <Button flex="1" variant="surface" onClick={onCancel} isDisabled={isDeleting}>
                Cancelar
              </Button>
            </Dialog.Footer>

            {error && <FormAlert status="error" message={error} />}
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
