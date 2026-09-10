import { getCategories } from "@/lib/catalog";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/components/ui/Toaster";
import Navbar from "@/components/store/Navbar";
import Footer from "@/components/store/Footer";
import CartDrawer from "@/components/store/CartDrawer";
import WhatsAppFab from "@/components/store/WhatsAppFab";

export default function TiendaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = getCategories();

  return (
    <ToastProvider>
      <CartProvider>
        <Navbar categories={categories} />
        <main>{children}</main>
        <Footer categories={categories} />
        <CartDrawer />
        <WhatsAppFab />
      </CartProvider>
    </ToastProvider>
  );
}
