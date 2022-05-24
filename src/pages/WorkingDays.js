import * as React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Card, Stack, Button, Container, Typography } from '@mui/material';
// components

import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import {
	AddWorikingDays,
	CustomizedCalendar,
} from '../sections/@dashboard/WorkingDays';
// ----------------------------------------------------------------------
import { NOTIFICATION_TYPE } from '../utils/SystemConfig';
import CustomizedNotification from '../utils/CoustemNotification';
import { getWorkdaysByEmployeeId } from '../sections/@dashboard/WorkingDays/WorkingDaysService';
// ----------------------------------------------------------------------
const user = JSON.parse(localStorage.getItem('user'));
export default function WorkingDays() {
	const [addOpen, setAddOpen] = useState(false);
	const [alert, setalert] = useState({
		type: '',
		msg: '',
	});
	const [rangeArray, setRangeArray] = useState([]);
	useEffect(() => {
		getWorkingDays();
	}, []);
	const getWorkingDays = () => {
		getWorkdaysByEmployeeId(user.id).then(
			(data) => {
				setRangeArray(data.result.workingDasys);
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
	const closeModale = () => {
		setAddOpen(false);
	};
	return (
		<Page title="Working Days">
			<Container>
				{addOpen && (
					<AddWorikingDays
						open={addOpen}
						setClose={closeModale}
						resetList={getWorkingDays}
						setalert={setalert}
					/>
				)}
				<Stack direction="row" justifyContent="space-between" mb={5}>
					<Typography align="left" variant="h4" gutterBottom>
						Work Days
					</Typography>
					<Button
						variant="contained"
						startIcon={<Iconify icon="eva:plus-fill" />}
						onClick={() => {
							setAddOpen(true);
						}}
					>
						New Work Days
					</Button>
				</Stack>

				<Card>
					<Scrollbar>
						<CustomizedCalendar
							initialView="dayGridMonth"
							rangeArray={rangeArray}
							headerRight="dayGridMonth"
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
	);
}
