"use client";

import { Field, Input, Button, Container, VStack, Heading, Text, Link } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import styles from "./page.module.css";
import NextLink from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function LoginForm() {
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState(""); // Estado para el mensaje de error

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();
      console.log("Login result:", result);

      if (res.ok) {
        login(result.user);
        // Redirigir al home o dashboard
        window.location.href = "/";
      } else {
        console.error("Error en login:", result.message);
        // Mostrar el mensaje de error
        setErrorMessage(result.message || "Error al iniciar sesión.");
      }
    } catch (err) {
      console.error("ERROR: Error al iniciar sesión:", err);
      setErrorMessage("Hubo un problema con la conexión. Intenta nuevamente.");
    }
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
              color="blue.600">
              ¿Olvidaste tu contraseña?
            </Link>
            {/* Mostrar el mensaje de error si existe */}
            {errorMessage && (
              <Text w="100%" color="red.600" fontSize="xs" textAlign="center">
                {errorMessage}
              </Text>
            )}
          </Field.Root>
          <Button type="submit" colorPalette="blue" borderRadius="md">
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
              color="blue.600">
              Regístrate
            </Link>
          </Text>
        </VStack>
      </Container>
    </div>
  );
}
