export type FormObj = {
	[key: string]: string | string[];
};

export type FormSteps = {
	INITIAL: string;
	CONFIRMATION: string;
	INVALID: string;
};
