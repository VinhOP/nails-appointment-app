import { useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext';

function Home() {
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.isToken) {
            navigate('/signup');
        }
    }, []);

    return (
        <div>
            <h1> Home Page</h1>
        </div>
    );
}

export default Home;
