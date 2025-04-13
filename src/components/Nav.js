"use client";

import {
  Box,
  Flex,
  HStack,
  Link,
  Button,
  ButtonGroup,
  Avatar,
  Menu,
  MenuItem,
  Portal,
  MenuPositioner,
  MenuContent,
  Separator,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import NextImage from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function Nav() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const avatarRef = useRef(null);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };
  return (
    <Box as="nav" bg="white" boxShadow="sm" w="100%" position="sticky" top="0" zIndex="sticky">
      <Flex maxW="1200px" mx="auto" h="80px" alignItems="center" justifyContent="space-between">
        {/* Logo */}
        <NextLink href="/">
          <NextImage src="/unexo_logo_nav.svg" alt="Logo" width={160} height={80} />
        </NextLink>

        {user ? (
          <Flex gap="6" alignItems="center">
            <Link as={NextLink} href="/" fontSize="l" fontWeight="medium" focusRing="none" textDecoration="none">
              Inicio
            </Link>
            <ButtonGroup gap="3">
              <Link as={NextLink} focusRing="none" textDecoration="none" href="/search">
                <Button variant="surface" width="full" borderRadius="md">
                  Explora
                </Button>
              </Link>
              <Link as={NextLink} focusRing="none" textDecoration="none" href="/contribute">
                <Button width="full" colorPalette="cyan" borderRadius="md">
                  Aportar
                </Button>
              </Link>
            </ButtonGroup>

            {/* Avatar con menú personalizado */}
            <Menu.Root
              positioning={{
                anchorPoint: { x: 0, y: 0 },
                offset: { mainAxis: 24, crossAxis: -90 },
              }}>
              <Menu.Trigger asChild>
                <Box ref={avatarRef} as="button" rounded="full" overflow="hidden" cursor="pointer" border="none" p="0">
                  <Avatar.Root>
                    <Avatar.Fallback name={user.name} />
                    <Avatar.Image src={user.profilePhoto} />
                  </Avatar.Root>
                </Box>
              </Menu.Trigger>
              <Portal>
                <MenuPositioner gap="3">
                  <MenuContent>
                    <MenuItem>Nexopoints: {user.points}</MenuItem>
                    <Separator />
                    <MenuItem value="profile" onSelect={() => router.push("/profile")} cursor="pointer">
                      Mi perfil
                    </MenuItem>
                    <MenuItem value="settings" onSelect={() => router.push("/settings")} cursor="pointer">
                      Configuración
                    </MenuItem>
                    <MenuItem value="logout" onSelect={handleLogout} cursor="pointer">
                      Cerrar sesión
                    </MenuItem>
                  </MenuContent>
                </MenuPositioner>
              </Portal>
            </Menu.Root>
          </Flex>
        ) : (
          <HStack gap="8">
            <Link as={NextLink} href="/" fontSize="l" fontWeight="medium" focusRing="none" textDecoration="none">
              Inicio
            </Link>
            <ButtonGroup gap="4">
              <Link as={NextLink} focusRing="none" textDecoration="none" href="/search">
                <Button variant="surface" width="full" borderRadius="md">
                  Explora
                </Button>
              </Link>
              <Link as={NextLink} focusRing="none" textDecoration="none" href="/login">
                <Button width="full" colorPalette="cyan" borderRadius="md">
                  Iniciar sesión
                </Button>
              </Link>
            </ButtonGroup>
          </HStack>
        )}
      </Flex>
    </Box>
  );
}
