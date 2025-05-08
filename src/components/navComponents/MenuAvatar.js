// components/AvatarMenu.js
"use client";

import {
  Box,
  Avatar,
  Menu,
  MenuItem,
  MenuPositioner,
  MenuContent,
  Separator,
  Text,
  Flex,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function AvatarMenu({ user, handleLogout }) {
  const router = useRouter();

  return (
    <Menu.Root
      positioning={{
        anchorPoint: { x: 0, y: 0 },
      }}>
      <Menu.Trigger asChild focusRing="none">
        <Box as="button" rounded="full" overflow="hidden" cursor="pointer" border="none" p="0">
          <Avatar.Root>
            <Avatar.Fallback name={user.name} />
            <Avatar.Image src={user.profilePhoto} />
          </Avatar.Root>
        </Box>
      </Menu.Trigger>
      <MenuPositioner>
        <MenuContent display="flex" flexDirection="column" gap="3">
          {/* cuenta */}
          <Flex flexDirection="column" border="1px solid" borderColor="gray.200" borderRadius="sm">
            <MenuItem borderRadius="none" bg="gray.200">
              <Text w="100%" fontWeight="bold" textAlign="center">
                Cuenta
              </Text>
            </MenuItem>
            <Separator />
            <MenuItem value="profile" onSelect={() => router.push("/account#accountProfile")} cursor="pointer">
              Mi perfil
            </MenuItem>
            <MenuItem
              value="contribution"
              onSelect={() => router.push("/account#accountContribution")}
              cursor="pointer">
              Mis Aportes
            </MenuItem>
            <MenuItem
              value="savedContribution"
              onSelect={() => router.push("/account#accountContribution")}
              cursor="pointer">
              Aportes guardados
            </MenuItem>
            <MenuItem
              value="downloadContribution"
              onSelect={() => router.push("/account#accountDownload")}
              cursor="pointer">
              Aportes descargados
            </MenuItem>
          </Flex>
          {/* Configuración */}
          <Flex flexDirection="column" border="1px solid" borderColor="gray.200" borderRadius="sm">
            <MenuItem borderRadius="none" bg="gray.200">
              <Text w="100%" fontWeight="bold" textAlign="center">
                Configuración
              </Text>
            </MenuItem>
            <Separator />
            <MenuItem value="session" onSelect={() => router.push("/userSessionSegurity")} cursor="pointer">
              Inicio de sesión y seguridad
            </MenuItem>
          </Flex>
          {/* cerrar sesión */}
          <Button w="100%" focusRing="none" onClick={handleLogout} colorPalette="blue">
            Cerrar sesión
          </Button>
        </MenuContent>
      </MenuPositioner>
    </Menu.Root>
  );
}
