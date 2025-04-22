"use client";

import { useNotifications } from "@/context/NotificationContext";
import {
  IconButton,
  Button,
  Badge,
  Text,
  Menu,
  MenuItem,
  MenuPositioner,
  MenuContent,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import { IoNotifications } from "react-icons/io5";
import { GrUpdate } from "react-icons/gr";

export default function NotificationBell() {
  const { notifications, loading, fetchNotifications, markAsRead, unreadCount } = useNotifications();

  return (
    <Menu.Root
      positioning={{
        anchorPoint: { x: 0, y: 0 },
      }}>
      <Menu.Trigger asChild position="relative" focusRing="none">
        <IconButton aria-label="Notificaciones" borderRadius="full" colorPalette="gray">
          <IoNotifications />
          {unreadCount > 0 && (
            <Badge
              position="absolute"
              top="-1"
              right="-1"
              color="white"
              fontSize="xs"
              borderRadius="full"
              px="1.5"
              bg="cyan.600">
              {unreadCount}
            </Badge>
          )}
        </IconButton>
      </Menu.Trigger>
      <MenuPositioner>
        <MenuContent maxH="400px" maxW="300px" display="flex" flexDirection="column" gap="3">
          {loading ? (
            <Spinner size="sm" />
          ) : notifications.length === 0 ? (
            <MenuItem>
              <Text textAlign="center">No tienes notificaciones.</Text>
            </MenuItem>
          ) : (
            <Flex pb="1" flexDirection="column" borderRadius="md" border="1px solid" borderColor="gray.200">
              <MenuItem borderTopRadius="sm" borderBottomRadius="none" bg="gray.200">
                <Text w="100%" fontWeight="bold" textAlign="center">
                  Notificaciones
                </Text>
              </MenuItem>
              {notifications.map((notif) => (
                <MenuItem
                  key={notif.id}
                  bg={notif.isRead ? "white" : "gray.100"}
                  p="3"
                  direction="column"
                  flex="1"
                  borderRadius="none"
                  cursor="pointer"
                  onClick={() => markAsRead(notif.id)}>
                  {notif.message}
                </MenuItem>
              ))}
            </Flex>
          )}
          <Button aria-label="Actualizar notificaciones" w="100%" focusRing="none" onClick={fetchNotifications}>
            <GrUpdate />
          </Button>
        </MenuContent>
      </MenuPositioner>
    </Menu.Root>
  );
}
