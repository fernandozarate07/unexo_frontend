"use client";

import { Field, Input, Button, Container, VStack, Heading, Text, Link } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import styles from "./page.module.css";
import NextLink from "next/link";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Iniciando sesión:", data);
  };

  return (
    <div className={styles.login__page}>
      <Container
        maxW={{ base: "400px", md: "600px" }}
        py={10}
        centerContent
        borderWidth="1px"
        borderStyle="solid"
        borderRadius="8px"
        borderColor="gray.200">
        <VStack as="form" gap="4" w="100%" onSubmit={handleSubmit(onSubmit)}>
          <Heading size="2xl">Iniciar sesión</Heading>

          <Field.Root name="email">
            <Field.Label>
              Correo Electrónico <Field.RequiredIndicator />
            </Field.Label>
            <Input type="email" placeholder="ejemplo@correo.com" {...register("email", { required: true })} />
            {errors.email && (
              <Text color="red.500" fontSize="xs">
                Ingresa un email válido
              </Text>
            )}
          </Field.Root>

          <Field.Root name="password">
            <Field.Label>
              Contraseña <Field.RequiredIndicator />
            </Field.Label>
            <Input type="password" placeholder="••••••••" {...register("password", { required: true })} />
            {errors.password && (
              <Text color="red.500" fontSize="xs">
                Ingresa tu contraseña
              </Text>
            )}

            <Link
              fontWeight="800"
              fontSize="sm"
              focusRing="none"
              textDecoration="none"
              href="/register"
              color="cyan.600">
              ¿Olvidaste tu contraseña?{" "}
            </Link>
          </Field.Root>

          <Button type="submit" colorPalette="cyan" borderRadius="full">
            Iniciar sesión
          </Button>

          <Text fontSize="sm">
            ¿Eres nuevo?{" "}
            <Link
              as={NextLink}
              fontWeight="800"
              focusRing="none"
              textDecoration="none"
              href="/register"
              color="cyan.600">
              Regístrate
            </Link>
          </Text>
        </VStack>
      </Container>
    </div>
  );
}
