"use client";

import { Field, Input, Button, Container, VStack, Heading, Text, Link } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import styles from "./page.module.css";
import NextLink from "next/link";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();

      if (!res.ok) {
        if (Array.isArray(responseData.errors)) {
          console.error("❌ Errores en registro:");
          responseData.errors.forEach((err) => console.error(`- ${err.param}: ${err.msg}`));
        } else {
          console.error("❌ Error en registro:", responseData.message);
        }
        return;
      }

      console.log("Usuario registrado:", responseData.user);
      // Redirige al login o muestra mensaje
      window.location.href = "/login";
    } catch (err) {
      console.error(" Error de conexión:", err);
    }
  };

  return (
    <div className={styles.register__page}>
      <Container
        maxW={{ base: "400px", md: "600px" }}
        py={10}
        centerContent
        borderWidth="1px"
        borderStyle="solid"
        borderRadius="md"
        borderColor="gray.200">
        <VStack as="form" gap="4" w="100%" onSubmit={handleSubmit(onSubmit)}>
          <Heading size="2xl">Crear cuenta</Heading>
          <Field.Root name="name">
            <Field.Label>
              Nombre <Field.RequiredIndicator />
            </Field.Label>
            <Input
              placeholder="Tu nombre"
              {...register("name", { required: true })}
              css={{ "--focus-color": "gray" }}
            />
            {errors.name && (
              <Text color="red.500" fontSize="xs">
                Ingresa un nombre valido
              </Text>
            )}
          </Field.Root>
          <Field.Root name="email">
            <Field.Label>
              Correo Electrónico <Field.RequiredIndicator />
            </Field.Label>
            <Input
              type="email"
              placeholder="ejemplo@correo.com"
              {...register("email", { required: true })}
              css={{ "--focus-color": "gray" }}
            />
            {errors.email && (
              <Text color="red.500" fontSize="xs">
                Ingresa un email valido
              </Text>
            )}
          </Field.Root>
          <Field.Root name="phone">
            <Field.Label>
              Teléfono <Field.RequiredIndicator />
            </Field.Label>
            <Input
              type="tel"
              placeholder="264XXXXXXX"
              {...register("phone", { required: true })}
              css={{ "--focus-color": "gray" }}
            />
            {errors.phone && (
              <Text color="red.500" fontSize="xs">
                Ingresa un numero de telefono valido
              </Text>
            )}
          </Field.Root>
          <Field.Root name="password">
            <Field.Label>
              Contraseña <Field.RequiredIndicator />
            </Field.Label>
            <Input
              type="password"
              placeholder="••••••••"
              {...register("password", {
                required: true,
                minLength: 6,
              })}
              css={{ "--focus-color": "gray" }}
            />
            {errors.password && (
              <Text color="red.500" fontSize="xs">
                La contraseña debe tener mínimo 6 caracteres
              </Text>
            )}
          </Field.Root>
          <Field.Root name="confirmPassword">
            <Field.Label>
              Confirmar Contraseña <Field.RequiredIndicator />
            </Field.Label>
            <Input
              type="password"
              placeholder="Repite la contraseña"
              {...register("confirmPassword", {
                required: true,
                validate: (value) => value === password || "Las contraseñas no coinciden",
              })}
              css={{ "--focus-color": "gray" }}
            />
            {errors.confirmPassword && (
              <Text color="red.500" fontSize="xs">
                {errors.confirmPassword.message}
              </Text>
            )}
          </Field.Root>
          <Button type="submit" colorPalette="cyan">
            Registrate
          </Button>
          <Text fontSize="sm">
            ¿Ya tienes cuenta?{" "}
            <Link as={NextLink} fontWeight="800" focusRing="none" textDecoration="none" href="/login" color="cyan.600">
              Iniciar sesión
            </Link>
          </Text>
        </VStack>
      </Container>
    </div>
  );
}
