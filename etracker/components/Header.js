"use client";
import { useState } from 'react'
import { SettingsIcon } from '@mui/icons-material';
import useThemeStore from '@/lib/store/themeStore';
import Modal from './Modal';

const Header = () => {
    const [settingModalOpen, setSettingModalOpen] = useState(false);
    const theme = useThemeStore((state) => state.theme);

    // const children = ["Settings", "Settings Content"];

    return (<>
        {settingModalOpen && (
            <Modal show={settingModalOpen} onClose={setSettingModalOpen}></Modal>
        )}
        <header className={`container mx-auto max-w-full box-border border-2 border-transparent " ${theme ? "bg-black text-white " : "bg-slate-500"}`} >
            <div className="flex justify-between items-center">
                <h1 className="text-2xl normalcase font-bold px-5 py-5">ExpenseTracker</h1>
                <div className='flex items-center'>
                    <div className="flex flex-col items-center gap-1 pt-2">
                        <button onClick={() => { setSettingModalOpen(true) }} className="text-white p-0 m-0 flex flex-col items-center gap-0 p-1 m-2 rounded-full border-0 overflow-hidden">
                            <img className="h-[3em] w-[3em] rounded-full overflow-hidden" src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Profile Picture" />
                            <small className="box-border h-8 w-40 border-1 text-[1em] text-center">Nathan</small>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    </>
    )
};

export default Header;
