// Importamos el módulo de estilos CSS correspondiente a la página
// import Image from "next/image"; // Imagen optimizada con Next.js (comentada porque no se está utilizando en este momento)
import styles from "./page.module.css"; // Módulo CSS para aplicar estilos a los elementos de la página
import Hero from "@/components/sections/landing/hero"; // Componente de la sección "Hero", probablemente contiene un encabezado o presentación destacada.
import HowWorks from "@/components/sections/landing/howWorks"; // Componente de la sección "How it Works", donde se explica el funcionamiento de la aplicación.

/**
 * Componente principal de la página de inicio (Home), que representa la estructura básica de la página,
 * incluyendo las secciones "Hero" y "How it Works".
 *
 * @returns {JSX.Element} La estructura de la página de inicio, con las secciones importadas.
 */
export default function Home() {
  return (
    <div className={styles.page}>
      {/* Contenedor principal con la clase de estilo 'page' */}
      <main className={styles.main}>
        {/* Sección "Hero" que generalmente contiene un mensaje destacado o llamada a la acción */}
        <Hero />
        {/* Sección "How it Works" que explica cómo funciona la aplicación o servicio */}
        <HowWorks />
      </main>
    </div>
  );
}
