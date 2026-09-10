import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/components/ui/Toaster";
import TopBar from "@/components/store/TopBar";
import StoreHeader from "@/components/store/StoreHeader";
import CartModal from "@/components/store/CartModal";
import FloatingCart from "@/components/store/FloatingCart";

export default function TiendaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      <CartProvider>
        <TopBar />
        <StoreHeader />
        <main>{children}</main>
        <FloatingCart />
        <CartModal />
      </CartProvider>
    </ToastProvider>
  );
}
