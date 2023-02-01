import Home from '../components/Home';
import DefaultLayout from '../layouts/DefaultLayout';
import Signup from '../components/Signup';
import { Navigate } from 'react-router-dom';
import Signin from '../components/Signin';

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
    {
        path: '/signin',
        component: Signin,
        layout: DefaultLayout,
    },
];

export { publicRoutes };
