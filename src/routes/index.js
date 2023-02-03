import Home from '../components/Home';
import DefaultLayout from '../layouts/DefaultLayout';
import Signup from '../components/Signup';
import Signin from '../components/Signin';
import MainLayout from '../layouts/MainLayout';

const publicRoutes = [
    {
        path: '/',
        component: Home,
        layout: MainLayout,
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
    {
        path: '/appointment',
        component: Home,
        layout: MainLayout,
    },
];

export { publicRoutes };
