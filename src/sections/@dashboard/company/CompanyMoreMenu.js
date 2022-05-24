import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
	Menu,
	MenuItem,
	IconButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
// component
import Iconify from '../../../components/Iconify';
import { deleteCompany } from './companyService';
import { NOTIFICATION_TYPE } from '../../../utils/SystemConfig';
import CustomizedNotification from '../../../utils/CoustemNotification';
// ----------------------------------------------------------------------

export default function CompanyMoreMenu({ company, editCompany, resetList }) {
	const ref = useRef(null);
	const [isOpen, setIsOpen] = useState(false);
	const [alert, setalert] = useState({
		type: '',
		msg: '',
	});
	const deleteHandler = () => {
		deleteCompany(company.id).then(
			(data) => {
				setalert({
					type: NOTIFICATION_TYPE.success,
					msg: data.massage,
				});
				resetList();
			},
			(error) => {
				setalert({
					type: NOTIFICATION_TYPE.error,
					msg: error.massage,
				});
			}
		);
	};
	const editHandler = () => {
		editCompany();
		setIsOpen(false);
	};
	const handleAlertClose = () => {
		setalert({
			type: '',
			msg: '',
		});
	};
	return (
		<>
			<IconButton ref={ref} onClick={() => setIsOpen(true)}>
				<Iconify icon="eva:more-vertical-fill" width={20} height={20} />
			</IconButton>

			<Menu
				open={isOpen}
				anchorEl={ref.current}
				onClose={() => setIsOpen(false)}
				PaperProps={{
					sx: { width: 200, maxWidth: '100%' },
				}}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			>
				<MenuItem sx={{ color: 'text.secondary' }} onClick={deleteHandler}>
					<ListItemIcon>
						<Iconify icon="eva:trash-2-outline" width={24} height={24} />
					</ListItemIcon>
					<ListItemText
						primary="Delete"
						primaryTypographyProps={{ variant: 'body2' }}
					/>
				</MenuItem>

				<MenuItem
					onClick={editHandler}
					component={RouterLink}
					to="#"
					sx={{ color: 'text.secondary' }}
				>
					<ListItemIcon>
						<Iconify icon="eva:edit-fill" width={24} height={24} />
					</ListItemIcon>
					<ListItemText
						primary="Edit"
						primaryTypographyProps={{ variant: 'body2' }}
					/>
				</MenuItem>
			</Menu>
			{alert.type.length > 0 ? (
				<CustomizedNotification
					severity={alert.type}
					message={alert.msg}
					handleAlertClose={handleAlertClose}
				/>
			) : null}
		</>
	);
}
