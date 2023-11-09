import "./globals.css";
import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import Footer from "@/components/ui/footer";
import { MyContextProvider } from "@/components/utils/myContext";
import { Toaster } from "react-hot-toast";
import Socket from "../components/utils/websockets";

export const metadata: Metadata = {
  title: "I-20 Processor",
  description: "One stop shop for all I-20 needs",
};

const font = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["italic", "normal"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MyContextProvider>
      <html lang="en">
        <body className={font.className}>
          {children}
          <Toaster />
          <Socket />
        </body>
      </html>
    </MyContextProvider>
  );
}
