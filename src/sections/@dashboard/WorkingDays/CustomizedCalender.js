import * as React from 'react';
import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { getWorkdaysByEmployeeId } from './WorkingDaysService';
import { NOTIFICATION_TYPE } from '../../../utils/SystemConfig';

const CustomizedCalendar = ({
	rangeArray,
	initialView,
	editable,
	headerRight,
}) => {
	return (
		<FullCalendar
			plugins={[dayGridPlugin, timeGridPlugin]}
			initialView={initialView}
			editable={editable}
			headerToolbar={{
				left: 'prev,next today',
				center: 'title',
				right: headerRight,
			}}
			events={rangeArray}
		/>
	);
};

export default CustomizedCalendar;
// [
// 				{
// 					title: 'Business Lunch',
// 					start: '2022-04-03T13:00:00',
// 					constraint: 'businessHours',
// 				},
// 				{
// 					title: 'Meeting',
// 					start: '2022-04-13T11:00:00',
// 					constraint: 'availableForMeeting', // defined below
// 					color: '#257e4a',
// 				},
// 				{
// 					title: 'Conference',
// 					start: '2022-04-18',
// 					end: '2022-04-20',
// 				},
// 				{
// 					title: 'Conference2',
// 					start: '2022-04-18',
// 					end: '2022-04-20',
// 					textColor: '#000',
// 					extraParams: {
// 						custom_param1: 'something',
// 						custom_param2: 'somethingelse',
// 					},
// 				},
// 				{
// 					title: 'Party',
// 					start: '2022-04-29T20:00:00',
// 				},

// 				// areas where "Meeting" must be dropped
// 				{
// 					groupId: 'availableForMeeting',
// 					start: '2022-04-11T10:00:00',
// 					end: '2022-04-11T16:00:00',
// 					display: 'background',
// 				},
// 				{
// 					groupId: 'availableForMeeting',
// 					start: '2022-04-13T10:00:00',
// 					end: '2022-04-13T16:00:00',
// 					display: 'background',
// 				},

// 				// red areas where no events can be dropped
// 				{
// 					start: '2022-04-24',
// 					end: '2022-04-28',

// 					display: 'background',
// 					color: '#ff9f89',
// 				},
// 				{
// 					start: '2022-04-06',
// 					end: '2022-04-08',
// 					title: 'testing',
// 					overlap: true,
// 					constraint: 'availableForMeeting', //
// 					color: '#000',
// 				},
// 			]
