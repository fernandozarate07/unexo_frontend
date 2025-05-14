import { Flex, Text, Heading, Avatar, Button, Link, Separator } from "@chakra-ui/react";
import DownloadContributionButton from "../components/searchComponents/downloadContributionButton";
import { useAuth } from "@/context/AuthContext";
import NextImage from "next/image"; // Componente optimizado para imágenes en Next.js
import { useState, useEffect } from "react";
import NextLink from "next/link";
import SavedContributionButton from "../components/searchComponents/SavedContributionButton";
import LikeButton from "../components/searchComponents/LikeButton";

export default function Contribution({ result, selectedResult }) {
  const { user } = useAuth();
  const [downloadUrl, setDownloadUrl] = useState(null);

  useEffect(() => {
    setDownloadUrl(null);
  }, [selectedResult]);

  return (
    <Flex p="3" flexDirection="column" gap="6" w="100%">
      {/* Seccion de información del usuario ---------------------------------- */}
      <Flex gap="3" alignItems="center">
        <Avatar.Root size="2xl">
          <Avatar.Fallback name={result.user?.name} />
          <Avatar.Image src={result.user?.profilePhoto} />
        </Avatar.Root>
        <Heading size="xl" wei>
          {result?.user?.name ?? "Usuario desconocido"}
        </Heading>
      </Flex>
      <Separator />
      {/* Seccion de información de la contribución ---------------------------------- */}
      <Flex flexDirection="column" gap="3">
        <Text fontSize="xs" color="gray.500">
          {result.faculty?.name} / {result.degree?.name} / {result.academicYear?.name} / {result.subject?.name}
        </Text>
        <Heading size="3xl">{result.title}</Heading>
        <Text>{result.description}</Text>
        {/* Renderiza el boton de guardar segun la condicion ---------------------------------- */}
        {/* 1 si no se inicio session */}
        {!user && (
          <Text fontSize="xs" color="gray.500">
            <Link as={NextLink} fontWeight="800" focusRing="none" textDecoration="none" href="/login" color="blue.600">
              Iniciá sesión
            </Link>{" "}
            para poder dar like y guardar este aporte.
          </Text>
        )}
        {/* 2 si existe session pero la contribucion es del usuario entonces no renderizamos nada */}
        {user && user.id === result.user.id && null}
        {/* 3 si existe session y la contribucion no es del usuario entonces renderizamos los botones */}
        {user && user.id !== result.user.id && (
          <Flex gap="3" alignItems="center">
            <LikeButton contributionId={result.id} likes={result.likesCount} />
            <SavedContributionButton contributionId={result.id} />
          </Flex>
        )}
      </Flex>

      {/* Renderiza el boton de descargar segun la condicion ---------------------------------- */}
      {(() => {
        {
          /* 1 si se actualiza el estado de downloadUrl (que es aculizado en el componente del boton) se renderiza el boton para ir a Drive */
        }
        if (downloadUrl) {
          return (
            <Flex
              flexDirection="column"
              p="6"
              alignItems="center"
              textAlign="center"
              gap="3"
              borderTop="1px solid"
              borderColor="gray.200">
              <Text color="green.600" fontSize="xs" textAlign="center">
                ¡Descarga exitosa! Hacé clic abajo para abrir el archivo.
              </Text>
              <NextImage src="/success_download.svg" alt="Logo" width={60} height={60} />
              <Button
                as="a"
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                colorPalette="blue"
                borderRadius="md">
                Ir a Drive
              </Button>
            </Flex>
          );
        }
        /* 2 siel usuario no inicio session*/
        if (!user) {
          return (
            <Flex
              p="6"
              flexDirection="column"
              alignItems="center"
              textAlign="center"
              gap="3"
              borderTop="1px solid"
              borderColor="gray.200">
              <Text fontSize="xs" color="gray.500">
                <Link
                  as={NextLink}
                  fontWeight="800"
                  focusRing="none"
                  textDecoration="none"
                  href="/login"
                  color="blue.600">
                  Iniciar sesión
                </Link>{" "}
                para descargar el aporte.
              </Text>
            </Flex>
          );
        }
        /* 3 si la contribucion le pertenece al usuario no renderizamos nada*/
        if (user.id === result.user.id) {
          return null;
        }
        /* 4 si se inicio session*/
        return (
          <Flex
            p="6"
            flexDirection="column"
            alignItems="center"
            textAlign="center"
            gap="3"
            borderTop="1px solid"
            borderColor="gray.200">
            <Text fontSize="xs" color="gray.500">
              Se te descontarán 5 Nexopoints por esta descarga. Actualmente tenés {user.points} Nexopoints.
            </Text>
            <DownloadContributionButton contributionId={result.id} setDownloadUrl={setDownloadUrl} />
          </Flex>
        );
      })()}
    </Flex>
  );
}
