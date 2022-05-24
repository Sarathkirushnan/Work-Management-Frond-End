import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

export default function DatePicker(props) {
	const {
		name,
		label,
		value,
		onChange,
		error,
		variant = 'outlined',
		openTo = 'day',
		disabled = false,
		disableFuture = false,
	} = props;

	const convertToDefEventPara = (name, value) => {
		return {
			target: {
				name,
				value,
			},
		};
	};
	return (
		<>
			{/* <InputLabel>{label}</InputLabel> */}
			<LocalizationProvider sx={{ margin: 0 }} dateAdapter={AdapterDateFns}>
				<MobileDatePicker
					label={label}
					key={name}
					disabled={disabled}
					//  InputProps={}
					disableFuture={disableFuture}
					inputFormat="yyyy-mm-dd"
					value={value === undefined || value === '' ? null : value}
					onChange={(date) => convertToDefEventPara(name, date)}
					PopperProps={{ placement: 'auto' }}
					renderInput={(params) => (
						<TextField
							variant={variant}
							{...params}
							error={error}
							name={name}
							fullWidth
							{...(error && {
								error: true,
								helperText: error,
							})}
						/>
					)}
				/>
				{/* <MobileDatePicker
          label={label}
          // key={name}

          inputFormat="MM/dd/yyyy"
          value={value === undefined ? '' : value}
          // name={name}
          onChange={(date) => onChange(convertToDefEventPara(name, date))}
          renderInput={(params) => (
            <TextField
              {...params}
              error={error}
              fullWidth
              {...(error && {
                error: true,
                helperText: error
              })}
            />
          )}
        /> */}
				{/* <TimePicker
        label="Time"
        value={value}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} />}
      />
      <DateTimePicker
        label="Date&Time picker"
        value={value}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} />}
      />  */}
			</LocalizationProvider>
		</>
	);
}
