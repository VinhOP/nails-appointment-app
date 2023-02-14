import './App.css';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { publicRoutes } from './routes';
import { Fragment, useEffect } from 'react';
import { useAuth } from './Contexts/AuthContext';

function App() {
    const auth = useAuth();
    useEffect(() => {
        auth.getCurrentUser();
    }, []);
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, i) => {
                        const Layout = route.layout ? route.layout : Fragment;
                        const Page = route.component;
                        return (
                            <Route
                                key={i}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
