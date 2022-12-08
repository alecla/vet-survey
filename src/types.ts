type FormFields = {
	label: string;
	value: string;
};

export type FormState = {
	[key: string]: string | string[];
};

export type FormSteps = {
	INITIAL: string;
	CONFIRMATION: string;
	INVALID: string;
};

export type FormData = {
	defaultValue: null | string | string[];
	label: string;
	type: 'radio' | 'checkbox' | 'textarea' | 'range';
	variant?: string;
	name: string;
	id: string;
	fields?: FormFields[];
};
