import { useEffect, useState } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import Company from './pages/Company';
import WorkingDays from './pages/WorkingDays';
import JobAndCompany from './pages/JobAndCompany';
import Welcome from './pages/Welcome';
import WorkTime from './pages/WorkTime';

// ----------------------------------------------------------------------
const localUser = JSON.parse(localStorage.getItem('user'));
export default function Router() {
	const [user, setUser] = useState({});
	useEffect(() => {
		setUser(JSON.parse(localStorage.getItem('user')));
	}, [localStorage.getItem('user')]);
	const getRoute = () => {
		console.log();
		if (
			!JSON.parse(localStorage.getItem('user')) ||
			!JSON.parse(localStorage.getItem('user')).id
		) {
			return [
				{
					path: '/',
					element: <LogoOnlyLayout />,
					children: [
						{ path: '/register', element: <Register /> },
						{
							path: '/login',
							element: <Login />,
						},
						{
							path: '/login',
							element: <Welcome />,
						},
						{ path: '/', element: <Navigate to="/login" /> },
						{ path: '404', element: <NotFound /> },
						{ path: '*', element: <Navigate to="/login" /> },
					],
				},
				{ path: '*', element: <Navigate to="/register" replace /> },
			];
		}

		return [
			{
				path: '/dashboard',
				element: <DashboardLayout />,
				children: [
					{ path: 'app', element: <DashboardApp /> },
					{ path: 'user', element: <User /> },
					// { path: 'company', element: <Products /> },
					{ path: 'company', element: <Company /> },
					{
						path: 'working-days',
						element: <WorkingDays localUser={localUser} />,
					},
					{ path: 'jobcompany', element: <JobAndCompany /> },
					{
						path: 'work-time',
						element: <WorkTime />,
					},
				],
			},
			{
				path: '/',
				element: <LogoOnlyLayout />,
				children: [
					{
						path: 'welcome',
						element: <Welcome />,
					},
					{ path: '/', element: <Navigate to="/dashboard/app" /> },
					{ path: 'login', element: <Login /> },
					{ path: 'register', element: <Register /> },
					{ path: '404', element: <NotFound /> },
					{ path: '*', element: <Navigate to="/404" /> },
				],
			},
			{ path: '*', element: <Navigate to="/404" replace /> },
		];
	};
	return useRoutes(getRoute());
}
