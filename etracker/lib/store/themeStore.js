
import {create} from 'zustand'

const useThemeStore = create((set) => ({
    theme: true,
    setTheme: (theme) => set({ theme }),
    changeTheme: () => set((state) => ({ theme: !state.theme })),
}))

export default useThemeStore

export const themer = (state) => {
    const theme = useThemeStore((state) => state.theme);
    return theme;
}