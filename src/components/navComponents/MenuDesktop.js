import { Flex, Link, Button, ButtonGroup, Separator } from "@chakra-ui/react";
import NextLink from "next/link";

export default function MenuDesktop({ user }) {
  return (
    <Flex display={{ base: "none", md: "flex" }} gap="3" alignItems="center">
      <Flex alignItems="center" gap="6">
        <Link as={NextLink} href="/" focusRing="none" textDecoration="none">
          Inicio
        </Link>
        <Link as={NextLink} href="/about" focusRing="none" textDecoration="none">
          Sobre Unexo
        </Link>
      </Flex>
      <Separator orientation="vertical" height="12" />
      <ButtonGroup gap="3">
        <Link as={NextLink} href="/search" focusRing="none" textDecoration="none">
          <Button variant="surface" width="full" borderRadius="md">
            Explora
          </Button>
        </Link>
        <Link as={NextLink} href="/contribution" focusRing="none" textDecoration="none">
          <Button width="full" borderRadius="md">
            Aportar
          </Button>
        </Link>
      </ButtonGroup>
      <Separator orientation="vertical" height="12" />
      <Flex px="3" py="2" border="1px solid" borderColor="gray.200" borderRadius="md">
        Nexopoints: {user.points}
      </Flex>
    </Flex>
  );
}
