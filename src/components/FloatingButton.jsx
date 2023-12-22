import { useState } from "react";
import QuickIcon from "../assets/quick-icon.svg";
import { useSubPageStore, useSubMenuStore } from "../store";

const FloatingButton = (props) => {
    const { subMenu = [] } = props;
    const [isSubMenu, setSubMenu] = useState(false);
    const { subPage, setSubPage, resetSubPage } = useSubPageStore();
    const { activeSubMenu, setActiveSubMenu, deactiveSubMenu } = useSubMenuStore();

    const subMenuWrapperStyle = {
        normal: "flex gap-[26px] items-end justify-end translate-x-0 duration-100 scale-100 opacity-1",
        hidden: "flex gap-[26px] items-end justify-end translate-x-24 duration-100 scale-50 opacity-0",
    };

    const buttonStyle = {
        active: "relative z-10 rounded-full w-[68px] h-[68px] flex justify-center items-center",
        notActive: "bg-white rounded-full w-[60px] h-[60px] flex justify-center items-center",
    };

    const iconSizeStyle = {
        active: "w-[30px] h-[30px]",
        notActive: "w-[26px] h-[26px]",
    };

    const handleVisibilitySubMenu = () => {
        setSubMenu((currentValue) => !currentValue);
    };

    return (
        <div className="flex gap-[31px] items-end justify-end h-[88px]">
            <div className={!isSubMenu ? subMenuWrapperStyle.hidden : subMenuWrapperStyle.normal}>
                {subMenu?.map((menu, i) => {
                    return (
                        <div className={`text-center ${activeSubMenu != menu.name ? "order-first" : ""}`} key={i}>
                            {!activeSubMenu && <span className="block text-white font-bold mb-1">{menu.name}</span>}
                            <div>
                                {activeSubMenu == menu.name && (
                                    <button
                                        className="absolute bg-primary-emperor right-[15px] top-0 rounded-full w-[68px] h-[68px] flex justify-center items-center"
                                        onClick={() => {
                                            deactiveSubMenu();
                                            resetSubPage();
                                        }}
                                    ></button>
                                )}
                                <button
                                    className={activeSubMenu === menu.name ? `${buttonStyle.active} ${menu.activeBg}` : buttonStyle.notActive}
                                    onClick={() => {
                                        setActiveSubMenu(menu.name);
                                        setSubPage(menu.name);
                                    }}
                                >
                                    <img
                                        src={activeSubMenu === menu.name ? menu.activeIcon : menu.icon}
                                        alt="Floating Button Icon"
                                        className={activeSubMenu === menu.name ? iconSizeStyle.active : iconSizeStyle.notActive}
                                    />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
            {!subPage && (
                <button className="bg-primary-royal-blue relative z-10 rounded-full w-[68px] h-[68px] flex justify-center items-center" onClick={handleVisibilitySubMenu}>
                    <img src={QuickIcon} alt="Floating Button Icon" className="w-14 h-14" />
                </button>
            )}
        </div>
    );
};

export default FloatingButton;
