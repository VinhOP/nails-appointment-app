import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Globalstyles from './Globalstyles';
import UserInfoProvider from './Contexts/UserInfoContext';
import AuthProvider from './Contexts/AuthContext';
import SidebarProvider from './Contexts/SidebarContext';
import ServiceInfoProvider from './Contexts/ServiceInfoContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Globalstyles>
        <AuthProvider>
            <UserInfoProvider>
                <SidebarProvider>
                    <ServiceInfoProvider>
                        <App />
                    </ServiceInfoProvider>
                </SidebarProvider>
            </UserInfoProvider>
        </AuthProvider>
    </Globalstyles>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
