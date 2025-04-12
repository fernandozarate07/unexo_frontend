import { Flex, Text, Heading, IconButton, Button } from "@chakra-ui/react";
import NextImage from "next/image";
import { FaHeart } from "react-icons/fa";
import { IoIosSave } from "react-icons/io";

export default function Contribution({ result }) {
  return (
    <Flex p="6" flexDirection="column" gap="6" w="100%">
      <Flex gap="4" alignItems="center">
        <NextImage
          src="/unexo_logo.svg" // reemplazar con imagen real
          alt="Preview"
          width={80}
          height={80}
          style={{ objectFit: "cover" }}
        />
        <Heading size="md">{result?.user?.name ?? "Usuario desconocido"}</Heading>
      </Flex>

      <Flex flexDirection="column" gap="3">
        <Heading size="3xl">{result.title}</Heading>
        <Text fontSize="xs" color="gray.500">
          {result.faculty?.name} / {result.degree?.name} / {result.academicYear?.name} / {result.subject?.name}
        </Text>
        <Text>{result.description}</Text>
        <Flex gap="3" alignItems="center">
          <IconButton aria-label="dar like" size="xs" variant="subtle" px="3">
            <Text fontSize="lg">{result.likesCount}</Text>
            <FaHeart />
          </IconButton>
          <IconButton aria-label="guardar" size="md" variant="ghost">
            <IoIosSave />
          </IconButton>
        </Flex>
      </Flex>

      <Flex
        m="3"
        p="3"
        flexDirection="column"
        alignItems="center"
        gap="3"
        w="100%"
        borderTop="1px solid"
        borderColor="gray.200">
        <Flex flexDirection="column" alignItems="center">
          <Text fontSize="xs" color="gray.500">
            Este aporte cuesta 5 NexoPoints
          </Text>
          <Text fontSize="xs" color="gray.500">
            Actualmente tenés (inserta aquí cantidad de nexopoint del usuario)
          </Text>
        </Flex>
        <Button colorPalette="cyan" maxW="40%">
          Descargar aporte
        </Button>
      </Flex>
    </Flex>
  );
}
