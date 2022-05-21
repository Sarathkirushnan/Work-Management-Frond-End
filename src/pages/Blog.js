import * as React from 'react';

import { Link as RouterLink } from 'react-router-dom';
// material
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import {
	BlogPostCard,
	BlogPostsSort,
	BlogPostsSearch,
} from '../sections/@dashboard/blog';
// mock
import POSTS from '../_mock/blog';
// ----------------------------------------------------------------------

const SORT_OPTIONS = [
	{ value: 'latest', label: 'Latest' },
	{ value: 'popular', label: 'Popular' },
	{ value: 'oldest', label: 'Oldest' },
];

const columns = [
	{ field: 'id', headerName: 'ID', width: 90 },
	{
		field: 'firstName',
		headerName: 'First name',
		width: 150,
		editable: true,
	},
	{
		field: 'lastName',
		headerName: 'Last name',
		width: 150,
		editable: true,
	},
	{
		field: 'age',
		headerName: 'Age',
		type: 'number',
		width: 110,
		editable: true,
	},
	{
		field: 'fullName',
		headerName: 'Full name',
		description: 'This column has a value getter and is not sortable.',
		sortable: false,
		width: 160,
		valueGetter: (params) =>
			`${params.row.firstName || ''} ${params.row.lastName || ''}`,
	},
];

const rows = [
	{ id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
	{ id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
	{ id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
	{ id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
	{ id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
	{ id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
	{ id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
	{ id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
	{ id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];
// ----------------------------------------------------------------------

export default function Blog() {
	// const { data, loading } = useDemoData({
	// 	dataSet: 'Commodity',
	// 	rowLength: 100,
	// 	visibleFields: [
	// 		'commodity',
	// 		'quantity',
	// 		'filledQuantity',
	// 		'status',
	// 		'isFilled',
	// 		'unitPrice',
	// 		'unitPriceCurrency',
	// 		'subTotal',
	// 		'feeRate',
	// 		'feeAmount',
	// 		'incoTerm',
	// 	],
	// });

	// const apiRef = useGridApiRef();

	// const initialState = useKeepGroupedColumnsHidden({
	// 	apiRef,
	// 	initialState: {
	// 		...data.initialState,
	// 		rowGrouping: {
	// 			...data.initialState?.rowGrouping,
	// 			model: ['commodity'],
	// 		},
	// 		sorting: {
	// 			sortModel: [{ field: '__row_group_by_columns_group__', sort: 'asc' }],
	// 		},
	// 	},
	// });

	return (
		<Page title="Dashboard: Blog">
			<Container>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					mb={5}
				>
					<Typography variant="h4" gutterBottom>
						Blog
					</Typography>
					<Button
						variant="contained"
						component={RouterLink}
						to="#"
						startIcon={<Iconify icon="eva:plus-fill" />}
					>
						New Post
					</Button>
				</Stack>
			</Container>
		</Page>
	);
}
