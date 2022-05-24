import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Stack, TextField } from '@mui/material';
// import { DateRangePicker } from 'react-date-range';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './DateRange.css';
import { isValid, addDays, format } from 'date-fns';

export default function DateRangePicke(props) {
	const {
		smUp,
		label,
		onChange,
		value,
		selections,
		variant = 'outlined',
		openTo = 'day',
		disabled = false,
		disableFuture = false,
	} = props;
	const [state, setState] = useState(value);
	useEffect(() => {
		setState(value);
	}, []);

	const convertToDefEventPara = ({ selection1 }) => {
		const { endDate, startDate } = selection1;
		return {
			endDate: (isValid(endDate) && format(endDate, 'yyyy-MM-dd')) || null,
			startDate:
				(isValid(startDate) && format(startDate, 'yyyy-MM-dd')) || null,
		};
	};

	return (
		<>
			<DateRange
				dateDisplayFormat="yyyy-MM-dd"
				onChange={(item) => {
					onChange(convertToDefEventPara(item));
					console.log({ item });
					setState({ ...state, ...item });
				}}
				preventSnapRefocus
				moveRangeOnFirstSelection
				ranges={[state.selection1]}
			/>
		</>
	);
}
