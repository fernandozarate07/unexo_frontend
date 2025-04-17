// import { Flex, Separator, Link,Field, Heading, Button, Field, Input, Text } from "@chakra-ui/react";
// import NextLink from "next/link";

// export default function contribution() {
//   return (
//     <Flex justifyContent="center" w="100vw">
//       <Heading maxW="1200px" textAlign="center">
//         {/* Nuevo aporte */}
//       </Heading>
//       {/* Contenedor */}
//       <Flex maxW="1200px">
//         {/* Left */}
//         <Flex flex="1" flexDirection="column">
//           <Heading>Paso 1</Heading>
//           <Separator />
//           <Field.Root name="paso uno">
//                         {/* Tipo de aporte */}
//                           <NativeSelect.Root>
//                             <NativeSelect.Field
//                               name="type"
//                               value={selected.type}
//                               onChange={handleChange}
//                               focusRing="none"
//                               colorPalette="cyan"
//                               size={{ base: "sm", md: "md" }}
//                               borderRadius="md"
//                               bg="white">
//                               <option value="">Tipo de aporte</option>
//                               {data.types.map((type) => (
//                                 <option key={type.id} value={type.id}>
//                                   {type.name}
//                                 </option>
//                               ))}
//                             </NativeSelect.Field>
//                             <NativeSelect.Indicator />
//                           </NativeSelect.Root>
//               Tipo de aporte <Field.RequiredIndicator />
//               {errors.name && (
//                 <Text color="red.500" fontSize="xs">
//                   Ingresa un nombre valido
//                 </Text>
//               )}
//             </Field.Label>
//           </Field.Root>
//         </Flex>
//       </Flex>
//     </Flex>
//   );
// }
