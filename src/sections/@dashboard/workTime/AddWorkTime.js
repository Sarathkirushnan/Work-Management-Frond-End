import * as React from 'react';
import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik'; // material
import {
	Button,
	Modal,
	Stack,
	TextField,
	IconButton,
	InputAdornment,
	Container,
	Card,
	CardHeader,
	Divider,
	CardContent,
	Autocomplete,
} from '@mui/material';
import {
	LoadingButton,
	LocalizationProvider,
	MobileDatePicker,
	MobileTimePicker,
	TimePicker,
} from '@mui/lab';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { addDays, format } from 'date-fns';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
// component
import useResponsive from '../../../hooks/useResponsive';
import { NOTIFICATION_TYPE } from '../../../utils/SystemConfig';
import Iconify from '../../../components/Iconify';
import {
	addWorkTime,
	getInOutTimeByDateEmployeId,
	getWorkingDaysByDateEmployeId,
} from './WorkTimeService';
import CustomizedNotification from '../../../utils/CoustemNotification';
import { CustomizedCalendar } from '../WorkingDays';

const user = JSON.parse(localStorage.getItem('user'));
export default function AddWorkTime({
	open,
	setOpen,
	resetList,
	setalert,
	workTime,
}) {
	const smUp = useResponsive('up', 'sm');
	const mdUp = useResponsive('up', 'md');
	const [workingDays, setWorkingDays] = useState([]);
	const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
	const [inTime, setInTime] = useState();
	const [outTime, setOutTime] = useState();
	const [workingDaysId, setWorkingDaysId] = useState();
	const [isSubmit, setSubmit] = useState(false);
	const [workTimeSelcteDate, setWorkTimeSelcteDate] = useState([]);

	React.useEffect(() => {
		getWorkingTimes(date);
		getWorkingTimesForDay(format(new Date(), 'yyyy-MM-dd'));
	}, []);
	const handleChange = (newValue) => {
		console.log({ date });
	};

	const initialValues = {
		date,
		workingDaysId: workingDaysId && workingDaysId.id,
		inTime: inTime && format(inTime, `yyyy-MM-dd'T'HH:mm:ss.SSS`),
		outTime: outTime && format(outTime, `yyyy-MM-dd'T'HH:mm:ss.SSS`),
	};

	const handleSubmit = (data) => {
		console.log({ data });
		if (data.id) {
			addWorkTime(data).then(
				(data) => {
					setalert({
						type: NOTIFICATION_TYPE.success,
						msg: data.massage,
					});
					onReset();
					resetList();
				},
				(error) => {
					setalert({
						type: NOTIFICATION_TYPE.error,
						msg: error.data.massage,
					});
				}
			);
		} else {
			addWorkTime(data).then(
				(data) => {
					setalert({
						type: NOTIFICATION_TYPE.success,
						msg: data.massage,
					});
					onReset();
					resetList();
				},
				(error) => {
					setalert({
						type: NOTIFICATION_TYPE.error,
						msg: error.data.massage,
					});
				}
			);
		}
	};
	const getWorkingTimes = (date) => {
		getWorkingDaysByDateEmployeId(date, user.id).then(
			(data) => {
				setWorkingDays(data.result.workingDays);
			},
			(error) => {
				setalert({
					type: NOTIFICATION_TYPE.error,
					msg: error.data.massage,
				});
			}
		);
	};
	const getWorkingTimesForDay = (date) => {
		getInOutTimeByDateEmployeId(date, user.id).then(
			(data) => {
				setWorkTimeSelcteDate(data.result.inOutTime);
			},
			(error) => {
				setalert({
					type: NOTIFICATION_TYPE.error,
					msg: error.data.massage,
				});
			}
		);
	};
	const onReset = () => {
		setDate(format(new Date(), 'yyyy-MM-dd'));
		setInTime();
		setOutTime();
		setWorkingDaysId();
		setSubmit(false);
	};
	const onClose = () => {
		setOpen(false);
	};
	return (
		<>
			<Modal
				keepMounted
				open={open}
				onClose={() => {
					onReset();
					onClose();
				}}
				closeAfterTransition
				BackdropComponent={Backdrop}
			>
				<Box
					style={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						borderRadius: '5px',
						transform: 'translate(-50%, -50%)',
						width: '60%',
						height: 'auto',
						backgroundColor: 'white',
						overflow: 'auto',
					}}
				>
					<Card>
						<CardHeader title={'Add Company'} style={{ height: '70px' }} />

						<Divider style={{ marginTop: '-10px' }} />
						<CardContent
							style={{
								paddingBottom: '7px',
								maxHeight: '620px',
								overflowY: 'scroll',
							}}
						>
							<form style={{ pending: '5px' }}>
								<Stack spacing={3}>
									<LocalizationProvider dateAdapter={AdapterDateFns}>
										<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
											<MobileDatePicker
												label="Select the Date"
												inputFormat="yyyy-MM-dd"
												value={date}
												onChange={(value) => {
													setDate(format(value, 'yyyy-MM-dd'));
													getWorkingTimesForDay(format(value, 'yyyy-MM-dd'));
												}}
												renderInput={(params) => (
													<TextField
														fullWidth
														{...params}
														error={isSubmit && !date}
														helperText={isSubmit && !date && 'Select date'}
													/>
												)}
											/>
											<Autocomplete
												disablePortal
												id="combo-box-demo"
												options={workingDays}
												value={workingDaysId && workingDaysId}
												sx={{ width: 300 }}
												onChange={(e, reson, details) => {
													setWorkingDaysId(reson);
												}}
												getOptionLabel={(option) => {
													return option.name;
												}}
												renderInput={(params) => (
													<TextField
														error={Boolean(isSubmit && !workingDaysId)}
														{...params}
														label="Work"
														helperText={
															isSubmit && !workingDaysId && 'Select the work'
														}
													/>
												)}
											/>
										</Stack>
										<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
											<MobileTimePicker
												label="In time"
												inputFormat="HH:mm"
												value={inTime && format(inTime, 'HH:mm')}
												onChange={(value) => {
													setInTime(value);
												}}
												renderInput={(params) => (
													<TextField
														fullWidth
														{...params}
														error={isSubmit && !inTime}
														helperText={isSubmit && !inTime && 'Select in time'}
													/>
												)}
											/>
											<MobileTimePicker
												disabled={!inTime}
												label="out time"
												inputFormat="HH:mm"
												value={outTime && format(outTime, 'HH:mm')}
												onChange={(value) => {
													setOutTime(value);
												}}
												renderInput={(params) => (
													<TextField
														fullWidth
														{...params}
														error={isSubmit && !outTime}
														helperText={
															isSubmit && !outTime && 'Select out time'
														}
													/>
												)}
											/>
										</Stack>
									</LocalizationProvider>
									<TextField
										sx={{ b: 0 }}
										type="hidden"
										variant="standard"
										value={1}
									/>
									<Stack>
										<FullCalendar
											plugins={[dayGridPlugin, timeGridPlugin]}
											initialView="timeGridDay"
											editable
											initialDate={date}
											gotoDate={date}
											headerToolbar={{
												left: 'title',
												center: '',
												right: '',
											}}
											events={workTimeSelcteDate}
										/>
									</Stack>
									<Stack
										direction={{ xs: 'column', sm: 'row' }}
										justifyContent="right"
										spacing={2}
									>
										<LoadingButton
											width="50px"
											size="large"
											color="error"
											variant="contained"
											onClick={() => {
												onReset();
												onClose();
											}}
										>
											Close
										</LoadingButton>
										<LoadingButton
											width="50px"
											size="large"
											variant="contained"
											onClick={() => {
												setSubmit(true);
												handleSubmit(initialValues);
												onReset();
											}}
										>
											{'Submit'}
										</LoadingButton>
									</Stack>
								</Stack>
							</form>
						</CardContent>
					</Card>
				</Box>
			</Modal>
		</>
	);
}
