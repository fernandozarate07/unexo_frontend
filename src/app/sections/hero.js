"use client";

import { Box, Heading, Text, Button, VStack, Link, Container } from "@chakra-ui/react";
import NextLink from "next/link";

export default function Hero() {
  return (
    <Box
      as="section"
      minH="calc(100vh - 80px)"
      maxW="1200px"
      mx="auto"
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      px={{ base: "4", md: "8" }}>
      <Container maxW="800px" mx="auto">
        <VStack gap="8">
          <Heading as="h1" fontSize={{ base: "4xl", md: "6xl" }} fontWeight="normal" lineHeight="1">
            Entre{" "}
            <Text as="span" fontWeight="extrabold" color="cyan.600">
              todos
            </Text>{" "}
            hacemos que estudiar sea más{" "}
            <Text as="span" fontWeight="extrabold" color="cyan.600">
              fácil.
            </Text>
          </Heading>

          <Text fontSize={{ base: "lg", md: "xl" }} color="gray.500">
            Subí y descargá material útil y ayudá a otros estudiantes como vos. Unexo es la red académica colaborativa
            para estudiantes de la UNSJ.
          </Text>

          <Link as={NextLink} focusRing="none" textDecoration="none" href="/register">
            <Button size="lg" colorPalette="cyan">
              Registrate gratis
            </Button>
          </Link>
        </VStack>
      </Container>
    </Box>
  );
}
