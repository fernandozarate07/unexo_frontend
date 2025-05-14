import { Flex, Text, Heading, Separator, Avatar } from "@chakra-ui/react";

export default function CardResult({ result, onClick, isSelected }) {
  const facultyColorMap = {
    "Facultad de Ciencias Sociales": "cyan.600",
    "Facultad de Ingeniería": "green.600",
    "Facultad de Ciencias Exactas": "orange.600",
    "Facultad de Filosofía y Humanidades": "cyan.600",
    "Facultad de Arquitectura, Urbanismo y Diseño": "yellow.600",
  }; // los nombre deberan ser cambiados por los datos estaticos que usara base de datos una vez esten.

  const facultyName = result.faculty?.name;
  const borderColor = facultyColorMap[facultyName] || "gray.200";

  const bg = isSelected ? facultyColorMap[facultyName]?.replace(".600", ".50") : "gray.50";

  return (
    <Flex
      p="3"
      flexDirection="column"
      gap="1"
      borderRadius="md"
      borderLeftRadius="none"
      borderLeft="4px solid"
      borderLeftColor={borderColor}
      bg={bg}
      cursor="pointer"
      onClick={onClick}
      transition="background 0.2s ease">
      <Text fontSize="2xs" color="gray.500">
        {result.faculty?.name} / {result.degree?.name} / {result.academicYear?.name} / {result.subject?.name}
      </Text>
      <Separator />
      <Flex gap="3" alignItems="center">
        <Avatar.Root>
          <Avatar.Fallback name={result.user?.name} />
          <Avatar.Image src={result.user?.profilePhoto} />
        </Avatar.Root>
        <Flex direction="column" w="100%">
          <Heading size="sm">{result.title}</Heading>
          <Text color="gray.500" fontSize="xs">
            {result.description.length > 100 ? result.description.slice(0, 100) + "..." : result.description}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
