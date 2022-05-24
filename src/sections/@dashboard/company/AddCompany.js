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
import { NOTIFICATION_TYPE } from '../../../utils/SystemConfig';
import Iconify from '../../../components/Iconify';
import { addCompany, updateCompany } from './companyService';
import CustomizedNotification from '../../../utils/CoustemNotification';

export default function AddCompany({
	open,
	setClose,
	editCompany,
	resetList,
	alart,
}) {
	const [submitt, setSubmitt] = useState(false);
	const [company, setCompnye] = useState(editCompany);
	const [alert, setalert] = useState({
		type: '',
		msg: '',
	});
	React.useEffect(async () => {}, []);
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
		contactNumber: Yup.number(),
	});
	const formik = useFormik({
		initialValues: {
			id: company.id ? company.id : 0,
			name: company.id ? company.name : '',
			address: company.id ? company.address : '',
			email: company.id ? company.email : '',
			contactNumber: company.id ? company.contactNumber : undefined,
		},
		validationSchema: RegisterSchema,
		onSubmit: (data) => {
			if (data.id) {
				updateCompany(data).then(
					(data) => {
						alart({
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
				addCompany(data).then(
					(data) => {
						alart({
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
		handleSubmit,
		isSubmitting,
		getFieldProps,
		resetForm,
	} = formik;
	const onReset = () => {
		setClose(true);
		resetForm();
	};
	return (
		<div>
			<Modal
				keepMounted
				open={open}
				onClose={onReset}
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
						<CardHeader
							title={company.id ? 'Edit Company' : 'Add Company'}
							style={{ height: '70px' }}
						/>

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
									<TextField
										sx={{ b: 0 }}
										type="hidden"
										variant="standard"
										value={company.id && company.id}
										{...getFieldProps('id')}
									/>
									<Stack spacing={3}>
										<TextField
											fullWidth
											value={company.id && company.name}
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
												value={formik.initialValues.contactNumber}
												autoComplete="mobile"
												label="Contact number"
												type={'number'}
												{...getFieldProps('contactNumber')}
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
											value={formik.initialValues.address}
											autoComplete="address"
											type={'text'}
											label="Company address"
											{...getFieldProps('address')}
											error={Boolean(touched.address && errors.address)}
											helperText={touched.address && errors.address}
										/>
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
												onClick={onReset}
											>
												Close
											</LoadingButton>
											<LoadingButton
												width="50px"
												size="large"
												type="submit"
												variant="contained"
												loading={submitt}
											>
												{company ? 'Edit' : 'Submit'}
											</LoadingButton>
										</Stack>
									</Stack>
								</Form>
							</FormikProvider>
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
