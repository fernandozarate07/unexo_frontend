import { UiProvider } from "@/components/ui/provider";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <UiProvider>
          <AuthProvider>
            <Nav />
            {children}
            <Footer />
          </AuthProvider>
        </UiProvider>
      </body>
    </html>
  );
}
