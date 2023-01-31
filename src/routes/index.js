import Home from '../components/Home';
import DefaultLayout from '../layouts/DefaultLayout';
import Signup from '../components/Signup';
import { Navigate } from 'react-router-dom';

const publicRoutes = [
    {
        path: '/',
        component: Home,
        layout: DefaultLayout,
    },
    {
        path: '/signup',
        component: Signup,
        layout: DefaultLayout,
    },
];

export { publicRoutes };
