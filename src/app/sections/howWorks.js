"use client";

import {
  Box,
  Heading,
  Text,
  VStack,
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
import NextLink from "next/link";
import { FaUserCheck, FaCheck, FaFileDownload } from "react-icons/fa";

export default function HowItWorks() {
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

  // Agrupar preguntas por categoría
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
    <Box as="section" maxW="100%" px={{ base: 4, md: 8 }} py={{ base: 6, md: 10 }} mx="auto">
      <Box
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        gap={{ base: 8, md: 12 }}
        maxW="1200px"
        mx="auto">
        {/* Paso a paso */}
        <Box
          flex="1"
          bg="white"
          p={{ base: 4, md: 6 }}
          borderRadius="md"
          display="flex"
          flexDirection="column"
          boxShadow="sm">
          <Heading size="lg" mb="6" textAlign="center">
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
                  <Box w="100" border="1px solid" borderColor="gray.200" borderRadius="md" p="6">
                    <VStack align="start" gap="6">
                      <TimelineTitle fontSize="xl">{step.title}</TimelineTitle>
                      <TimelineDescription fontSize="sm" color="gray.500">
                        {step.description}
                      </TimelineDescription>
                    </VStack>
                  </Box>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline.Root>
          <ButtonGroup w="100%" gap="6">
            <Link as={NextLink} focusRing="none" textDecoration="none" href="/" w="100%">
              <Button variant="surface" w="100%" borderRadius="full">
                Explora
              </Button>
            </Link>
            <Link as={NextLink} focusRing="none" textDecoration="none" href="/login" w="100%">
              <Button w="100%" colorPalette="cyan" borderRadius="full">
                Aporta
              </Button>
            </Link>
          </ButtonGroup>
        </Box>

        {/* Preguntas Frecuentes */}
        <Box
          flex="1.5"
          bg="white"
          p={{ base: 4, md: 6 }}
          borderRadius="md"
          display="flex"
          flexDirection="column"
          boxShadow="sm">
          <Heading size="lg" mb="6" textAlign="center">
            Preguntas Frecuentes
          </Heading>
          <Separator />

          <VStack align="stretch" gap="12" my="6">
            {Object.entries(groupedFaqs).map(([category, items]) => (
              <Box key={category}>
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
              </Box>
            ))}
          </VStack>
        </Box>
      </Box>
    </Box>
  );
}
