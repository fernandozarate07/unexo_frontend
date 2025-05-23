import { Spinner, IconButton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { IoAlert } from "react-icons/io5";

/**
 * Botón que permite al usuario guardar o quitar un like de su lista.
 *
 * @component
 * @param {Object} props
 * @param {string} props.contributionId - ID del aporte a verificar.
 */
export default function LikeButton({ contributionId, likes }) {
  const [isRecovering, setIsRecovering] = useState(true);
  const [isTogglingLiked, setIsTogglingLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState(null);
  const [likesCount, setLikesCount] = useState(likes);

  useEffect(() => {
    const checkLikedState = async () => {
      try {
        setError(null);
        setIsRecovering(true);
        setLikesCount(likes);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/like/${contributionId}`, {
          credentials: "include",
        });
        const data = await response.json();
        if (data.success !== true) {
          throw new Error(data.message || "Error al recuperar el estado del like.");
        }
        setIsSaved(data.isSaved);
        if (likes === 0 && data.isSaved === true) {
          setLikesCount(1);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsRecovering(false);
      }
    };
    checkLikedState();
  }, [contributionId]);
  const handleLikeToggle = async () => {
    const previousState = isSaved;

    try {
      setError(null);
      setIsTogglingLiked(true);
      setIsSaved(!previousState); // actualizacion optimista
      setLikesCount((prev) => (previousState ? prev - 1 : prev + 1));

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/like/${contributionId}/toggle`, {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();
      if (!response.ok || data.success !== true) {
        throw new Error(data.message || "Error al agregar o quitar like.");
      }
    } catch (err) {
      setIsSaved(previousState);
      setLikesCount((prev) => (previousState ? prev + 1 : prev - 1));
      setError(err.message);
    } finally {
      setIsTogglingLiked(false);
    }
  };

  if (isRecovering || isTogglingLiked) {
    return (
      <IconButton aria-label="Dar like" size="xs" variant="subtle" px="3">
        <Spinner size="xs" alignSelf="center" />
      </IconButton>
    );
  }
  return (
    <IconButton
      aria-label="Dar like"
      size="xs"
      variant="subtle"
      px="3"
      onClick={handleLikeToggle}
      colorPalette={isSaved ? "blue" : "none"}>
      {error ? <IoAlert /> : isSaved ? <IoMdHeart color="blue" /> : <IoMdHeartEmpty />} {likesCount}
    </IconButton>
  );
}
