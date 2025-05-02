"use client"; // Este archivo se ejecuta en el cliente (React Client Component de Next.js)

// Importaciones de componentes de Chakra UI y librerías necesarias
import {
  Flex,
  Heading,
  Text,
  Button,
  Icon,
  Separator,
  Accordion,
  Span,
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineIndicator,
  TimelineContent,
  TimelineTitle,
  TimelineDescription,
  TimelineSeparator,
  ButtonGroup,
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link"; // Navegación sin recarga
import { FaUserCheck, FaCheck, FaFileDownload } from "react-icons/fa"; // Íconos representativos para los pasos

/**
 * Componente HowItWorks
 * Muestra los pasos iniciales para usar la plataforma Unexo y una sección de preguntas frecuentes.
 *
 * @returns {JSX.Element} Interfaz que explica cómo funciona Unexo y resuelve dudas comunes.
 */
export default function HowItWorks() {
  /**
   * Pasos iniciales para que el usuario entienda cómo funciona la plataforma.
   * Cada paso incluye un título, descripción y un ícono.
   */
  const steps = [
    {
      title: "Registrate",
      description: "Creá tu cuenta y recibí 5 nexopoints de bienvenida para empezar a descargar aportes.",
      icon: FaUserCheck,
    },
    {
      title: "Aporta",
      description:
        "Subí material útil y ganá 5 nexopoints por cada aporte, más 1 punto extra por cada me gusta que reciba.",
      icon: FaCheck,
    },
    {
      title: "Descargá",
      description: "Usá tus nexopoints para acceder gratis a cualquier aporte compartido por otros estudiantes.",
      icon: FaFileDownload,
    },
  ];

  /**
   * Datos en bruto de preguntas frecuentes, organizadas por categoría.
   * Se agrupan más adelante para renderizar por sección.
   */
  const rawFaqs = [
    { category: "Unexo" },
    {
      question: "¿Qué es un nexopoint?",
      answer:
        "Es una unidad virtual que te permite descargar aportes de otros estudiantes. Su objetivo es fomentar la participación activa en la comunidad.",
    },
    {
      question: "¿Para qué sirven los nexopoints?",
      answer: "Se utilizan para acceder a material académico compartido por otros usuarios dentro de la plataforma.",
    },
    {
      question: "¿Cómo gano nexopoints?",
      answer:
        "Subiendo aportes ganás 5 nexopoints por publicación, y obtenés 1 punto adicional por cada 'me gusta' que reciba tu contenido.",
    },

    { category: "Moderación" },
    {
      question: "¿Qué tipo de contenido está permitido subir?",
      answer:
        "Se permite compartir resúmenes, modelos de examen, apuntes, y material sin derechos de autor, propio o autorizado por su creador.",
    },
    {
      question: "¿Qué hago si encuentro contenido inapropiado?",
      answer: "Podés reportarlo desde la misma publicación. Nuestro equipo lo revisará lo antes posible.",
    },

    { category: "Filosofía" },
    {
      question: "¿Quién está detrás de Unexo?",
      answer:
        "Unexo fue creado por Fernando Zárate, estudiante de TUPW. Podés contactarlo desde su web www.fernandozarate.website",
    },
    {
      question: "¿Por qué se creó esta plataforma?",
      answer:
        "Para facilitar el acceso libre y equitativo al conocimiento académico, promover la colaboración estudiantil y contribuir a una mayor tasa de egreso.",
    },
  ];

  // Agrupamos las preguntas frecuentes por categoría
  const groupedFaqs = {};
  let currentCategory = "";

  rawFaqs.forEach((item) => {
    if (item.category) {
      currentCategory = item.category;
      groupedFaqs[currentCategory] = [];
    } else if (currentCategory) {
      groupedFaqs[currentCategory].push(item);
    }
  });

  return (
    <Flex w="100%" p={{ base: 6, md: 12 }}>
      <Flex maxW="1200px" mx="auto" flexDirection={{ base: "column", md: "row" }} gap={{ base: 6, md: 12 }}>
        {/* Sección de primeros pasos */}
        <Flex
          flex="1"
          bg="white"
          p={{ base: 3, md: 6 }}
          borderRadius="md"
          display="flex"
          flexDirection="column"
          boxShadow="sm">
          <Heading size="xl" mb="6" textAlign="center">
            Primeros Pasos
          </Heading>
          <Separator />
          <Timeline.Root gap={{ base: 6, md: 12 }} my="4">
            {steps.map((step, index) => (
              <TimelineItem key={index}>
                <TimelineConnector>
                  <TimelineSeparator />
                  <TimelineIndicator boxSize="6" bg="cyan.600">
                    <Icon as={step.icon} color="white" />
                  </TimelineIndicator>
                </TimelineConnector>
                <TimelineContent>
                  <Flex w="100" border="1px solid" borderColor="gray.200" borderRadius="md" p="6">
                    <Flex flexDirection="column" gap="6">
                      <TimelineTitle fontSize="xl">{step.title}</TimelineTitle>
                      <TimelineDescription fontSize="sm" color="gray.500">
                        {step.description}
                      </TimelineDescription>
                    </Flex>
                  </Flex>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline.Root>

          {/* Botones de acción */}
          <ButtonGroup w="100%" gap="6">
            <Link as={NextLink} focusRing="none" textDecoration="none" href="/" w="100%">
              <Button variant="surface" w="100%" borderRadius="md">
                Explora
              </Button>
            </Link>
            <Link as={NextLink} focusRing="none" textDecoration="none" href="/login" w="100%">
              <Button w="100%" colorPalette="cyan" borderRadius="md">
                Aporta
              </Button>
            </Link>
          </ButtonGroup>
        </Flex>

        {/* Sección de preguntas frecuentes */}
        <Flex flex="1.5" bg="white" p={{ base: 3, md: 6 }} flexDirection="column" boxShadow="sm" borderRadius="md">
          <Heading size="xl" mb="6" textAlign="center">
            Preguntas Frecuentes
          </Heading>
          <Separator />

          <Flex flexDirection="column" align="stretch" gap="12" my="6">
            {Object.entries(groupedFaqs).map(([category, items]) => (
              <Flex flexDirection="column" key={category}>
                <Text fontSize="sm" color="gray.500" fontWeight="semibold" mb="2" pl="1">
                  {category}
                </Text>

                <Accordion.Root type="multiple" collapsible>
                  {items.map((faq, index) => (
                    <Accordion.Item key={index} value={`${category}-${index}`} borderColor="gray.200" mb="3">
                      <Accordion.ItemTrigger py="3" cursor="pointer">
                        <Span flex="1" textAlign="start" fontWeight="medium">
                          {faq.question}
                        </Span>
                        <Accordion.ItemIndicator />
                      </Accordion.ItemTrigger>
                      <Accordion.ItemContent>
                        <Accordion.ItemBody pb="3">
                          <Text color="gray.500" fontSize="sm">
                            {faq.answer}
                          </Text>
                        </Accordion.ItemBody>
                      </Accordion.ItemContent>
                    </Accordion.Item>
                  ))}
                </Accordion.Root>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
