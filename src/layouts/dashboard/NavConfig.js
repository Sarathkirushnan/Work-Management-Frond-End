// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
	{
		title: 'dashboard',
		path: '/dashboard/app',
		icon: getIcon('eva:pie-chart-2-fill'),
	},
	{
		title: 'user profile',
		path: '/dashboard/user',
		icon: getIcon('eva:people-fill'),
	},
	{
		title: 'company',
		path: '/dashboard/company',
		icon: getIcon('eva:home-fill'),
	},
	{
		title: 'jobs and company',
		path: '/dashboard/jobcompany',
		icon: getIcon('eva:layers-fill'),
	},
	{
		title: 'working days',
		path: '/dashboard/working-days',
		icon: getIcon('la:calendar-day'),
	},
	{
		title: 'Today Estimate',
		path: '/dashboard/work-time',
		icon: getIcon('ic:twotone-more-time'),
	},
];

export default navConfig;
