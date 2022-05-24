import * as React from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useState } from 'react';
import {
	TextField,
	Card,
	CardHeader,
	Divider,
	CardContent,
	Grid,
	Autocomplete,
	InputAdornment,
	FormHelperText,
	Stack,
} from '@mui/material';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import { styled } from '@mui/material/styles';
import { addDays, format } from 'date-fns';
import { LoadingButton } from '@mui/lab';
import useResponsive from '../../../hooks/useResponsive';
// component
import DateRangePicke from './DateRangePicke';
import { NOTIFICATION_TYPE } from '../../../utils/SystemConfig';
import { getAllCompany } from '../company/companyService';
import {
	addCompanyWithJobs,
	getCompanyWithJobs,
	getJobsByCompanyId,
} from './WorkingDaysService';
import CustomizedNotification from '../../../utils/CoustemNotification';

const user = JSON.parse(localStorage.getItem('user'));
const jobStatuss = ['New', 'Open', 'Inprocess', 'Complet', 'Hold', 'Reject'];
export default function AddWorikingDays({
	open,
	setClose,
	setalert,
	resetList,
}) {
	const [disabled, setDisabled] = useState(false);
	const [companys, setCompanys] = useState([]);
	const [companySelect, setCompanySelect] = useState({ id: 0, name: '' });
	const [companyJobs, setCompanyJobs] = useState([]);
	const [companyJobSelect, setCompanyJobSelect] = useState({
		id: 0,
		name: '',
	});
	const [jobStatus, setJobStatus] = useState('New');
	const [incomePerHours, setIncomePerHours] = useState(0);
	const [dateRanges, setDateRanges] = useState({
		endDate: null,
		startDate: null,
	});
	const [alert, setAlert] = useState({
		type: '',
		msg: '',
	});
	const smUp = useResponsive('up', 'sm');
	const mdUp = useResponsive('up', 'md');
	const [error, setError] = useState({
		companyJobId: { err: false, massge: 'Select any jop' },
		companyId: { err: false, massge: 'Select your company' },
		dates: { err: false, massge: 'Select any range of date' },
		incomePerHours: { err: false, massge: 'Enter your per Hour income' },
	});
	const [state, setState] = useState({
		selection1: {
			startDate: null,
			endDate: null,
			autoFocus: true,
			key: 'selection1',
			color: '#0e36fb',
		},
	});

	React.useEffect(() => {
		getCompanyWithJobs().then(
			(data) => {
				setCompanys(data.result.workplaces);
			},
			(error) => {
				setalert({
					type: NOTIFICATION_TYPE.error,
					msg: error.data.massage,
				});
			}
		);
	}, []);
	const getJobByCompanyId = (id) => {
		getJobsByCompanyId(id).then(
			(data) => {
				setCompanyJobs(data.result.jobs);
			},
			(error) => {
				setalert({
					type: NOTIFICATION_TYPE.error,
					msg: error.data.massage,
				});
			}
		);
	};
	const handlError = () => {};
	const handleSubmit = async () => {
		const errorHandl = {
			dates: false,
			incomePerHours: false,
			companyId: false,
			companyJobId: false,
		};
		if (dateRanges.endDate === null || dateRanges.startDate === null) {
			errorHandl.dates = true;
		}
		if (!incomePerHours || incomePerHours <= 0) {
			errorHandl.incomePerHours = true;
		}
		if (!companySelect.id || companySelect.id === 0) {
			errorHandl.companyId = true;
		}
		if (!companyJobSelect.id || companyJobSelect.id === 0) {
			errorHandl.companyJobId = true;
		}
		setError({
			companyJobId: { err: errorHandl.companyJobId, massge: 'Select any jop' },
			companyId: { err: errorHandl.companyId, massge: 'Select your company' },
			dates: { err: errorHandl.dates, massge: 'Select any range of date' },
			incomePerHours: {
				err: errorHandl.incomePerHours,
				massge: 'Enter your per Hour income',
			},
		});
		if (
			!errorHandl.companyId &&
			!errorHandl.companyJobId &&
			!errorHandl.dates &&
			!errorHandl.incomePerHours
		) {
			savaWorkingDays({
				startDate: dateRanges.startDate,
				endDate: dateRanges.endDate,
				workplaceAndJopId: companyJobSelect.id,
				employeeId: user.id,
				status: jobStatus,
				incomePerHours,
			});
		}
	};
	const savaWorkingDays = (data) => {
		addCompanyWithJobs(data).then(
			(data) => {
				setalert({
					type: NOTIFICATION_TYPE.success,
					msg: data.massage,
				});
				resetList();
				onReset();
				setClose();
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
		setJobStatus('New');
		setCompanyJobs([]);
		setIncomePerHours(0);
		setDateRanges({
			endDate: null,
			startDate: null,
		});
		setCompanyJobSelect({
			id: 0,
			name: '',
		});
		setCompanySelect({ id: 0, name: '' });
		setState({
			selection1: {
				startDate: null,
				endDate: null,
				autoFocus: true,
				key: 'selection1',
				color: '#0e36fb',
			},
		});
		setClose(false);
	};
	const handleChange = ({ target }) => {
		const { name, value } = target;
		if (name === 'incomePerHours') {
			setIncomePerHours(value);
			setError({
				...error,
				incomePerHours: { ...error.incomePerHours, err: false },
			});
		}
		if (name === 'jopStatus') {
			setJobStatus(value);
		}
	};
	const handleAlertClose = () => {
		setalert({
			type: '',
			msg: '',
		});
	};
	return (
		<div>
			<Modal
				keepMounted
				open={open}
				onClose={() => {
					setClose(true);
					onReset();
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
						width: smUp ? '60%' : '90%',
						height: 'auto',
						backgroundColor: 'white',
						overflow: 'auto',
					}}
				>
					<Card>
						<CardHeader title={'Working Days'} style={{ height: '70px' }} />

						<Divider style={{ marginTop: '-10px' }} />
						<CardContent
							style={{
								paddingBottom: '7px',
								maxHeight: '620px',
								overflowY: 'scroll',
							}}
						>
							<Grid item lg={8} md={6} xs={12}>
								<form autoComplete="off">
									<Card>
										<Divider />
										<CardContent sx={{ m: 2 }}>
											<Grid container spacing={3}>
												<Grid
													container
													justifyContent="space-between"
													alignItems="center"
													md={6}
													xs={12}
												>
													<Grid sx={{ m: 2 }} md={12} xs={12}>
														<Autocomplete
															fullWidth
															id="company-id"
															options={companys}
															getOptionLabel={(option) => {
																return option.name;
															}}
															onChange={(e, reson, details) => {
																if (error.companyId.err) {
																	setError({
																		...error,
																		companyId: {
																			...error.companyId,
																			err: false,
																		},
																	});
																}
																setCompanySelect(reson);
																getJobByCompanyId(reson.id);
																setCompanyJobSelect();
															}}
															value={companySelect}
															renderInput={(params) => (
																<TextField
																	{...params}
																	name="companyJob"
																	label="Select Company"
																	error={error.companyId.err}
																	helperText={
																		error.companyId.err &&
																		error.companyId.massge
																	}
																/>
															)}
														/>
													</Grid>
													<Grid sx={{ m: 2 }} md={12} xs={12}>
														<Autocomplete
															fullWidth
															id="company-job-id"
															options={companyJobs}
															getOptionLabel={(option) => {
																return option.name;
															}}
															onChange={(e, reson, details) => {
																if (error.companyJobId.err) {
																	setError({
																		...error,
																		companyJobId: {
																			...error.companyJobId,
																			err: false,
																		},
																	});
																}
																setCompanyJobSelect(reson);
															}}
															value={companyJobSelect}
															renderInput={(params) => (
																<TextField
																	{...params}
																	name="companyJob"
																	label="Select Job"
																	error={error.companyJobId.err}
																	helperText={
																		error.companyJobId.err &&
																		error.companyJobId.massge
																	}
																/>
															)}
														/>
													</Grid>
													<Grid sx={{ m: 2 }} md={12} xs={12}>
														<TextField
															fullWidth
															label="Income per hours"
															name="incomePerHours"
															onChange={handleChange}
															required
															type="number"
															value={incomePerHours}
															variant="outlined"
															error={error.incomePerHours.err}
															helperText={
																error.incomePerHours.err &&
																error.incomePerHours.massge
															}
															InputProps={{
																startAdornment: (
																	<InputAdornment position="start">
																		$
																	</InputAdornment>
																),
															}}
														/>
													</Grid>
													<Grid sx={{ m: 2 }} md={12} xs={12}>
														<TextField
															fullWidth
															label="Select status"
															name="jopStatus"
															onChange={handleChange}
															required
															select
															SelectProps={{ native: true }}
															value={jobStatus}
															variant="outlined"
														>
															{jobStatuss.map((option) => (
																<option key={option} value={option}>
																	{option}
																</option>
															))}
														</TextField>
													</Grid>
												</Grid>
												<Divider />
												<Grid md={6} xs={12}>
													<Grid md={6} xs={6}>
														<Box
															container
															direction="column"
															justifyContent="space-between"
															alignItems={(smUp && 'start') || 'center'}
															sx={{
																width: smUp ? '50%' : '100%',
															}}
														>
															<DateRangePicke
																scroll={{ enabled: true }}
																value={state}
																onChange={(value) => {
																	setDateRanges(value);
																	if (error.dates.err) {
																		setError({
																			...error,
																			dates: {
																				...error.dates,
																				err: false,
																			},
																		});
																	}
																}}
															/>
														</Box>
													</Grid>
													<Grid md={6} xs={6}>
														<Box>
															<FormHelperText error={error.dates.err}>
																{(error.dates.err && error.dates.massge) ||
																	'Select the woriking days'}
															</FormHelperText>
														</Box>
													</Grid>
												</Grid>
											</Grid>
										</CardContent>
										<Divider />
										<Box
											sx={{
												display: 'flex',
												justifyContent: 'flex-end',
												p: 2,
											}}
										>
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
														setClose();
													}}
												>
													Close
												</LoadingButton>
												<Button
													disabled={disabled}
													color="primary"
													variant="contained"
													onClick={handleSubmit}
												>
													Save details
												</Button>
											</Stack>
										</Box>
									</Card>
								</form>
							</Grid>
						</CardContent>
					</Card>
				</Box>
			</Modal>
			{alert.type.length > 0 ? (
				<CustomizedNotification
					severity={alert.type}
					message={alert.msg}
					handleAlertClose={handleAlertClose}
				/>
			) : null}
		</div>
	);
}
