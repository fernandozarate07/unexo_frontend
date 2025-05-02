"use client";

import { Flex, IconButton, Spinner, Box, FileUpload, Dialog, Portal, Button } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { FaCameraRotate } from "react-icons/fa6";
import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { readFile, getCroppedImg } from "@/utils/fileUtils";
import FormAlert from "@/components/formComponents/FormAlert";

/**
 * ProfilePictureUploader
 *
 * Componente que permite al usuario seleccionar una nueva foto de perfil.
 * Incluye avatar actual y un botón para activar el cargador de archivos.
 *
 * @param {Object} props
 * @param {Object} props.user - Información del usuario actual.
 * @param {Function} props.onFileSelect - Función que maneja el archivo seleccionado.
 * @returns {JSX.Element}
 */
const ProfilePictureUploader = ({ user, onFileSelect }) => {
  return (
    <FileUpload.Root w="auto" onChange={onFileSelect} accept="image/*">
      <FileUpload.HiddenInput />
      <FileUpload.Trigger asChild>
        <Flex position="relative" cursor="pointer">
          {/* Avatar que muestra la foto actual del usuario */}
          <Avatar.Root size="2xl">
            <Avatar.Fallback name={user?.name} />
            <Avatar.Image src={user?.profilePhoto} />
          </Avatar.Root>

          {/* Botón flotante para cambiar la foto */}
          <IconButton
            aria-label="Cambiar foto de perfil"
            size="2xs"
            position="absolute"
            bottom="0"
            right="0"
            borderRadius="full">
            <FaCameraRotate />
          </IconButton>
        </Flex>
      </FileUpload.Trigger>
    </FileUpload.Root>
  );
};

/**
 * ImageCropperModal
 *
 * Modal que permite recortar la imagen seleccionada antes de guardarla como foto de perfil.
 *
 * @param {Object} props
 * @param {string|null} props.imageSrc - URL de la imagen cargada para recorte.
 * @param {Function} props.onClose - Función para cerrar el modal.
 * @param {Function} props.onSave - Función para guardar la imagen recortada.
 * @param {string|null} props.error - Error al intentar guardar, si existe.
 * @param {boolean} props.isSaving - Indica si la imagen se está guardando.
 * @returns {JSX.Element}
 */
const ImageCropperModal = ({ imageSrc, onClose, onSave, error, isSaving }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  // Guarda el área recortada cuando el usuario termina de ajustar el recorte
  const onCropComplete = useCallback((_croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  return (
    <Dialog.Root open={!!imageSrc} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content w="100%" maxW="600px" p="6" flexDirection="column" gap="3">
            <Dialog.Header p="0">
              <Dialog.Title>Recortá tu imagen</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body p="0">
              <Box position="relative" w="100%" h="400px">
                {/* Componente de recorte de imagen */}
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  aspect={1}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  cropShape="round"
                  showGrid={false}
                />
              </Box>
            </Dialog.Body>

            <Dialog.Footer p="0">
              {/* Botón para guardar el recorte */}
              <Button flex="1" focusRing="none" onClick={() => onSave(croppedAreaPixels)} isDisabled={isSaving}>
                {isSaving ? <Spinner size="sm" /> : "Guardar"}
              </Button>

              {/* Botón para cancelar y cerrar el modal */}
              <Button flex="1" variant="surface" focusRing="none" onClick={onClose}>
                Cancelar
              </Button>
            </Dialog.Footer>

            {/* Alerta de error en caso de fallo al guardar */}
            {error && <FormAlert status="error" message={error} />}
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

/**
 * ProfilePictureSection
 *
 * Componente principal que gestiona la actualización de la foto de perfil del usuario.
 * Permite seleccionar una imagen, recortarla y enviarla al servidor.
 *
 * @param {Object} props
 * @param {Object} props.user - Información del usuario actual.
 * @param {Function} props.refetchUser - Función para actualizar los datos del usuario tras un cambio.
 * @returns {JSX.Element}
 */
export default function ProfilePictureSection({ user, refetchUser }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  /**
   * Maneja el archivo seleccionado por el usuario.
   * @param {Event} e - Evento de cambio de archivo.
   */
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match("image.*")) {
      setError("ERROR: Por favor selecciona una imagen válida");
      return;
    }

    try {
      const imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
      setError(null);
    } catch (error) {
      setError("ERROR: Error al procesar la imagen");
    }
  };

  /**
   * Guarda la imagen recortada en el servidor.
   * @param {Object} croppedAreaPixels - Área seleccionada del recorte.
   */
  const handleSave = async (croppedAreaPixels) => {
    try {
      setError(null);
      setIsSaving(true);

      if (!imageSrc || !croppedAreaPixels) return;

      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      const blob = croppedImage;
      if (!blob) return;

      const formData = new FormData();
      formData.append("image", blob, "profile-picture.jpg");

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/handleProfilePicture`, {
        credentials: "include",
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "ERROR: Error del servidor");
      }

      await refetchUser();
      setImageSrc(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <ProfilePictureUploader user={user} onFileSelect={handleFileChange} />
      <ImageCropperModal
        imageSrc={imageSrc}
        onClose={() => setImageSrc(null)}
        onSave={handleSave}
        error={error}
        isSaving={isSaving}
      />
    </>
  );
}
