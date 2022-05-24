import { useRef, useState } from 'react';
// material
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, Stack, IconButton, Button } from '@mui/material';
// components
import MenuPopover from '../../components/MenuPopover';
import WorkTime from '../../pages/WorkTime';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function DailySchedule({ setOpen }) {
	const anchorRef = useRef(null);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			{/* <IconButton
				ref={anchorRef}
				onClick={handleOpen}
				title="hid"
				sx={{
					padding: 0,
					width: 44,
					height: 44,
					...(open && {
						bgcolor: (theme) =>
							alpha(
								theme.palette.primary.main,
								theme.palette.action.focusOpacity
							),
					}),
				}}
			>
				<img src={'/static/icons/study-schedule.jpg'} alt={'English'} />
			</IconButton> */}
			<Button ref={anchorRef} onClick={handleOpen} variant="outlined">
				Today Estimate{' '}
				<img
					style={{
						padding: 0,
						width: 50,
						height: 44,
					}}
					src={'/static/icons/shedul.png'}
					alt={'Estimate'}
				/>
			</Button>
		</>
	);
}
