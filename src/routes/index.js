import Home from '../components/Home';
import DefaultLayout from '../layouts/DefaultLayout';
import Signup from '../components/Signup';
import Signin from '../components/Signin';
import MainLayout from '../layouts/MainLayout';
import Services from '../Pages/Services';

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
    {
        path: '/client-management',
        component: Home,
        layout: MainLayout,
    },
    {
        path: '/services',
        component: Services,
        layout: MainLayout,
    },
    {
        path: '/staff',
        component: Home,
        layout: MainLayout,
    },
    {
        path: '/gift-card',
        component: Home,
        layout: MainLayout,
    },
    {
        path: '/set-up',
        component: Home,
        layout: MainLayout,
    },
    {
        path: '/group',
        component: Home,
        layout: MainLayout,
    },
    {
        path: '/invite',
        component: Home,
        layout: MainLayout,
    },
    {
        path: '/help',
        component: Home,
        layout: MainLayout,
    },
];

export { publicRoutes };
