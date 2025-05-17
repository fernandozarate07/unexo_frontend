import { Flex } from "@chakra-ui/react";
import { UserContributionsProvider } from "@/context/UserContributionsContext";
import AccountProfile from "@/components/sections/account/accountProfile";
import AccountContribution from "@/components/sections/account/accountContribution";
import AccountSavedContributions from "@/components/sections/account/accountSavedContributions";
import AccountDownloadContributions from "@/components/sections/account/accountDownloadContributions";

export default function Account() {
  return (
    <UserContributionsProvider>
      <Flex w="100%" flexDirection="column" gap="6" p={{ base: "6", md: "12" }} bg="gray.50">
        <AccountProfile />
        <AccountContribution />
        <AccountSavedContributions />
        <AccountDownloadContributions />
      </Flex>
    </UserContributionsProvider>
  );
}
