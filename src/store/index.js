import { create } from "zustand";

const useSubMenuStore = create((set) => ({
    activeSubMenu: null,
    setActiveSubMenu: (activeSubMenu) => set(() => ({ activeSubMenu: activeSubMenu })),
    deactiveSubMenu: () => set({ activeSubMenu: null }),
}));

const useSubPageStore = create((set) => ({
    subPage: null,
    subPageData: null,
    setSubPage: (subPage) => set(() => ({ subPage: subPage })),
    setSubPageData: (subPageData) => set(() => ({ subPageData: subPageData })),
    resetSubPage: () => set({ subPage: null }),
}));

export { useSubMenuStore, useSubPageStore };
