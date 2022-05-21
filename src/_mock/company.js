import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const companys = [...Array(24)].map((_, index) => ({
	id: faker.datatype.uuid(),
	name: faker.company.companyName(),
	address: faker.address.cityName(),
	contactNumber: faker.phone.phoneNumber(),
	email: `${faker.company.companyName()}@gmail.com`,
	status: sample(['active', 'banned']),
	role: sample([
		'Leader',
		'Hr Manager',
		'UI Designer',
		'UX Designer',
		'UI/UX Designer',
		'Project Manager',
		'Backend Developer',
		'Full Stack Designer',
		'Front End Developer',
		'Full Stack Developer',
	]),
}));

export default companys;
