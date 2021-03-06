import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
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
import { getAllCompany } from '../sections/@dashboard/company/companyService';
import { NOTIFICATION_TYPE } from '../utils/SystemConfig';
import CustomizedNotification from '../utils/CoustemNotification';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
	{ id: 'name', label: 'Company Name', alignRight: false },
	{ id: 'address', label: 'Company Address', alignRight: false },
	{ id: 'contactNumber', label: 'Contact Num', alignRight: false },
	{ id: 'email', label: 'Email Id', alignRight: false },
	{ id: '', label: 'Action', alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	if (query) {
		return filter(
			array,
			(_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
		);
	}
	return stabilizedThis.map((el) => el[0]);
}

export default function Company() {
	const [alert, setalert] = useState({
		type: '',
		msg: '',
	});
	const [page, setPage] = useState(0);
	const [order, setOrder] = useState('asc');
	const [selected, setSelected] = useState([]);
	const [orderBy, setOrderBy] = useState('name');
	const [filterName, setFilterName] = useState('');
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [addOpen, setAddOpen] = useState(false);
	const [editCompany, setEditCompany] = useState();
	const [COMPANYLIST, setCompanyList] = useState([]);
	useEffect(() => {
		getCompany();
	}, []);

	const getCompany = () => {
		getAllCompany().then(
			(data) => {
				setCompanyList(data.result.workplaces);
			},
			(error) => {
				setalert({
					type: NOTIFICATION_TYPE.error,
					msg: error.massage,
				});
			}
		);
	};
	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = COMPANYLIST.map((n) => n.name);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event, name) => {
		const selectedIndex = selected.indexOf(name);
		let newSelected = [];
		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}
		setSelected(newSelected);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleFilterByName = (event) => {
		setFilterName(event.target.value);
	};

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - COMPANYLIST.length) : 0;

	const filteredUsers = applySortFilter(
		COMPANYLIST,
		getComparator(order, orderBy),
		filterName
	);

	const isUserNotFound = filteredUsers.length === 0;
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
					<AddCompany
						open={addOpen}
						editCompany={editCompany}
						setClose={() => {
							setAddOpen(!addOpen);
							if (addOpen) setEditCompany();
						}}
						resetList={getCompany}
						alart={(alart) => {
							setalert(alart);
						}}
					/>
				)}
				<Stack direction="row" justifyContent="space-between" mb={5}>
					<Typography align="left" variant="h4" gutterBottom>
						Company
					</Typography>
					<Button
						variant="contained"
						startIcon={<Iconify icon="eva:plus-fill" />}
						onClick={async () => {
							await setEditCompany({});
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
						onFilterName={handleFilterByName}
					/>

					<Scrollbar>
						<TableContainer sx={{ minWidth: 800 }}>
							<Table>
								<CompanyListHead
									order={order}
									orderBy={orderBy}
									headLabel={TABLE_HEAD}
									rowCount={COMPANYLIST.length}
									numSelected={selected.length}
									onRequestSort={handleRequestSort}
									onSelectAllClick={handleSelectAllClick}
								/>
								<TableBody>
									{filteredUsers
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((row) => {
											const { id, name, address, contactNumber, email } = row;
											const isItemSelected = selected.indexOf(name) !== -1;

											return (
												<TableRow
													hover
													key={id}
													tabIndex={-1}
													role="checkbox"
													selected={isItemSelected}
													aria-checked={isItemSelected}
												>
													<TableCell padding="checkbox">
														<Checkbox
															checked={isItemSelected}
															onChange={(event) => handleClick(event, name)}
														/>
													</TableCell>
													<TableCell component="th" scope="row" padding="none">
														<Stack
															direction="row"
															alignItems="center"
															spacing={3}
														>
															<Typography variant="subtitle2" noWrap>
																{name}
															</Typography>
														</Stack>
													</TableCell>
													<TableCell align="left">{address}</TableCell>
													<TableCell align="left">{contactNumber}</TableCell>
													<TableCell align="left">{email}</TableCell>
													<TableCell align="right">
														<CompanyMoreMenu
															editCompany={async () => {
																await setEditCompany(row);
																setAddOpen(true);
															}}
															company={row}
															resetList={getCompany}
														/>
													</TableCell>
												</TableRow>
											);
										})}
									{emptyRows > 0 && (
										<TableRow style={{ height: 53 * emptyRows }}>
											<TableCell colSpan={6} />
										</TableRow>
									)}
								</TableBody>

								{isUserNotFound && (
									<TableBody>
										<TableRow>
											<TableCell align="center" colSpan={6} sx={{ py: 3 }}>
												<SearchNotFound searchQuery={filterName} />
											</TableCell>
										</TableRow>
									</TableBody>
								)}
							</Table>
						</TableContainer>
					</Scrollbar>

					<TablePagination
						rowsPerPageOptions={[5, 10, 25]}
						component="div"
						count={COMPANYLIST.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
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
