import { Spinner, IconButton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdBookmarkBorder, MdBookmarkAdded } from "react-icons/md";
import { IoAlert } from "react-icons/io5";

/**
 * Botón que permite al usuario guardar o quitar un aporte de su lista de guardados.
 *
 * @component
 * @param {Object} props
 * @param {string} props.contributionId - ID del aporte a verificar.
 */
export default function SavedContributionButton({ contributionId }) {
  const [isRecovering, setIsRecovering] = useState(true);
  const [isTogglingSaved, setIsTogglingSaved] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkSavedState = async () => {
      try {
        setError(null);
        setIsRecovering(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/savedContribution/recoverSavedStateContribution/${contributionId}`,
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        if (data.success !== true) {
          throw new Error(data.message || "Error al recuperar el estado de guardado.");
        }
        setIsSaved(data.isSaved);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsRecovering(false);
      }
    };
    checkSavedState();
  }, [contributionId]);
  const handleSavedContributionToggle = async () => {
    const previousState = isSaved;

    try {
      setError(null);
      setIsTogglingSaved(true);
      setIsSaved(!previousState); // Optimistic update

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/savedContribution/savedContributionToggle/${contributionId}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await response.json();
      if (!response.ok || data.success !== true) {
        throw new Error(data.message || "Error al agregar o quitar de guardados.");
      }
    } catch (err) {
      setIsSaved(previousState); // revertimos usando previousState
      setError(err.message);
    } finally {
      setIsTogglingSaved(false);
    }
  };

  if (isRecovering || isTogglingSaved) {
    return (
      <IconButton aria-label="Guardar aporte" size="xs" variant="subtle" px="3">
        <Spinner size="xs" alignSelf="center" />
      </IconButton>
    );
  }
  return (
    <IconButton
      aria-label="Guardar aporte"
      size="xs"
      variant="subtle"
      px="3"
      onClick={handleSavedContributionToggle}
      colorPalette={isSaved ? "blue" : "none"}>
      {error ? <IoAlert /> : isSaved ? <MdBookmarkAdded color="blue" /> : <MdBookmarkBorder />}
    </IconButton>
  );
}
