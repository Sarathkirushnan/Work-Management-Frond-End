import * as React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
	Avatar,
	Button,
	Checkbox,
	TableRow,
	TableBody,
	TableCell,
	Container,
	Typography,
	TableContainer,
	TablePagination,
} from '@mui/material';
// components
import {
	CompanyListHead,
	CompanyListToolbar,
	CompanyMoreMenu,
	AddCompany,
} from '../sections/@dashboard/company';
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound'; // mock
import COMPANYLIST from '../_mock/company';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
	{ id: 'name', label: 'Company Name', alignRight: false },
	{ id: 'address', label: 'Company Address', alignRight: false },
	{ id: 'contactNumber', label: 'Contact Num', alignRight: false },
	{ id: 'email', label: 'Email Id', alignRight: false },
	{ id: '', label: 'Action', alignRight: false },
];
function createData(name, calories, fat, carbs, protein, price) {
	return {
		name,
		calories,
		fat,
		carbs,
		protein,
		price,
		history: [
			{
				date: '2020-01-05',
				customerId: '11091700',
				amount: 3,
			},
			{
				date: '2020-01-02',
				customerId: 'Anonymous',
				amount: 1,
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
							<Iconify icon="eva:plus-fill" />
						) : (
							<Iconify icon="eva:plus-fill" />
						)}
					</IconButton>
				</TableCell>
				<TableCell component="th" scope="row">
					{row.name}
				</TableCell>
				<TableCell align="right">{row.calories}</TableCell>
				<TableCell align="right">{row.fat}</TableCell>
				<TableCell align="right">{row.carbs}</TableCell>
				<TableCell align="right">{row.protein}</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Typography variant="h6" gutterBottom component="div">
								History
							</Typography>
							<Table size="small" aria-label="purchases">
								<TableHead>
									<TableRow>
										<TableCell>Date</TableCell>
										<TableCell>Customer</TableCell>
										<TableCell align="right">Amount</TableCell>
										<TableCell align="right">Total price ($)</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{row.history.map((historyRow) => (
										<TableRow key={historyRow.date}>
											<TableCell component="th" scope="row">
												{historyRow.date}
											</TableCell>
											<TableCell>{historyRow.customerId}</TableCell>
											<TableCell align="right">{historyRow.amount}</TableCell>
											<TableCell align="right">
												{Math.round(historyRow.amount * row.price * 100) / 100}
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

export default function WorkingDays() {
	const [page, setPage] = useState(0);

	const [order, setOrder] = useState('asc');

	const [selected, setSelected] = useState([]);

	const [orderBy, setOrderBy] = useState('name');

	const [filterName, setFilterName] = useState('');

	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [addOpen, setAddOpen] = useState(false);

	Row.propTypes = {
		row: PropTypes.shape({
			calories: PropTypes.number.isRequired,
			carbs: PropTypes.number.isRequired,
			fat: PropTypes.number.isRequired,
			history: PropTypes.arrayOf(
				PropTypes.shape({
					amount: PropTypes.number.isRequired,
					customerId: PropTypes.string.isRequired,
					date: PropTypes.string.isRequired,
				})
			).isRequired,
			name: PropTypes.string.isRequired,
			price: PropTypes.number.isRequired,
			protein: PropTypes.number.isRequired,
		}).isRequired,
	};

	const rows = [
		createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
		createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
		createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
		createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
		createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
	];

	return (
		<Page title="Company">
			<Container>
				<AddCompany
					open={addOpen}
					setClose={() => {
						console.log('hii');
						setAddOpen(false);
					}}
				/>
				<Stack direction="row" justifyContent="space-between" mb={5}>
					<Typography align="left" variant="h4" gutterBottom>
						Company
					</Typography>
					<Button
						variant="contained"
						startIcon={<Iconify icon="eva:plus-fill" />}
						onClick={() => {
							setAddOpen(true);
						}}
					>
						New Company
					</Button>
				</Stack>

				<Card>
					<CompanyListToolbar
						numSelected={selected.length}
						filterName={filterName}
						// onFilterName={handleFilterByName}
					/>

					<Scrollbar>
						<TableContainer component={Paper}>
							<Table aria-label="collapsible table">
								<TableHead>
									<TableRow>
										<TableCell />
										<TableCell>Dessert (100g serving)</TableCell>
										<TableCell align="right">Calories</TableCell>
										<TableCell align="right">Fat&nbsp;(g)</TableCell>
										<TableCell align="right">Carbs&nbsp;(g)</TableCell>
										<TableCell align="right">Protein&nbsp;(g)</TableCell>
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

					<TablePagination
						rowsPerPageOptions={[5, 10, 25]}
						component="div"
						count={COMPANYLIST.length}
						rowsPerPage={rowsPerPage}
						page={page}
						// onPageChange={handleChangePage}
						// onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</Card>
			</Container>
		</Page>
	);
}
