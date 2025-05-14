import { Flex, Separator } from "@chakra-ui/react";
import { useAuth } from "@/context/AuthContext";

import MenuDesktop from "../navComponents/MenuDesktop";
import MenuAvatar from "../navComponents/MenuAvatar";
import NotificationBell from "../navComponents/NotificationBell";
import MenuBurger from "../navComponents/MenuBurger";

export default function NavGuest() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };
  return (
    <Flex gap="3" alignItems="center">
      <MenuDesktop user={user} />
      <MenuBurger user={user} />
      <NotificationBell />
      <MenuAvatar user={user} handleLogout={handleLogout} />
    </Flex>
  );
}
