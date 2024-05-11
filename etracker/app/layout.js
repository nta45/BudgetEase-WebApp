"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import BudgetContextProvider from "@/lib/store/budget-context";
import AuthContextProvider from "@/lib/store/auth-context";
import useThemeStore from "@/lib/store/themeStore";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  // const { user, loading, logout } = useContext(authContext);
  const theme = useThemeStore((state) => state.theme);

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="https://cdn0.iconfinder.com/data/icons/expenses-vs-income/30/__money_transaction_transfer_send-512.png" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />
        <title>Expense Tracker</title>
      </head>
      <body className={inter.className} >
        <AuthContextProvider>
          <div className={`h-screen w-screen ${theme ? "bg-slate-800 text-white " : ""}`}>
            <BudgetContextProvider>
              <Header />
              {children}
              <Footer />
            </BudgetContextProvider>
          </div>
        </AuthContextProvider>
      </body>
    </html>
  );
}
