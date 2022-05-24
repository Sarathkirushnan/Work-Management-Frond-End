import { useEffect, useState } from 'react';
// material
import {
	Box,
	CardContent,
	CardHeader,
	Divider,
	Grid,
	TextField,
	Card,
	Stack,
	Avatar,
	Button,
	CardActions,
	Container,
	Typography,
} from '@mui/material';
// components
import Page from '../components/Page';
import {
	getUserById,
	updateUser,
} from '../sections/@dashboard/user/UserService';
import CustomizedNotification from '../utils/CoustemNotification';
import { NOTIFICATION_TYPE } from '../utils/SystemConfig';
import avatar from '../_mock/avatar';
// ----------------------------------------------------------------------
const user = JSON.parse(localStorage.getItem('user'));

const genders = ['Male', 'Female'];
const countrys = ['Sri Lanka', 'India', 'USA'];
// ----------------------------------------------------------------------

export default function User(props) {
	const [values, setValues] = useState({
		firstName: '',
		lastName: '',
		email: '',
		mobileNumber: '',
		gender: '',
		country: '',
		address: '',
	});
	const [alert, setalert] = useState({
		type: '',
		msg: '',
	});
	const [disabled, setdisabled] = useState(true);
	useEffect(() => {
		setUser();
	}, []);
	const setUser = () => {
		getUserById(user.id).then(
			(data) => {
				setValues(data.result.employee);
			},
			(error) => {
				console.log('error', error.data.massage);

				setalert({
					type: NOTIFICATION_TYPE.error,
					msg: error.data.massage,
				});
			}
		);
	};
	const onSubmint = (e) => {
		updateUser(values).then(
			(data) => {
				localStorage.setItem('user', JSON.stringify(data.result.employee));
				setdisabled(true);
				setalert({
					type: NOTIFICATION_TYPE.success,
					msg: data.massage,
				});
			},
			(error) => {
				console.log('error', error.data.massage);

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
	const handleChange = (event) => {
		setValues({
			...values,
			[event.target.name]: event.target.value,
		});
		setdisabled(false);
	};
	return (
		<>
			<Page title="User">
				<Container>
					<Stack
						direction="row"
						alignItems="center"
						justifyContent="space-between"
						mb={5}
					>
						<Typography variant="h4" gutterBottom>
							User
						</Typography>
					</Stack>
					<Box
						component="main"
						sx={{
							flexGrow: 1,
							py: 0,
						}}
					>
						<Container maxWidth="lg">
							<Grid container spacing={3}>
								<Grid item lg={4} md={6} xs={12}>
									<Card {...props}>
										<CardContent>
											<Box
												sx={{
													alignItems: 'center',
													display: 'flex',
													flexDirection: 'column',
												}}
											>
												<Avatar
													src={
														user.gender === 'Male' ? avatar.male : avatar.female
													}
													sx={{
														height: 64,
														mb: 2,
														width: 64,
													}}
												/>
												<Typography
													color="textPrimary"
													gutterBottom
													variant="h5"
												>
													{`${user.firstName} ${user.lastName}`}
												</Typography>
												<Typography color="textSecondary" variant="body2">
													{`${user.country}`}
												</Typography>
												<Typography color="textSecondary" variant="body2">
													{user.address}
												</Typography>
											</Box>
										</CardContent>
										<Divider />
										<CardActions>
											<Button color="primary" fullWidth disabled variant="text">
												Upload picture
											</Button>
										</CardActions>
									</Card>
								</Grid>
								<Grid item lg={8} md={6} xs={12}>
									<Card>
										<form autoComplete="off" noValidate {...props}>
											<Card>
												<CardHeader
													subheader="The information can be edited"
													title="Profile"
												/>
												<Divider />
												<CardContent>
													<Grid container spacing={3}>
														<Grid item md={6} xs={12}>
															<TextField
																fullWidth
																// helperText="Please specify the first name"
																label="First name"
																name="firstName"
																onChange={handleChange}
																required
																value={values.firstName}
																variant="outlined"
															/>
														</Grid>
														<Grid item md={6} xs={12}>
															<TextField
																fullWidth
																label="Last name"
																name="lastName"
																onChange={handleChange}
																required
																value={values.lastName}
																variant="outlined"
															/>
														</Grid>
														<Grid item md={6} xs={12}>
															<TextField
																fullWidth
																label="Email Address"
																name="email"
																onChange={handleChange}
																required
																value={values.email}
																variant="outlined"
															/>
														</Grid>
														<Grid item md={6} xs={12}>
															<TextField
																fullWidth
																label="Phone Number"
																name="mobileNumber"
																onChange={handleChange}
																required
																type="number"
																value={values.mobileNumber}
																variant="outlined"
															/>
														</Grid>
														<Grid item md={6} xs={12}>
															<TextField
																fullWidth
																label="Select Gender"
																name="gender"
																onChange={handleChange}
																required
																select
																SelectProps={{ native: true }}
																value={values.gender}
																variant="outlined"
															>
																{genders.map((option) => (
																	<option key={option} value={option}>
																		{option}
																	</option>
																))}
															</TextField>
														</Grid>
														<Grid item md={6} xs={12}>
															<TextField
																fullWidth
																label="Select Country"
																name="country"
																onChange={handleChange}
																required
																select
																SelectProps={{ native: true }}
																value={values.country}
																variant="outlined"
															>
																{countrys.map((option) => (
																	<option key={option} value={option}>
																		{option}
																	</option>
																))}
															</TextField>
														</Grid>
														<Grid item md={12} xs={12}>
															<TextField
																fullWidth
																label="Address"
																name="address"
																onChange={handleChange}
																required
																type="text"
																value={values.address}
																variant="outlined"
																multiline
																rows={2}
															/>
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
													<Button
														disabled={disabled}
														color="primary"
														variant="contained"
														onClick={onSubmint}
													>
														Save details
													</Button>
												</Box>
											</Card>
										</form>
									</Card>
								</Grid>
							</Grid>
						</Container>
					</Box>
				</Container>
			</Page>
			{alert.type.length > 0 ? (
				<CustomizedNotification
					severity={alert.type}
					message={alert.msg}
					handleAlertClose={handleAlertClose}
				/>
			) : null}
		</>
	);
}
