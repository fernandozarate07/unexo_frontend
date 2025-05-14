import { Flex, Link, Button, ButtonGroup, Separator } from "@chakra-ui/react";
import NextLink from "next/link";

export default function MenuDesktop({ user }) {
  return (
    <Flex display={{ base: "none", md: "flex" }} gap="3" alignItems="center">
      <Flex alignItems="center" gap="6">
        <Link
          as={NextLink}
          href="/"
          focusRing="none"
          _focus={{ boxShadow: "none" }}
          textDecoration="none"
          _hover={{ color: "blue.600" }}>
          Inicio
        </Link>
      </Flex>
      <ButtonGroup gap="3">
        <Link as={NextLink} href="/contribution" focusRing="none" textDecoration="none">
          <Button width="fit" borderRadius="md" colorPalette="blue">
            Aportar
          </Button>
        </Link>
        <Link as={NextLink} href="/search" focusRing="none" textDecoration="none">
          <Button variant="surface" width="fit" borderRadius="md">
            Explorá
          </Button>
        </Link>
      </ButtonGroup>
    </Flex>
  );
}
