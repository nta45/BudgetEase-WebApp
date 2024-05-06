"use client";
import { Inter } from "next/font/google";
import SettingsIcon from '@mui/icons-material/Settings';
import { useState, useEffect, useContext } from "react";
import "./globals.css";
import FinanceContextProvider from "@/lib/store/finance-context";
import Modal from "@/components/Modal";
import { authContext } from "@/lib/store/auth-context";
import AuthContextProvider from "@/lib/store/auth-context";
import SignIn from "@/components/signIn";

const inter = Inter({ subsets: ["latin"] });
var date = new Date();

export default function RootLayout({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [SettingmodalOpen, setSettingModalOpen] = useState(false);
  const { user, loading, logout } = useContext(authContext);

  useEffect(() => {
    if (localStorage.getItem("darkMode") === "true") {
      setDarkMode(true);
    }

    // if (!user) {
    //   return (<html lang="en">
    //     <body className={inter.className}>
    //       <div className={`min-h-[100vh] ${darkMode ? "bg-slate-800 text-white " : ""}`}>
    //         <SignIn />
    //       </div>
    //     </body>
    //   </html>) 
    // }
  }, []);


  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <div className={`min-h-[100vh] ${darkMode ? "bg-slate-800 text-white " : ""}`}>
            <FinanceContextProvider>
              {SettingmodalOpen && (
                <Modal show={SettingmodalOpen} onClose={setSettingModalOpen} />
              )}
              <header className={`container mx-auto max-w-full box-border border-2 border-transparent " ${darkMode ? "bg-black text-white " : "bg-slate-500"}`} >
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl normalcase font-bold px-5 py-5">ExpenseTracker</h1>
                  <div className='flex items-center'>
                    <button onClick={() => setSettingModalOpen({ val: true, name: 'Settings' })}><SettingsIcon fontSize="large" className='icon' /></button>
                    <div className="flex flex-col items-center gap-1 pt-2">
                      <img className="h-[3em] w-[3em] rounded-full overflow-hidden" src={user} alt="Profile Picture" />
                      <small className="box-border h-8 w-40 border-1 text-[1em] text-center">{user}</small>
                    </div>
                  </div>
                </div>
              </header>
              {children}
              <footer className={`fixed bottom-0 left-0 w-full  p-4 body-font ${darkMode ? "bg-black text-white " : "bg-slate-500 text-white"}`}>
                <div className="container px-5 py-2 mx-auto flex items-center sm:flex-row flex-col">
                  <a className="flex title-font font-medium items-center md:justify-start justify-center " href='https://github.com/nta45'>
                    <img className="rounded-full w-[2em] h-[2em]" src="https://avatars.githubusercontent.com/u/96786143?v=4" alt="nta45" />
                    <span className="ml-3 text-xl">nta45</span></a>
                  <p style={{ color: 'white' }} className="title-font font-medium text-xl inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
                    Date: {date.toLocaleDateString()}, {date.getHours() + ":" + date.getMinutes()}
                  </p>


                  <button onClick={() => { localStorage.setItem("darkMode", !darkMode); setDarkMode(!darkMode) }} className="text-white p-0 m-0 absolute right-2 bottom-2 flex flex-col items-center gap-0 p-1 m-2 rounded-full border-2 bg-white overflow-hidden">
                    <p>{`${darkMode ? "☀️" : "🌑"}`}</p>
                    <small className="text-black">{`${darkMode ? "Light" : "Dark"}`}</small>
                  </button>
                </div>

              </footer>
            </FinanceContextProvider>
          </div>
        </AuthContextProvider>
      </body>
    </html>
  );
}
