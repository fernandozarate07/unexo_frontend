// components/AvatarMenu.js
"use client";

import { Box, Avatar, Menu, MenuItem, MenuPositioner, MenuContent, Separator } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function AvatarMenu({ user, handleLogout }) {
  const router = useRouter();

  return (
    <Menu.Root
      positioning={{
        anchorPoint: { x: 0, y: 0 },
        offset: { mainAxis: 24, crossAxis: -90 },
      }}>
      <Menu.Trigger asChild>
        <Box as="button" rounded="full" overflow="hidden" cursor="pointer" border="none" p="0">
          <Avatar.Root>
            <Avatar.Fallback name={user.name} />
            <Avatar.Image src={user.profilePhoto} />
          </Avatar.Root>
        </Box>
      </Menu.Trigger>
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
    </Menu.Root>
  );
}
