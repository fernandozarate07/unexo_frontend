import { Button, Dialog, Portal, Spinner, Text } from "@chakra-ui/react";
import { useState } from "react";
import FormAlert from "@/components/formComponents/FormAlert";
import { useAuth } from "@/context/AuthContext";

/**
 * Botón que permite al usuario descargar un aporte.
 * Muestra un diálogo de confirmación antes de proceder con la descarga.
 *
 * @component
 * @param {Object} props
 * @param {string} props.contributionId - ID del aporte a quitar de la lista de guardados.
 * @param {Function} [props.onSuccess] - Callback que se ejecuta tras una descarga exitosa.
 */
export default function DownloadContributionButton({ contributionId, setDownloadUrl }) {
  const [state, setState] = useState({
    isDialogOpen: false,
    isDownloading: false,
    error: null,
  });
  const { refetchUser } = useAuth();

  const { isDialogOpen, isDownloading, error } = state;

  /**
   * Actualiza el estado parcial del componente.
   * @param {Object} newState - Fragmento de estado a actualizar.
   */
  const updateState = (newState) => {
    setState((prev) => ({ ...prev, ...newState }));
  };

  /**
   * Maneja la solicitud de descarga del aporte.
   */
  const handleDownload = async () => {
    updateState({ isDownloading: true, error: null });

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/downloadContribution/${contributionId}`, {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || "ERROR: Error al intentar descargar el aporte");
      }
      setDownloadUrl(data.downloadUrl);
      refetchUser();
      updateState({ isDialogOpen: false });
    } catch (error) {
      updateState({ error: error.message });
    } finally {
      updateState({ isDownloading: false });
    }
  };

  /**
   * Cierra el diálogo sin descargar el aporte.
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
      <Button colorPalette="blue" onClick={openDialog} borderRadius="md">
        Descargar
      </Button>

      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => updateState({ isDialogOpen: false })}
        onDownload={handleDownload}
        onCancel={handleCancel}
        isDownloading={isDownloading}
        error={error}
      />
    </>
  );
}

/**
 * Diálogo de confirmación para la descarga de un aporte.
 *
 * @component
 * @param {Object} props
 * @param {boolean} props.isOpen - Indica si el diálogo está abierto.
 * @param {Function} props.onClose - Callback al cerrar el diálogo.
 * @param {Function} props.onDownload - Callback al confirmar la descarga.
 * @param {Function} props.onCancel - Callback al cancelar la acción.
 * @param {boolean} props.isDownloading - Indica si se está procesando la descarga.
 * @param {string|null} props.error - Mensaje de error en caso de fallo.
 */
function ConfirmationDialog({ isOpen, onClose, onDownload, onCancel, isDownloading, error }) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content w="100%" maxW="600px" p="6" flexDirection="column" gap="3">
            <Dialog.Body p="0">
              <Text textAlign="center">
                ¿Estás seguro de que querés descargar este aporte? Se te descontarán 5 Nexopoints.
              </Text>
            </Dialog.Body>

            <Dialog.Footer p="0">
              <Button flex="1" colorPalette="blue" onClick={onDownload} isDisabled={isDownloading} focusRing="none">
                {isDownloading ? <Spinner size="sm" /> : "Descargar"}
              </Button>

              <Button flex="1" variant="surface" onClick={onCancel} isDisabled={isDownloading}>
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
