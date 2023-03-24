import { createContext, useContext, useEffect, useState } from 'react';

const ModalContext = createContext();
export const useModal = () => useContext(ModalContext);

function ModalProvider({ children }) {
    const [modal, setModal] = useState(false);
    const [serviceModal, setServiceModal] = useState(false);
    const [profileModal, setProfileModal] = useState(false);
    console.log(modal);

    useEffect(() => {
        modal ? (document.body.style.overflowY = 'hidden') : (document.body.style.overflowY = 'auto');
    }, [modal]);

    const value = { modal, setModal, serviceModal, setServiceModal, profileModal, setProfileModal };
    return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

export default ModalProvider;
