import { Flex } from "@chakra-ui/react";
import AccountProfile from "../sections/account/accountProfile";
import AccountContribution from "../sections/account/accountContribution";
import { UserContributionsProvider } from "@/context/UserContributionsContext";

export default function Account() {
  return (
    <UserContributionsProvider>
      <Flex w="100%" flexDirection="column" gap="6" p={{ base: "6", md: "12" }}>
        <AccountProfile />
        <AccountContribution />
      </Flex>
    </UserContributionsProvider>
  );
}
