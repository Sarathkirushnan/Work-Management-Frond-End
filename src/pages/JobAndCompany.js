import * as React from 'react';
import { useState, useEffect } from 'react';
// material
import {
	Box,
	Collapse,
	IconButton,
	TableHead,
	Paper,
	Card,
	Table,
	Stack,
	Button,
	TableRow,
	TableBody,
	TableCell,
	Container,
	Typography,
	TableContainer,
	TablePagination,
} from '@mui/material';
// components
import { AddCompanyJobs } from '../sections/@dashboard/companyJobs';
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound'; // mock
import CustomizedNotification from '../utils/CoustemNotification';
import { getAllCompanyAndJobs } from '../sections/@dashboard/companyJobs/CompanyJobService';
import { NOTIFICATION_TYPE } from '../utils/SystemConfig';
// ----------------------------------------------------------------------

function createData(compName, contNumber, fat, carbs) {
	return {
		name: compName,
		contactNumber: contNumber,
		jobs: [
			{
				id: 1,
				name: '11091700',
			},
			{
				id: 2,
				name: 'Anonymous',
			},
		],
	};
}

// ----------------------------------------------------------------------
function Row(props) {
	const { row } = props;
	const [open, setOpen] = React.useState(false);
	return (
		<>
			<TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
				<TableCell>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => setOpen(!open)}
					>
						{open ? (
							<Iconify icon="icon-park-outline:double-up" />
						) : (
							<Iconify icon="icon-park-outline:double-down" />
						)}
					</IconButton>
				</TableCell>
				<TableCell component="th" scope="row">
					{row.name}
				</TableCell>
				<TableCell align="right">{row.contactNumber}</TableCell>
				<TableCell align="right">
					<IconButton aria-label="delete">
						<Iconify icon="ri:delete-bin-5-fill" />
					</IconButton>
				</TableCell>
			</TableRow>
			<TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box
							sx={{ margin: 1, borderColor: 'primary.main', border: 0.1 }}
							style={{
								borderRadius: '5px',
								backgroundColor: '#f0f5fb',
							}}
						>
							<Typography
								variant="h6"
								gutterBottom
								align="center"
								component="div"
							>
								Jobs
							</Typography>
							<Table size="small" aria-label="purchases">
								<TableHead>
									<TableRow>
										<TableCell> </TableCell>
										<TableCell>Jop</TableCell>
										<TableCell>Action</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{row.jobs.map((jobRow) => (
										<TableRow key={jobRow.id}>
											<TableCell />
											<TableCell component="th" scope="row">
												{jobRow.name}
											</TableCell>
											<TableCell component="th" scope="row">
												<IconButton size="small" aria-label="delete">
													<Iconify icon="ri:delete-bin-5-fill" />
												</IconButton>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	);
}

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

export default function JobAndCompany() {
	const [page, setPage] = useState(0);
	const [order, setOrder] = useState('asc');
	const [selected, setSelected] = useState([]);
	const [orderBy, setOrderBy] = useState('name');
	const [filterName, setFilterName] = useState('');
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const [alert, setalert] = useState({
		type: '',
		msg: '',
	});
	const [addOpen, setAddOpen] = useState(false);
	const [rows, setRows] = useState([]);
	useEffect(() => {
		getAllCompanyJobs();
	}, []);
	const getAllCompanyJobs = () => {
		getAllCompanyAndJobs().then(
			(data) => {
				setRows(data.result.workplaceJobs);
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
		<Page title="Company">
			<Container>
				{addOpen && (
					<AddCompanyJobs
						open={addOpen}
						setClose={() => {
							setAddOpen(false);
						}}
						alarts={(alart) => {
							setalert(alart);
						}}
						resetList={getAllCompanyJobs}
					/>
				)}
				<Stack direction="row" justifyContent="space-between" mb={5}>
					<Typography align="left" variant="h4" gutterBottom>
						Company And jobs
					</Typography>
					<Typography align="right" variant="div" gutterBottom>
						<Button
							variant="contained"
							startIcon={<Iconify icon="eva:plus-fill" />}
							onClick={() => {
								setAddOpen(true);
							}}
						>
							Allocate Jobs
						</Button>
					</Typography>
				</Stack>

				<Card>
					<Scrollbar>
						<TableContainer component={Paper}>
							<Table aria-label="collapsible table">
								<TableHead>
									<TableRow>
										<TableCell />
										<TableCell>Company Name</TableCell>
										<TableCell align="right">Contact Number</TableCell>
										<TableCell align="right">Action</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{rows.map((row) => (
										<Row key={row.name} row={row} />
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Scrollbar>

					{/* <TablePagination
						rowsPerPageOptions={[5, 10, 25]}
						component="div"
						count={5}
						rowsPerPage={1}
						page={1}
						// onPageChange={handleChangePage}
						// onRowsPerPageChange={handleChangeRowsPerPage}
					/> */}
				</Card>
				{alert.type.length > 0 ? (
					<CustomizedNotification
						severity={alert.type}
						message={alert.msg}
						handleAlertClose={handleAlertClose}
					/>
				) : null}
			</Container>
		</Page>
	);
}
