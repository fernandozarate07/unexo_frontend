import { Box, Flex, Text, Heading, Separator } from "@chakra-ui/react";
import NextImage from "next/image";

export default function CardResult({ result, onClick, isSelected }) {
  return (
    <Flex
      p="3"
      flexDirection="column"
      gap="3"
      borderRadius="md"
      border="1px solid "
      borderColor="gray.200"
      bg={isSelected ? "gray.100" : "white"}
      cursor="pointer"
      onClick={onClick}
      transition="background 0.2s ease">
      <Text fontSize="2xs" color="gray.500">
        {result.faculty?.name} / {result.degree?.name} / {result.academicYear?.name} / {result.subject?.name}
      </Text>
      <Separator />
      <Flex gap="3" alignItems="center">
        <Box overflow="hidden" borderRight="1px solid" borderColor="gray.200">
          <NextImage
            src="/unexo_logo.svg" // reemplazar con imagen real
            alt="Preview"
            width={80}
            height={80}
            style={{ objectFit: "cover" }}
          />
        </Box>
        <Flex direction="column" gap="1" w="100%">
          <Heading size="sm">{result.title}</Heading>
          <Text color="gray.500" fontSize="xs">
            {result.description.length > 100 ? result.description.slice(0, 100) + "..." : result.description}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
