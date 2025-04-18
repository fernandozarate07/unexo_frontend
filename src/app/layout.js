// Importamos los proveedores necesarios para la gestión del estado global de la UI y la autenticación
import { UiProvider } from "@/components/ui/provider"; // Proveedor para la interfaz de usuario, probablemente gestiona temas, diseño y configuraciones visuales.
import Nav from "@/components/Nav"; // Componente de navegación que se muestra en la parte superior de cada página.
import Footer from "@/components/Footer"; // Componente de pie de página que se muestra al final de cada página.
import { AuthProvider } from "@/context/AuthContext"; // Proveedor de contexto de autenticación, gestiona el estado de inicio de sesión y el acceso del usuario.

/**
 * Componente principal de la estructura de la aplicación, que envuelve la interfaz de usuario
 * con los proveedores necesarios para gestionar la autenticación y la configuración global de la UI.
 *
 * @param {Object} props - Propiedades recibidas por el componente.
 * @param {React.ReactNode} props.children - Los elementos hijos que se renderizan dentro de la estructura de la página (por ejemplo, contenido de las páginas).
 *
 * @returns {JSX.Element} Componente que representa la estructura base de la aplicación, con la navegación, contenido y pie de página.
 */
export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      {" "}
      {/* Asegura que Next.js maneje la hidratación correctamente en el lado del cliente */}
      <body>
        {/* Proveedor para la configuración global de la UI */}
        <UiProvider>
          {/* Proveedor para gestionar el estado de autenticación del usuario */}
          <AuthProvider>
            {/* Componente de navegación */}
            <Nav />
            {/* Aquí se renderiza el contenido de las páginas (children) */}
            {children}
            {/* Componente de pie de página */}
            <Footer />
          </AuthProvider>
        </UiProvider>
      </body>
    </html>
  );
}
