"use client";
import { Flex } from "@chakra-ui/react";
import NextImage from "next/image";
import NextLink from "next/link";
import { useAuth } from "@/context/AuthContext";
import { NotificationProvider } from "@/context/NotificationContext";

import NavAdmin from "./NavAdmin";
import NavModerator from "./NavModerator";
import NavUser from "./NavUser";
import NavGuest from "./NavGuest";

const getNavComponent = (role) => {
  switch (role) {
    case "admin":
      return <NavAdmin />;
    case "moderator":
      return <NavModerator />;
    case "user":
      return <NavUser />;
    default:
      return <NavGuest />;
  }
};

export default function Nav() {
  const { user } = useAuth();
  const NavComponent = getNavComponent(user?.role);

  return (
    <NotificationProvider>
      <Flex
        as="nav"
        position="sticky"
        top="0"
        zIndex="sticky"
        w="100%"
        alignItems="center"
        justifyContent="center"
        bg="white"
        borderBottom="1px solid"
        borderColor="gray.200">
        <Flex maxW="1200px" mx="3" h="80px" alignItems="center" justifyContent="space-between" w="100%">
          {/* logo */}
          <NextLink href="/">
            <NextImage src="/unexo_logo_nav.svg" alt="Logo" width={120} height={60} />
          </NextLink>
          {/* Se renderiza el componente nav segun el rol */}
          {NavComponent}
        </Flex>
      </Flex>
    </NotificationProvider>
  );
}
