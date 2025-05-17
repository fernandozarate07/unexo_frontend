"use client";

import {
  Flex,
  Heading,
  Text,
  Accordion,
  Span,
  AccordionItem,
  AccordionItemTrigger,
  AccordionItemContent,
  AccordionItemBody,
  Separator,
} from "@chakra-ui/react";

/**
 * Componente TermsAndConditions
 * Página de Términos y Condiciones siguiendo estilo Chakra UI v3.
 *
 * @returns {JSX.Element} Página con los términos legales organizados en acordeones.
 */
export default function TermsAndConditions() {
  // Secciones de términos y condiciones
  const sections = [
    {
      title: "1. Aceptación de los Términos",
      content:
        "Al utilizar la plataforma Unexo, aceptás cumplir con estos términos y condiciones. Si no estás de acuerdo, te recomendamos no usar el servicio.",
    },
    {
      title: "2. Uso permitido",
      content:
        "La plataforma es para uso personal y académico. No está permitido utilizarla para actividades ilegales, comerciales no autorizadas o que infrinjan derechos de terceros.",
    },
    {
      title: "3. Registro y seguridad",
      content:
        "Sos responsable de mantener la confidencialidad de tu cuenta y contraseña. Informá inmediatamente cualquier uso no autorizado o irregularidad.",
    },
    {
      title: "4. Contenido generado por usuarios",
      content:
        "Los usuarios son responsables del contenido que suben. Unexo no se hace responsable por la veracidad ni por infracciones de derechos de autor.",
    },
    {
      title: "5. Propiedad intelectual",
      content:
        "El contenido y diseño de la plataforma son propiedad de Unexo y están protegidos por leyes de propiedad intelectual.",
    },
    {
      title: "6. Modificaciones al servicio",
      content: "Unexo puede modificar, suspender o discontinuar el servicio en cualquier momento sin previo aviso.",
    },
    {
      title: "7. Limitación de responsabilidad",
      content:
        "Unexo no será responsable por daños directos o indirectos derivados del uso o imposibilidad de uso del servicio.",
    },
    {
      title: "8. Ley aplicable y jurisdicción",
      content:
        "Estos términos se rigen por las leyes argentinas. Cualquier controversia será resuelta en los tribunales competentes de San Juan, Argentina.",
    },
    {
      title: "9. Contacto",
      content: "Para consultas sobre estos términos, podés contactarnos en contacto.unexo@gmail.com",
    },
  ];

  return (
    <Flex w="100%" p={{ base: 6, md: 12 }} bgColor="gray.50" justify="center">
      <Flex
        maxW="800px"
        w="100%"
        bg="white"
        p={{ base: 6, md: 12 }}
        borderRadius="md"
        boxShadow="sm"
        flexDirection="column"
        gap="3">
        <Heading size="2xl" textAlign="center" mb={6}>
          Términos y Condiciones
        </Heading>
        <Separator />

        <Accordion.Root type="multiple" collapsible>
          {sections.map(({ title, content }, i) => (
            <AccordionItem key={i} value={`section-${i}`} borderColor="gray.200" mb="4">
              <AccordionItemTrigger py="3" cursor="pointer">
                <Span flex="1" textAlign="start" fontWeight="medium">
                  {title}
                </Span>
                <Accordion.ItemIndicator />
              </AccordionItemTrigger>
              <AccordionItemContent>
                <AccordionItemBody pb="3">
                  <Text color="gray.500" fontSize="sm">
                    {content}
                  </Text>
                </AccordionItemBody>
              </AccordionItemContent>
            </AccordionItem>
          ))}
        </Accordion.Root>
      </Flex>
    </Flex>
  );
}
