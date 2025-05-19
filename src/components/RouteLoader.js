"use client";

import { Flex, Spinner } from "@chakra-ui/react";
import { useLoading } from "@/context/LoadingContext";

const RouteLoader = () => {
  const { loadingPage } = useLoading();

  if (!loadingPage) return null;

  return (
    <Flex
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      bg="gray.50"
      justify="center"
      align="center"
      zIndex="overlay">
      <Spinner size="xl" />
    </Flex>
  );
};

export default RouteLoader;
