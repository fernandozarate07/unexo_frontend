"use client";

import { Flex, Heading, Text, Separator, Box, Avatar, Card, IconButton } from "@chakra-ui/react";
import { FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";

export default function AboutUnexo() {
  // Datos del equipo
  const team = [
    {
      name: "Fernando Zárate",
      role: ["Fundador de Unexo", "Líder del proyecto", "Desarrollador principal"],
      email: "fernandozarate.dev@gmail.com",
      instagram: "https://instagram.com/ferzarate",
      linkedin: "https://linkedin.com/in/ferzarate",
    },
    {
      name: "Nombre1 Apellido1",
      role: ["Co-fundador de Unexo", "Desarrollador Python", "Funcionalidades de IA"],
      email: "email1@ejemplo.com",
      instagram: "https://instagram.com/user1",
      linkedin: "https://linkedin.com/in/user1",
    },
    {
      name: "Nombre2 Apellido2",
      role: [
        "Co-fundador de Unexo",
        "Relaciones institucionales",
        "Negocios y estratégia",
        "Apoyo estratégico y logístico",
      ],
      email: "email2@ejemplo.com",
      instagram: "https://instagram.com/user2",
      linkedin: "https://linkedin.com/in/user2",
    },
    {
      name: "Nombre3 Apellido3",
      role: ["Co-fundador de Unexo", "Desarrollador web", "Asistencia y tareas operativas"],
      email: "email3@ejemplo.com",
      instagram: "https://instagram.com/user3",
      linkedin: "https://linkedin.com/in/user3",
    },
  ];

  return (
    <Flex w="100%" p={{ base: 6, md: 12 }} bgColor="gray.50" justify="center" flexDirection="column" gap="12">
      <Flex
        maxW="1200px"
        mx="auto"
        w="100%"
        bg="white"
        p={{ base: 6, md: 12 }}
        borderRadius="md"
        boxShadow="sm"
        flexDirection="column"
        gap="6">
        <Heading size="2xl" textAlign="center" mb={6}>
          Sobre Unexo
        </Heading>
        <Separator />

        <Box>
          <Heading size="lg" mb="2">
            Nuestra misión
          </Heading>
          <Text fontSize="sm" color="gray.600">
            Unexo es una plataforma creada para facilitar el acceso libre y equitativo al conocimiento académico en las
            universidades de San Juan. Fue fundada por un grupo de estudiantes apasionados por la educación y la
            colaboración, con la misión de fomentar una comunidad activa y participativa, donde los estudiantes
            compartan recursos y se apoyen mutuamente para alcanzar sus metas académicas. Buscamos promover el acceso
            libre y colaborativo a material académico, contribuyendo al éxito estudiantil a través de la tecnología y la
            innovación.
          </Text>
        </Box>

        <Box>
          <Heading size="lg" mb="2">
            Stack tecnológico
          </Heading>
          <Text fontSize="sm" color="gray.600">
            • Frontend: Next.js, React, Chakra UI. <br />
            • Backend: Node.js, Express, Prisma, MySQL. <br />
          </Text>
        </Box>

        <Box>
          <Heading size="lg" mb="3">
            Equipo
          </Heading>
          <Flex wrap="wrap" flexDirection={{ base: "column", md: "row" }} gap="3">
            {team.map((member) => (
              <Card.Root flex="1" w="100%" minW="200px" key={member.name} boxShadow="sm">
                <Card.Body>
                  <Flex mb="3" flexDirection="column" gap="3" alignItems="center">
                    <Avatar.Root size="2xl">
                      <Avatar.Image src="/404.svg" />
                      <Avatar.Fallback name={member.name} />
                    </Avatar.Root>
                    <Flex flexDirection="column" alignItems="center">
                      <Text fontWeight="semibold" textStyle="sm">
                        {member.name}
                      </Text>
                      <Text color="fg.muted" textStyle="sm">
                        {member.email}
                      </Text>
                    </Flex>
                  </Flex>
                  <Separator mb="3" />
                  <Card.Description>
                    {Array.isArray(member.role) ? (
                      <Flex flexDirection="column" gap="1">
                        {member.role.map((item, index) => (
                          <Text key={index} fontSize="sm" color="gray.600">
                            • {item}
                          </Text>
                        ))}
                      </Flex>
                    ) : (
                      <Text fontSize="sm" color="gray.600">
                        {member.role}
                      </Text>
                    )}
                  </Card.Description>
                </Card.Body>
                <Card.Footer gap="3">
                  {member.instagram && (
                    <IconButton as="a" href={member.instagram} target="_blank" aria-label="Instagram" variant="surface">
                      <FaInstagramSquare />
                    </IconButton>
                  )}
                  {member.email && (
                    <IconButton as="a" href={`mailto:${member.email}`} aria-label="Email" variant="surface">
                      <BiLogoGmail />
                    </IconButton>
                  )}
                  {member.linkedin && (
                    <IconButton as="a" href={member.linkedin} target="_blank" aria-label="LinkedIn" variant="surface">
                      <FaLinkedin />
                    </IconButton>
                  )}
                </Card.Footer>
              </Card.Root>
            ))}
          </Flex>
        </Box>
        <Box>
          <Heading size="lg" mb="3">
            Agradecimientos especiales
          </Heading>
          <Text fontSize="sm" color="gray.600" mb="2">
            Queremos expresar nuestro agradecimiento a quienes aportaron su apoyo, ideas y energía en distintas etapas
            del desarrollo de Unexo.
          </Text>
          <Text fontSize="sm" color="gray.600">
            En especial, agradecemos a:
          </Text>
          <Box as="ul" pl="5" mt="2" color="gray.600" fontSize="sm">
            <Text as="li"> ...</Text>
            <Text as="li"> ...</Text>
            <Text as="li"> ...</Text>
            <Text as="li"> ...</Text>
          </Box>
          <Text fontSize="sm" color="gray.600" mt="3">
            Gracias por confiar en este proyecto y ser parte de su crecimiento.
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
}
