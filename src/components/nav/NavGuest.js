import { Flex, Link, Button, ButtonGroup, Separator } from "@chakra-ui/react";
import NextLink from "next/link";

export default function NavGuest() {
  return (
    <Flex gap="3" alignItems="center">
      <Link
        as={NextLink}
        href="/"
        focusRing="none"
        _focus={{ boxShadow: "none" }}
        textDecoration="none"
        _hover={{ color: "blue.600" }}>
        Inicio
      </Link>
      <Separator orientation="vertical" height="12" />
      <ButtonGroup gap="3">
        <Link as={NextLink} href="/login" focusRing="none" textDecoration="none">
          <Button variant="surface" width="full" borderRadius="md">
            Iniciar sesión
          </Button>
        </Link>
        <Link as={NextLink} href="/register" focusRing="none" textDecoration="none">
          <Button width="full" colorPalette="blue" borderRadius="md">
            Registrate
          </Button>
        </Link>
      </ButtonGroup>
    </Flex>
  );
}
