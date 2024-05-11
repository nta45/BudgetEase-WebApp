// "use client";
import { useState, useContext } from 'react'
import { SettingsIcon } from '@mui/icons-material';
import { authContext } from '@/lib/store/auth-context';
import useThemeStore from '@/lib/store/themeStore';
import Window from './Window';

const Header = () => {
    const [settingWindowOpen, setSettingWindowOpen] = useState(false);
    const theme = useThemeStore((state) => state.theme);
    const { user, loading, logout } = useContext(authContext);

    const closeAndExit = () => {
        logout();
        setSettingWindowOpen(false);
    }

    return (<>
        {settingWindowOpen && user && (
            <Window show={settingWindowOpen} onClose={setSettingWindowOpen} title={"Settings"}>
                <button onClick={closeAndExit} className='flex items-center px-4 py-4 bg-slate-500 rounded-full'>Logout</button>
            </Window>
        )}
        {user && !loading && (<>
            <header className={`container mx-auto max-w-full box-border border-2 border-transparent " ${theme ? "bg-black text-white " : "bg-slate-500"}`} >
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl normalcase font-bold px-5 py-5">BudgetEase</h1>
                    <div className='flex items-center'>
                        <div className="flex flex-col items-center gap-1 pt-2">
                            {/* <SettingsIcon className="text-white" /> */}
                            <button onClick={() => { setSettingWindowOpen(true) }} className="text-white p-0 m-0 flex flex-col items-center gap-0 p-1 m-2 rounded-full border-0 overflow-hidden">
                                <img className="h-[3em] w-[3em] rounded-full overflow-hidden" src={user.photoURL} alt="Profile Picture" referrerPolicy='no-referrer' />
                                <small className="box-border h-8 w-40 border-1 text-[1em] text-center">{user.displayName}</small>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        </>
        )}
    </>
    )
};

export default Header;
