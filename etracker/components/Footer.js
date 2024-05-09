"use client";
import useThemeStore from "@/lib/store/themeStore";

const Footer = () => {

    const date = new Date();
    const {theme, changeTheme} = useThemeStore((state) => ({theme:state.theme, changeTheme:state.changeTheme}));

    return (
        <footer className={`fixed bottom-0 left-0 w-full  p-4 body-font ${theme ? "bg-black text-white " : "bg-slate-500 text-white"}`}>
            <div className="container px-5 py-2 mx-auto flex items-center sm:flex-row flex-col">
                <a className="flex title-font font-medium items-center md:justify-start justify-center rounded-full p-1 bg-slate-300 text-black" href='https://github.com/nta45'>
                    <img className="rounded-full w-[2em] h-[2em]" src="https://avatars.githubusercontent.com/u/96786143?v=4" alt="nta45" />
                    <span className="ml-3 text-xl">nta45</span></a>
                <p style={{ color: 'white' }} className="title-font font-medium text-xl inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
                    Date: {date.toLocaleDateString()}, {date.getHours() + ":" + date.getMinutes()}
                </p>


                <button onClick={() => changeTheme()} className="text-white p-0 m-0 absolute right-2 bottom-2 flex flex-col items-center gap-0 p-1 m-2 rounded-full border-2 bg-white overflow-hidden">
                    <p>{`${theme ? "☀️" : "🌑"}`}</p>
                    <small className="text-black">{`${theme ? "Light" : "Dark"}`}</small>
                </button>
            </div>

        </footer>
    )
}

export default Footer
