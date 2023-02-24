import { useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';

const SidebarContext = createContext();

export const useSidebar = () => useContext(SidebarContext);

function SidebarProvider({ children }) {
    const [isCollapse, setIsCollapse] = useState(false);
    const handleHideSideBar = () => {
        setIsCollapse(!isCollapse);
    };
    const value = {
        isCollapse,
        setIsCollapse,
        handleHideSideBar,
    };
    return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

export default SidebarProvider;
