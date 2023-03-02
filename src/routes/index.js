import Home from '../components/Home';
import DefaultLayout from '../layouts/DefaultLayout';
import Signup from '../components/Signup';
import Signin from '../components/Signin';
import MainLayout from '../layouts/MainLayout';
import PlaceHolder from '../Pages/PlaceHolder';
import Services from '../Pages/Services';
import ResetPassword from '../components/ResetPassword';

const publicRoutes = [
    {
        path: '/',
        component: Services,
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
        path: '/reset-password',
        component: ResetPassword,
        layout: DefaultLayout,
    },
    {
        path: '/appointment',
        component: PlaceHolder,
        layout: MainLayout,
    },
    {
        path: '/client-management',
        component: PlaceHolder,
        layout: MainLayout,
    },
    {
        path: '/services',
        component: Services,
        layout: MainLayout,
    },
    {
        path: '/staff',
        component: PlaceHolder,
        layout: MainLayout,
    },
    {
        path: '/gift-card',
        component: PlaceHolder,
        layout: MainLayout,
    },
    {
        path: '/set-up',
        component: PlaceHolder,
        layout: MainLayout,
    },
    {
        path: '/group',
        component: PlaceHolder,
        layout: MainLayout,
    },
    {
        path: '/invite',
        component: PlaceHolder,
        layout: MainLayout,
    },
    {
        path: '/help',
        component: PlaceHolder,
        layout: MainLayout,
    },
];

export { publicRoutes };
