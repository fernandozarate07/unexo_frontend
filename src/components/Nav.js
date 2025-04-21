"use client";
import { NotificationProvider } from "@/context/NotificationContext";

import { Box, Flex, HStack, Link, Button, ButtonGroup, Separator } from "@chakra-ui/react";
import NextLink from "next/link";
import NextImage from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import MenuUser from "@/components/navComponents/menuUser";
import NotificationBell from "./navComponents/NotificationBell";

export default function Nav() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <NotificationProvider>
      {/* Envuelve el Nav con el NotificationProvider */}
      <Box as="nav" bg="white" boxShadow="sm" w="100%" position="sticky" top="0" zIndex="sticky">
        <Flex maxW="1200px" mx="auto" h="80px" alignItems="center" justifyContent="space-between">
          {/* Logo */}
          <NextLink href="/">
            <NextImage src="/unexo_logo_nav.svg" alt="Logo" width={120} height={60} />
          </NextLink>

          {user ? (
            <Flex gap="6" alignItems="center">
              <Link as={NextLink} href="/" fontSize="l" fontWeight="medium" focusRing="none" textDecoration="none">
                Inicio
              </Link>
              <Separator orientation="vertical" height="12" />
              <ButtonGroup gap="3">
                <Link as={NextLink} focusRing="none" textDecoration="none" href="/search">
                  <Button variant="surface" width="full" borderRadius="md">
                    Explora
                  </Button>
                </Link>
                <Link as={NextLink} focusRing="none" textDecoration="none" href="/contribution">
                  <Button width="full" colorPalette="cyan" borderRadius="md">
                    Aportar
                  </Button>
                </Link>
              </ButtonGroup>
              <Separator orientation="vertical" height="12" />
              {/* Notification bell */}
              <NotificationBell />
              <Separator orientation="vertical" height="12" />
              {/* Menu user*/}
              <MenuUser user={user} handleLogout={handleLogout} />
            </Flex>
          ) : (
            <HStack gap="8">
              <Link as={NextLink} href="/" fontSize="l" fontWeight="medium" focusRing="none" textDecoration="none">
                Inicio
              </Link>
              <Separator orientation="vertical" height="12" />
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
    </NotificationProvider>
  );
}
