import { Flex } from "@chakra-ui/react";
import { UserContributionsProvider } from "@/context/UserContributionsContext";
import AccountProfile from "@/components/sections/account/accountProfile";
import AccountContribution from "@/components/sections/account/accountContribution";
import AccountSavedContributions from "@/components/sections/account/accountSavedContributions";

export default function Account() {
  return (
    <UserContributionsProvider>
      <Flex w="100%" flexDirection="column" gap="6" p={{ base: "6", md: "12" }}>
        <AccountProfile />
        <AccountContribution />
        <AccountSavedContributions />
      </Flex>
    </UserContributionsProvider>
  );
}
