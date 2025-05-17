import { Flex } from "@chakra-ui/react";
import { UserContributionsProvider } from "@/context/UserContributionsContext";
import UpdatePasswordSection from "@/components/sections/loginSecurity/UpdatePasswordSection";

export default function loginSecurity() {
  return (
    <UserContributionsProvider>
      <Flex
        w="100%"
        minH={{ base: "auto", md: "100vh" }}
        flexDirection="column"
        gap="6"
        p={{ base: "6", md: "12" }}
        bg="gray.50">
        <UpdatePasswordSection />
      </Flex>
    </UserContributionsProvider>
  );
}
