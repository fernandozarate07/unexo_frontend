"use client";
import { Box, Flex, Text, Stack, HStack, VStack, Link, IconButton } from "@chakra-ui/react";
// import { Icon } from "@chakra-ui/icons";
import { FaInstagram } from "react-icons/fa";
import NextImage from "next/image";
import NextLink from "next/link";

export default function Footer() {
  return (
    <Flex as="footer" px="6" py="12" bg="white" boxShadow="sm" align="center" justifyContent="center" w="100%">
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="flex-start"
        gap="12"
        maxW="1200px"
        w="100%">
        {/* Izquierda */}
        <Stack spacing="6">
          <Stack spacing="2">
            <Link as={NextLink} href="/about" focusRing="none" textDecoration="none">
              Sobre Unexo
            </Link>
            <Link as={NextLink} href="/privacyPolicy" focusRing="none" textDecoration="none">
              Política de privacidad
            </Link>
            <Link as={NextLink} href="/termsConditions" focusRing="none" textDecoration="none">
              Términos y condiciones
            </Link>
          </Stack>
          <HStack gap="3">
            <IconButton
              type="submit"
              aria-label="Instagram"
              color="gray.200"
              borderRadius="full"
              colorPalette="cyan"
              size="sm">
              <FaInstagram />
            </IconButton>{" "}
          </HStack>
          <Text>
            Contactanos a{" "}
            <Link
              href="mailto:unexoapp@gmail.com"
              aria-label="enviar email a unexoapp@gmail.com"
              focusRing="none"
              textDecoration="none"
              fontWeight="bold">
              unexoapp@gmail.com
            </Link>
          </Text>
        </Stack>
        {/* Derecha */}
        <Flex h="full" flexDirection="column" alignItems="center" justifyContent="space-between">
          <NextImage src="/unexo_logo.svg" alt="Logo" width={100} height={100} />
          <Text fontSize="sm">
            © 2025 - Hecho con cariño por{" "}
            <Link
              href="https://www.instagram.com/zarate.fernando.delvalle"
              aria-label="Instagram del desarrollador de la app"
              focusRing="none"
              textDecoration="none"
              fontWeight="bold">
              Fernando Zárate
            </Link>{" "}
          </Text>{" "}
        </Flex>
      </Flex>
    </Flex>
  );
}
