import {
	Backdrop,
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Container,
	Divider,
	Modal,
	Stack,
	Typography,
} from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { getAllWorkTimeByUserId } from '../sections/@dashboard/workTime/WorkTimeService';
import Iconify from '../components/Iconify';
import useResponsive from '../hooks/useResponsive';
import { CustomizedCalendar } from '../sections/@dashboard/WorkingDays';
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import CustomizedNotification from '../utils/CoustemNotification';
import AddWorkTime from '../sections/@dashboard/workTime/AddWorkTime';
import { NOTIFICATION_TYPE } from '../utils/SystemConfig';

const user = JSON.parse(localStorage.getItem('user'));
export default function WorkTime({ open, setOpen }) {
	const smUp = useResponsive('up', 'sm');
	const mdUp = useResponsive('up', 'md');
	const [alert, setalert] = useState({
		type: '',
		msg: '',
	});
	const [rangeArray, setRangeArray] = useState([]);
	const onReset = () => {};
	const handleAlertClose = () => {
		setalert({
			type: '',
			msg: '',
		});
	};
	useEffect(() => {
		getWorkingTime(user.id);
	}, []);
	const getWorkingTime = (id) => {
		getAllWorkTimeByUserId(id).then(
			(data) => {
				const times = data.result.inOutTime.map((val, key) => {
					const { end, start } = val;
					console.log(end, format(new Date(end), `yyyy-MM-dd'T'HH:mm:ss`));
					return {
						end: val.end,
						start: val.start,
						title: val.title,
					};
				});
				console.log({ times });
				setRangeArray(times);
			},
			(error) => {
				setalert({
					type: NOTIFICATION_TYPE.error,
					msg: error.data.massage,
				});
			}
		);
	};
	return (
		<>
			<Page title="Company">
				{open && (
					<AddWorkTime
						open={open}
						setOpen={setOpen}
						resetList={() => {
							getWorkingTime(user.id);
						}}
						setalert={setalert}
					/>
				)}

				<Container>
					<Stack direction="row" justifyContent="space-between" mb={5}>
						<Typography align="left" variant="h4" gutterBottom>
							Estimations
						</Typography>
						<Button
							variant="contained"
							startIcon={<Iconify icon="eva:plus-fill" />}
							onClick={() => {
								setOpen(true);
							}}
						>
							Add Work Times
						</Button>
					</Stack>

					<Card>
						<Scrollbar>
							<CustomizedCalendar
								editable
								initialView={'timeGridDay'}
								headerRight="dayGridMonth,timeGridWeek,timeGridDay"
								rangeArray={rangeArray}
							/>
						</Scrollbar>
					</Card>
				</Container>
				{alert.type.length > 0 ? (
					<CustomizedNotification
						severity={alert.type}
						message={alert.msg}
						handleAlertClose={handleAlertClose}
					/>
				) : null}
			</Page>
		</>
	);
}
