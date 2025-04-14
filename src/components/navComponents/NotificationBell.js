"use client";

import { useState } from "react";
import { useNotifications } from "@/context/NotificationContext";
import { IconButton, Badge, Flex, Box, Text, Separator } from "@chakra-ui/react";
import { IoNotifications } from "react-icons/io5";
import { GrUpdate } from "react-icons/gr";

export default function NotificationBell() {
  const { notifications, loading, fetchNotifications, markAsRead, unreadCount } = useNotifications();

  const [open, setOpen] = useState(false);

  const togglePanel = () => setOpen(!open);

  return (
    <Flex alignItems="center" position="relative">
      <IconButton onClick={togglePanel} aria-label="Notificaciones" variant="ghost" position="relative">
        <IoNotifications />
      </IconButton>
      {unreadCount > 0 && (
        <Badge
          position="absolute"
          top="0"
          right="0"
          color="white"
          fontSize="xs"
          borderRadius="full"
          px="1.5"
          py="0.5"
          bg="cyan.600">
          {unreadCount}
        </Badge>
      )}

      {open && (
        <Flex
          position="absolute"
          top="64px"
          right="0"
          w="246px"
          direction="column"
          gap="3"
          bg="white"
          boxShadow="md"
          borderRadius="md"
          overflowY="auto"
          zIndex="20"
          p="2">
          {loading ? (
            <Box textAlign="center">Cargando...</Box>
          ) : notifications.length === 0 ? (
            <Box textAlign="center">No tienes notificaciones.</Box>
          ) : (
            notifications.map((notif) => (
              <Flex
                minH="40px"
                h="auto"
                key={notif.id}
                bg={notif.isRead ? "white" : "gray.100"}
                py="3"
                px="3"
                borderRadius="md"
                cursor="pointer"
                direction="column"
                onClick={() => markAsRead(notif.id)}>
                <Text fontSize="xs">{notif.message}</Text>
              </Flex>
            ))
          )}
          <Separator />
          <IconButton
            aria-label="Actualizar notificaciones"
            minH="40px"
            w="100%"
            variant="subtle"
            onClick={fetchNotifications}>
            <GrUpdate />
          </IconButton>
        </Flex>
      )}
    </Flex>
  );
}
