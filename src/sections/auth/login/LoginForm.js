import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate, Redirect } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import {
	Link,
	Stack,
	Checkbox,
	TextField,
	IconButton,
	InputAdornment,
	FormControlLabel,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import Iconify from '../../../components/Iconify';
import CustomizedNotification from '../../../utils/CoustemNotification';
import { NOTIFICATION_TYPE } from '../../../utils/SystemConfig';
import { getUserByEmail } from '../../@dashboard/user/UserService';

// ----------------------------------------------------------------------

export default function LoginForm() {
	const navigate = useNavigate();
	const [alert, setalert] = useState({
		type: '',
		msg: '',
	});
	const [submitting, setSubmitting] = useState(false);
	const LoginSchema = Yup.object().shape({
		email: Yup.string()
			.email('Email must be a valid email address')
			.required('Email is required'),
	});

	const formik = useFormik({
		initialValues: {
			email: '',
		},
		validationSchema: LoginSchema,
		onSubmit: ({ email }) => {
			setSubmitting(true);
			getUserByEmail(email).then(
				async (data) => {
					await localStorage.setItem(
						'user',
						JSON.stringify(data.result.employee)
					);
					await setalert({
						type: NOTIFICATION_TYPE.success,
						msg: data.massage,
					});

					setTimeout(async () => {
						navigate('/welcome');
					}, 500);
					setSubmitting(false);
				},
				(error) => {
					console.log('error', error.data.massage);
					setSubmitting(false);
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
	const {
		errors,
		touched,
		values,
		isSubmitting,
		handleSubmit,
		getFieldProps,
	} = formik;

	return (
		<>
			<FormikProvider value={formik}>
				<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
					<Stack spacing={3}>
						<TextField
							fullWidth
							autoComplete="username"
							type="email"
							label="Email address"
							{...getFieldProps('email')}
							error={Boolean(touched.email && errors.email)}
							helperText={touched.email && errors.email}
						/>
					</Stack>

					<Stack
						direction="row"
						alignItems="center"
						justifyContent="space-between"
						sx={{ my: 2 }}
					>
						<FormControlLabel
							control={
								<Checkbox
									{...getFieldProps('remember')}
									checked={values.remember}
								/>
							}
							label="Remember me"
						/>
					</Stack>

					<LoadingButton
						fullWidth
						size="large"
						type="submit"
						variant="contained"
						loading={submitting}
					>
						Login
					</LoadingButton>
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
