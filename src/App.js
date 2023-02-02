import './App.css';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes } from './routes';
import { Fragment } from 'react';
import { useAuth } from './Contexts/AuthContext';

function App() {
    const auth = useAuth();
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
                                    route.path === '/' && !auth.currentUser ? (
                                        <Navigate to={'/signup'} />
                                    ) : (
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    )
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
