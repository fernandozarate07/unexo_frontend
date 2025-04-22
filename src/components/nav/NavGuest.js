import { Flex, Link, Button, ButtonGroup, Separator } from "@chakra-ui/react";
import NextLink from "next/link";

export default function NavGuest() {
  return (
    <Flex gap="3" alignItems="center">
      <Link as={NextLink} href="/" focusRing="none" textDecoration="none">
        Inicio
      </Link>
      <Separator orientation="vertical" height="12" />
      <ButtonGroup gap="3">
        <Link as={NextLink} href="/search" focusRing="none" textDecoration="none">
          <Button variant="surface" width="full" borderRadius="md">
            Explora
          </Button>
        </Link>
        <Link as={NextLink} href="/login" focusRing="none" textDecoration="none">
          <Button width="full" colorPalette="cyan" borderRadius="md">
            Iniciar sesión
          </Button>
        </Link>
      </ButtonGroup>
    </Flex>
  );
}
