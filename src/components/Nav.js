"use client";

import { Box, Flex, HStack, Link, Button, ButtonGroup } from "@chakra-ui/react";
import NextLink from "next/link";
import NextImage from "next/image";

export default function Nav() {
  return (
    <Box as="nav" bg="white" boxShadow="sm" w="100%" position="sticky" top={0} zIndex="sticky">
      <Flex maxW="1200px" mx="auto" h="80px" align="center" justify="space-between">
        {/* Logo */}
        <NextLink href="/">
          <NextImage src="/unexo_logo_nav.svg" alt="Logo" width={160} height={80} />
        </NextLink>
        {/* Links */}
        <HStack gap="8">
          <Link as={NextLink} href="/" fontSize="l" fontWeight="medium" focusRing="none" textDecoration="none">
            Inicio
          </Link>
          <Link as={NextLink} href="/" fontSize="l" fontWeight="medium" focusRing="none" textDecoration="none">
            Sobre Unexo
          </Link>
          <ButtonGroup gap="4" fontSize="l" fontWeight="medium" focusRing="none" textDecoration="none">
            <Link as={NextLink} href="/">
              <Button variant="surface" width="full">
                Explora
              </Button>
            </Link>
            <Link as={NextLink} href="/login">
              <Button width="full">Iniciar sesión</Button>
            </Link>
          </ButtonGroup>
        </HStack>
      </Flex>
    </Box>
  );
}
