import { faker } from '@faker-js/faker';
import * as React from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import {
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
	Typography,
	FormControl,
	InputLabel,
	OutlinedInput,
	FormHelperText,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import Fab from '@mui/material/Fab';
// component
import { styled } from '@mui/material/styles';
import Iconify from '../../../components/Iconify';
import { NOTIFICATION_TYPE } from '../../../utils/SystemConfig';
import {
	addCompanyJob,
	checkNewJobExist,
	getAllJobs,
	getUnAllocatCompanys,
} from './CompanyJobService';
import CustomizedNotification from '../../../utils/CoustemNotification';

export default function AddCompanyJobs({ open, setClose, alarts, resetList }) {
	const [isSubmitting, setSubmitting] = useState(false);
	const [alert, setalert] = useState({
		type: '',
		msg: '',
	});
	const [error, setError] = useState({
		jobIds: { err: false, massge: 'Select any jop' },
		companyId: { err: false, massge: 'Select your company' },
		job: { err: false, massge: 'Enter the jop title' },
		jobname: { err: false, massge: 'Name already exist' },
	});
	const [jobs, setJobs] = useState([]);
	const [companys, setCompanys] = useState([]);
	const [selectJobs, setSelectJobs] = useState([]);
	const [selectCompany, setSelectCompany] = useState();
	const [job, setJob] = useState('');

	useEffect(() => {
		getUnAllocatCompany();
		getJobs();
	}, []);

	const getUnAllocatCompany = () => {
		getUnAllocatCompanys().then(
			(data) => {
				// alart({
				// 	type: NOTIFICATION_TYPE.success,
				// 	msg: data.massage,
				// });
				setCompanys(data.result.workplaces);
			},
			(error) => {
				setalert({
					type: NOTIFICATION_TYPE.error,
					msg: error.data.massage,
				});
			}
		);
	};
	const getJobs = () => {
		getAllJobs().then(
			(data) => {
				setJobs(data.result.jobs);
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
		setError({
			jobIds: { err: false, massge: 'Select any jop' },
			companyId: { err: false, massge: 'Select your company' },
			job: { err: false, massge: 'Enter the jop title' },
			jobname: { err: false, massge: 'Name already exist' },
		});
		setSelectCompany(null);
		setSelectJobs([]);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!selectCompany) {
			setError({
				...error,
				companyId: { ...error.companyId, err: true },
			});
		}
		if (selectJobs.length === 0) {
			setError({ ...error, jobIds: { ...error.jobIds, err: true } });
		}
		if (selectCompany && selectJobs.length > 0) {
			saveCompanyJobs({ workplaceId: selectCompany.id, jobs: selectJobs });
		}
	};
	const handleChange = (event) => {
		setJob(event.target.value);
		setError({
			...error,
			job: { ...error.job, err: false },
			jobname: { ...error.jobname, err: false },
		});
	};
	const savaJob = () => {
		if (job) {
			checkNewJobExist(job).then(
				(data) => {
					setSelectJobs([...selectJobs, { id: 0, name: job }]);
					setError({ ...error, job: { ...error.job, err: false } });
					setError({ ...error, jobname: { ...error.jobname, err: false } });
					setJob('');
				},
				(er) => {
					setError({ ...error, jobname: { ...error.jobname, err: true } });
				}
			);
		} else {
			setError({ ...error, job: { ...error.job, err: true } });
		}
	};
	const saveCompanyJobs = (data) => {
		addCompanyJob(data).then(
			(data) => {
				alarts({
					type: NOTIFICATION_TYPE.success,
					msg: data.massage,
				});
				onReset();
				resetList();
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
					onReset();
					setClose();
				}}
				closeAfterTransition
				BackdropComponent={Backdrop}
			>
				<Box
					// sx={{ maxWidth: '60%', width: 'auto', height: 'auto' }}
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
						<CardHeader title={'Allocate Jobs'} style={{ height: '70px' }} />

						<Divider style={{ marginTop: '-10px' }} />
						<CardContent
							style={{
								paddingBottom: '7px',
								maxHeight: '620px',
								overflowY: 'scroll',
							}}
						>
							<form
								autoComplete="off"
								onReset={onReset}
								onSubmit={handleSubmit}
								style={{ pending: '5px' }}
							>
								<Stack spacing={3}>
									<Autocomplete
										fullWidth
										id="combo-box-demo"
										options={companys}
										getOptionLabel={(option) => {
											return option.name;
										}}
										onChange={(e, reson, details) => {
											if (error.companyId.err) {
												setError({
													...error,
													companyId: { ...error.companyId, err: false },
												});
											}
											setSelectCompany(reson);
										}}
										i
										defaultValue={selectCompany}
										renderInput={(params) => (
											<TextField
												{...params}
												name="company"
												label="Company"
												error={error.companyId.err}
												helperText={
													error.companyId.err && error.companyId.massge
												}
											/>
										)}
									/>
									<Autocomplete
										multiple
										autoComplete
										disableCloseOnSelect
										id="tags-standard"
										options={jobs}
										getOptionLabel={(option) => {
											return option.name;
										}}
										value={selectJobs}
										defaultValue={selectJobs}
										onChange={(e, reson, details) => {
											setSelectJobs(reson);
											if (error.jobIds.err) {
												setError({
													...error,
													jobIds: { ...error.jobIds, err: false },
												});
											}
										}}
										renderInput={(params) => (
											<TextField
												{...params}
												variant="standard"
												label="Select Jops"
												placeholder="jobs"
												error={error.jobIds.err}
												helperText={error.jobIds.err && error.jobIds.massge}
											/>
										)}
									/>
									<Typography variant="div">
										<FormControl
											sx={{ m: 1, width: '25ch' }}
											variant="outlined"
										>
											<InputLabel
												error={error.job.err || error.jobname.err}
												htmlFor="outlined-adornment-password"
											>
												Add Jop to List
											</InputLabel>
											<OutlinedInput
												variant="standard"
												name="jop"
												label="Add Jop to List"
												placeholder="Job Title"
												value={job}
												error={error.job.err || error.jobname.err}
												onChange={handleChange}
												endAdornment={
													<InputAdornment position="end">
														<Fab
															sx={{ width: 35, height: 35 }}
															color="primary"
															aria-label="add"
															onClick={savaJob}
														>
															<Iconify
																sx={{ fontSize: 30 }}
																icon="eva:plus-fill"
															/>
														</Fab>
													</InputAdornment>
												}
											/>
											<FormHelperText
												error={error.job.err || error.jobname.err}
												id="filled-weight-helper-text"
											>
												{(error.job.err && error.job.massge) ||
													(error.jobname.err && error.jobname.massge) ||
													"If you can't find your job in the drop down create on here (Optional)"}
											</FormHelperText>
										</FormControl>
									</Typography>
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
										<LoadingButton
											width="50px"
											size="large"
											type="submit"
											variant="contained"
											loading={isSubmitting}
										>
											Submit
										</LoadingButton>
									</Stack>
								</Stack>
							</form>
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
