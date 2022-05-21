import * as React from 'react';
import * as Yup from 'yup';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik'; // material
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
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
// component
import { styled } from '@mui/material/styles';
import Iconify from '../../../components/Iconify';

const ContentStyle = styled('div')(({ theme }) => ({
	maxWidth: 480,
	margin: 'auto',
	minHeight: '100vh',
	display: 'flex',
	justifyContent: 'center',
	flexDirection: 'column',
	padding: theme.spacing(12, 0),
}));
export default function AddCompany({ open, setClose }) {
	const [isSubmitt, setSubmitting] = useState(false);
	const [value, setValue] = useState({
		name: 'hi',
		address: '',
		email: '',
		contactNumber: '',
	});
	const RegisterSchema = Yup.object().shape({
		name: Yup.string()
			.min(2, 'Too Short!')
			.max(100, 'Too Long!')
			.required('Company name required'),
		address: Yup.string()
			.min(2, 'Too Short!')
			.max(100, 'Too Long!')
			.required('Company address required'),
		email: Yup.string()
			.email('Email must be a valid email address')
			.required('Email is required'),
		contactNumber: Yup.string(),
	});

	const formik = useFormik({
		initialValues: {
			name: '',
			address: '',
			email: '',
			contactNumber: '',
		},
		validationSchema: RegisterSchema,
		onSubmit: (e) => {
			console.log({ e });
			setClose(true);
		},
	});
	const {
		errors,
		touched,
		handleSubmit,
		isSubmitting,
		getFieldProps,
		resetForm,
	} = formik;
	const onReset = () => {};
	return (
		<div>
			<Modal
				keepMounted
				open={open}
				onClose={() => {
					resetForm({
						name: '',
						address: '',
						email: '',
						contactNumber: '',
					});
					setClose();
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
						width: '60%',
						height: 'auto',
						backgroundColor: 'white',
						overflow: 'auto',
					}}
				>
					<Card>
						<CardHeader title={'modalTitle'} style={{ height: '70px' }} />

						<Divider style={{ marginTop: '-10px' }} />
						<CardContent
							style={{
								paddingBottom: '7px',
								maxHeight: '620px',
								overflowY: 'scroll',
							}}
						>
							<FormikProvider value={formik}>
								<Form
									autoComplete="off"
									noValidate
									onReset={onReset}
									onSubmit={handleSubmit}
									style={{ pending: '5px' }}
								>
									<Stack spacing={3}>
										<TextField
											fullWidth
											value={value.name}
											label="Company name"
											{...getFieldProps('name')}
											error={Boolean(touched.name && errors.name)}
											helperText={touched.name && errors.name}
										/>
										<Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
											<TextField
												fullWidth
												autoComplete="email"
												type="email"
												label="Email address"
												{...getFieldProps('email')}
												error={Boolean(touched.email && errors.email)}
												helperText={touched.email && errors.email}
											/>

											<TextField
												fullWidth
												autoComplete="contactNumber"
												label="Contact number"
												{...getFieldProps('lastName')}
												error={Boolean(
													touched.contactNumber && errors.contactNumber
												)}
												helperText={
													touched.contactNumber && errors.contactNumber
												}
											/>
										</Stack>

										<TextField
											fullWidth
											value={value.address}
											autoComplete="address"
											type={'text'}
											label="Company address"
											{...getFieldProps('address')}
											error={Boolean(touched.address && errors.address)}
											helperText={touched.address && errors.address}
										/>

										<LoadingButton
											fullWidth
											size="large"
											type="submit"
											variant="contained"
											loading={isSubmitting}
										>
											Register
										</LoadingButton>
									</Stack>
								</Form>
							</FormikProvider>
						</CardContent>
					</Card>
				</Box>
			</Modal>
		</div>
	);
}
