"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import FinanceContextProvider from "@/lib/store/finance-context";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FinanceContextProvider>
          <Navigation />
          { children }
        </FinanceContextProvider>
      </body>
    </html>
  );
}
