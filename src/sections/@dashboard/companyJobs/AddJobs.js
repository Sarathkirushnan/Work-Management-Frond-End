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

export default function AddJobs({ open, setClose }) {
	const [isSubmitt, setSubmitting] = useState(false);
	const [value, setValue] = useState({
		name: 'hi',
		id: 1,
	});
	const RegisterSchema = Yup.object().shape({
		name: Yup.string()
			.min(2, 'Too Short!')
			.max(100, 'Too Long!')
			.required('Job name required'),
		id: Yup.number(),
	});

	const formik = useFormik({
		initialValues: {
			name: '',
			id: 0,
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
						id: 0,
					});
					setClose();
					onReset();
				}}
				closeAfterTransition
				BackdropComponent={Backdrop}
			>
				<Box sx={{ width: 400 }}>
					<Card>
						<CardHeader title={'Add Jobs'} style={{ height: '70px' }} />

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
