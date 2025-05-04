import {
  Flex,
  Link,
  Button,
  ButtonGroup,
  Separator,
  Menu,
  MenuItem,
  MenuPositioner,
  MenuContent,
  Icon,
  Text,
  IconButton,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";

export default function MenuBurger({ user }) {
  return (
    <Menu.Root
      positioning={{
        anchorPoint: { x: 0, y: 0 },
      }}>
      <Menu.Trigger display={{ base: "flex", md: "none" }} asChild focusRing="none">
        <IconButton as="button" rounded="full" overflow="hidden" cursor="pointer" border="none" variant="ghost">
          <GiHamburgerMenu />
        </IconButton>
      </Menu.Trigger>
      <MenuPositioner>
        <MenuContent display="flex" flexDirection="column" gap="3">
          <Flex flexDirection="column" border="1px solid" borderColor="gray.200" borderRadius="sm">
            <MenuItem borderRadius="none" bg="gray.200">
              <Text w="100%" fontWeight="bold" textAlign="center">
                Navegación
              </Text>
            </MenuItem>
            <Separator />
            <MenuItem>
              <Link as={NextLink} href="/" focusRing="none" textDecoration="none">
                Inicio
              </Link>
            </MenuItem>
          </Flex>
          {/* nexopoints */}
          <Flex flexDirection="column" border="1px solid" borderColor="gray.200" borderRadius="sm">
            <MenuItem borderRadius="none" bg="gray.200">
              <Text w="100%" fontWeight="bold" textAlign="center">
                Nexopoints
              </Text>
            </MenuItem>
            <MenuItem>
              <Flex w="100%" alignItems="center" justifyContent="center" borderColor="gray.200" borderRadius="md">
                {user.points}
              </Flex>
            </MenuItem>
          </Flex>
          {/* cta */}
          <Flex flexDirection="column" border="1px solid" borderColor="gray.200" borderRadius="sm">
            <MenuItem>
              <ButtonGroup display="flex" gap="3">
                <Link as={NextLink} href="/search" focusRing="none" textDecoration="none">
                  <Button variant="surface" width="full" borderRadius="md">
                    Explora
                  </Button>
                </Link>
                <Link as={NextLink} href="/contribution" focusRing="none" textDecoration="none">
                  <Button width="full" borderRadius="md" colorPalette="blue">
                    Aportar
                  </Button>
                </Link>
              </ButtonGroup>
            </MenuItem>
          </Flex>
        </MenuContent>
      </MenuPositioner>
    </Menu.Root>
  );
}
