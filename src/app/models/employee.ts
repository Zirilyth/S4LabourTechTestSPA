export interface Employee {
	id: number;
    favourite: boolean;
	name: {
		first: string,
		last: string,
		title: string,
		fullName: string;

	},
	email: string,
	gender: string,
	phone: string,
	picture: {
		large: string,
		medium: string,
		thumbnail: string
	}
}
