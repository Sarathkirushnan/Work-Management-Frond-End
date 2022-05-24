import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';

// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';
import { registerUser } from './RegisterService';
import { NOTIFICATION_TYPE } from '../../../utils/SystemConfig';
import CustomizedNotification from '../../../utils/CoustemNotification';
// var macaddress = require('macaddress');
// ----------------------------------------------------------------------

export default function RegisterForm() {
	const navigate = useNavigate();
	const [alert, setalert] = useState({
		type: '',
		msg: '',
	});
	const [showPassword, setShowPassword] = useState(false);
	const genders = ['', 'Male', 'Female'];
	const countrys = ['', 'Sri Lanka', 'India', 'USA'];
	const RegisterSchema = Yup.object().shape({
		firstName: Yup.string()
			.min(2, 'Too Short!')
			.max(50, 'Too Long!')
			.required('First name required'),
		lastName: Yup.string()
			.min(2, 'Too Short!')
			.max(50, 'Too Long!')
			.required('Last name required'),
		email: Yup.string()
			.email('Email must be a valid email address')
			.required('Email is required'),
		mobileNumber: Yup.string().required('Mobile number is required'),
		gender: Yup.mixed()
			.oneOf(['Male', 'Female'])
			.required('Gender is required'),
		address: Yup.string().required('Address is required'),
		country: Yup.mixed()
			.oneOf(['Sri Lanka', 'India', 'USA'])
			.required('Country is required'),
	});

	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			mobileNumber: '',
			gender: '',
			address: '',
			country: '',
		},
		validationSchema: RegisterSchema,
		onSubmit: (data) => {
			registerUser(data).then(
				async (res) => {
					await localStorage.setItem(
						'user',
						JSON.stringify(res.data.result.employee)
					);
					navigate('/', { replace: true });
					setalert({
						type: NOTIFICATION_TYPE.success,
						msg: res.data.massage,
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
		},
	});
	const handleAlertClose = () => {
		setalert({
			type: '',
			msg: '',
		});
	};
	const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

	return (
		<>
			<FormikProvider value={formik}>
				<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
					<Stack spacing={3}>
						<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
							<TextField
								fullWidth
								label="First name"
								{...getFieldProps('firstName')}
								error={Boolean(touched.firstName && errors.firstName)}
								helperText={touched.firstName && errors.firstName}
							/>

							<TextField
								fullWidth
								label="Last name"
								{...getFieldProps('lastName')}
								error={Boolean(touched.lastName && errors.lastName)}
								helperText={touched.lastName && errors.lastName}
							/>
						</Stack>
						<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
							<TextField
								fullWidth
								autoComplete="username"
								type="email"
								label="Email address"
								{...getFieldProps('email')}
								error={Boolean(touched.email && errors.email)}
								helperText={touched.email && errors.email}
							/>

							<TextField
								fullWidth
								autoComplete="mobileNumber"
								type={'number'}
								label="Mobile Number"
								{...getFieldProps('mobileNumber')}
								error={Boolean(touched.mobileNumber && errors.mobileNumber)}
								helperText={touched.mobileNumber && errors.mobileNumber}
							/>
						</Stack>
						<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
							<TextField
								fullWidth
								label="Select Gender"
								{...getFieldProps('gender')}
								select
								SelectProps={{ native: true }}
								variant="outlined"
								error={Boolean(touched.gender && errors.gender)}
								helperText={touched.gender && errors.gender}
							>
								{genders.map((option) => {
									return (
										<option key={option} value={option}>
											{option}
										</option>
									);
								})}
							</TextField>
							<TextField
								fullWidth
								label="Select Country"
								select
								SelectProps={{ native: true }}
								variant="outlined"
								{...getFieldProps('country')}
								error={Boolean(touched.country && errors.country)}
								helperText={touched.country && errors.country}
							>
								{countrys.map((option) => (
									<option key={option} value={option}>
										{option}
									</option>
								))}
							</TextField>
						</Stack>
						<TextField
							fullWidth
							multiline
							rows={2}
							autoComplete="address"
							type={'text'}
							label="Address"
							{...getFieldProps('address')}
							error={Boolean(touched.address && errors.address)}
							helperText={touched.address && errors.address}
						/>
						<LoadingButton
							fullWidth
							size="large"
							type="submit"
							variant="contained"
							loading={false}
						>
							Register
						</LoadingButton>
					</Stack>
				</Form>
			</FormikProvider>
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
