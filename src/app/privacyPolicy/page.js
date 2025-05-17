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
 * Componente PrivacyPolicy
 * Página de Política y Privacidad siguiendo estilo Chakra UI v3.
 *
 * @returns {JSX.Element} Página con información legal organizada en acordeones.
 */
export default function PrivacyPolicy() {
  // Secciones de la política y privacidad
  const sections = [
    {
      title: "1. Introducción",
      content:
        "En Unexo valoramos tu privacidad y nos comprometemos a proteger tus datos personales conforme a la legislación vigente.",
    },
    {
      title: "2. Información que recopilamos",
      content:
        "Recopilamos información que tú nos proporcionas directamente, como tu nombre, correo electrónico y datos de uso cuando interactúas con la plataforma.",
    },
    {
      title: "3. Uso de la información",
      content:
        "Utilizamos la información para mejorar la experiencia, gestionar cuentas, enviar notificaciones importantes y cumplir con obligaciones legales.",
    },
    {
      title: "4. Compartir datos con terceros",
      content:
        "No vendemos ni alquilamos tus datos personales. Podemos compartir información con proveedores de servicios confiables para el funcionamiento de la plataforma.",
    },
    {
      title: "5. Seguridad de los datos",
      content:
        "Implementamos medidas técnicas y organizativas para proteger tus datos frente a accesos no autorizados, pérdida o alteración.",
    },
    {
      title: "6. Tus derechos",
      content:
        "Podés acceder, rectificar o solicitar la eliminación de tus datos en cualquier momento contactándonos a través de los medios disponibles.",
    },
    {
      title: "7. Cambios en la política",
      content:
        "Podemos actualizar esta política para reflejar cambios legales o mejoras en la plataforma. Te notificaremos cuando esto ocurra.",
    },
    {
      title: "8. Contacto",
      content: "Si tenés dudas o consultas sobre esta política, podés contactarnos en contacto.unexo@gmail.com",
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
          Política y Privacidad
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
