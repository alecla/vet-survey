import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from 'react';
import {Alert, Button, Card, Container, Form, Stack, ToggleButton, ToggleButtonGroup} from 'react-bootstrap';
import {FormSteps, FormState} from './types';
import formData from './form-data';

const FORM_STEPS: FormSteps = {
	INITIAL: 'INITIAL_STEP',
	CONFIRMATION: 'SUCCESS_STEP',
	INVALID: 'INVALID'
};

const FORM_INITIAL_STATE: FormState = formData
	.map((inputGroup) => {
		return {
			[inputGroup.name]: inputGroup.defaultValue ?? ''
		};
	})
	.reduce(
		(prev: {[x: string]: string | string[]}, curr: {[x: string]: string | string[]}) => ({...prev, ...curr}),
		{}
	);

const handleSubmit =
	(formHasAtLeastOneAnsweredQuestion: boolean, setFormStep: (arg: string) => void) =>
	(e: React.FormEvent): void => {
		e.preventDefault();
		if (!formHasAtLeastOneAnsweredQuestion) {
			setFormStep(FORM_STEPS.INVALID);
			return;
		}

		setFormStep(FORM_STEPS.CONFIRMATION);
	};

const renderForm = (
	handleChange: React.ChangeEventHandler,
	form: FormState,
	formStep: string,
	formHasAtLeastOneAnsweredQuestion: boolean,
	setFormStep: (arg: string) => void
): JSX.Element => {
	return (
		<Form id='surveyform' onSubmit={handleSubmit(formHasAtLeastOneAnsweredQuestion, setFormStep)}>
			{formData.map((inputGroup) => (
				<Form.Group key={inputGroup.name} className='mb-3'>
					<Form.Label>{inputGroup.label}</Form.Label>
					<Container>
						{(inputGroup.type === 'radio' || inputGroup.type === 'checkbox') && (
							<ToggleButtonGroup
								type={inputGroup.type as any}
								name={inputGroup.name}
								value={form[inputGroup.name] ?? null}
								defaultValue={inputGroup.defaultValue}
								className='mb-2'
							>
								{inputGroup?.fields?.map((field: {[key: string]: string}, index: number) => (
									<ToggleButton
										key={`${field.value}-${index}`}
										variant={inputGroup.variant}
										id={`${inputGroup.id}-${field.value}`}
										value={field.value}
										onChange={handleChange}
									>
										{field.label}
									</ToggleButton>
								))}
							</ToggleButtonGroup>
						)}
						{inputGroup.type === 'textarea' && (
							<Form.Control
								key={inputGroup.name}
								name={inputGroup.name}
								value={form[inputGroup.name] ?? ''}
								onChange={handleChange}
								as='textarea'
								rows={3}
							/>
						)}
						{inputGroup.type === 'range' && (
							<>
								<Form.Range
									name={inputGroup.name}
									min={1}
									max={inputGroup.fields?.length}
									value={form[inputGroup.name] ?? ''}
									onChange={handleChange}
								/>
								<div style={{display: 'flex', justifyContent: 'space-between'}}>
									{inputGroup?.fields?.map((field: {[key: string]: string}) => (
										<div key={field.value}>
											<p style={{textAlign: 'left'}}>{field.label}</p>
										</div>
									))}
								</div>
							</>
						)}
					</Container>
				</Form.Group>
			))}

			{formStep === FORM_STEPS.INVALID && (
				<Container>
					<Alert key='danger' variant='danger'>
						Please answer at least one question to submit the survey!
					</Alert>
				</Container>
			)}
		</Form>
	);
};

const renderFormConfirmation = (form: FormState): JSX.Element => {
	return (
		<Alert variant='success'>
			<Stack key='resetbutton' gap={2} className='w-50 mx-auto my-4'>
				<iframe src='https://giphy.com/embed/D8HLAWDFmPauTi5QV7'></iframe>
				<h5 className='text-center my-4'>You can see your answers below:</h5>
			</Stack>
			{Object.entries(form).map(([key, value]) => {
				const getLabelForKey = formData.find((inputGroup) => inputGroup.name === key)?.label ?? '';
				const getLabelFromValueObj = formData.find((inputGroup) => inputGroup.name === key);
				const formattedValue: string | string[] =
					getLabelFromValueObj?.fields
						?.filter(
							(field: {[key: string]: string}) => field.value === value || value.includes(field.value)
						)
						.map((field: {[key: string]: string}) => field.label)
						.join(', ') || value;
				return (
					<div key={getLabelForKey}>
						<p className='fw-bolder'>{getLabelForKey}</p>
						<p>{formattedValue.length > 0 ? formattedValue : 'No answer'}</p>
						<hr />
					</div>
				);
			})}
		</Alert>
	);
};

const App = () => {
	const [formStep, setFormStep] = useState(FORM_STEPS.INITIAL);
	const [form, setForm] = useState(FORM_INITIAL_STATE);
	const formHasAtLeastOneAnsweredQuestion: boolean =
		Object.values(form).filter((inputGroup: string | string[]) => inputGroup && inputGroup.length > 0).length > 1;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const currentValueForInput: string | string[] = form[e.target.name];

		const value =
			typeof currentValueForInput !== 'string'
				? currentValueForInput?.some((input: string) => input === e.target.value)
					? currentValueForInput.filter((input: string) => input !== e.target.value)
					: [...currentValueForInput, e.target.value]
				: e.target.value;

		setForm({
			...form,
			[e.target.name]: value
		});
	};

	const handleReset = (): void => {
		setForm(FORM_INITIAL_STATE);
		setFormStep(FORM_STEPS.INITIAL);
	};

	console.log(form, 'form render');

	return (
		<Container className='my-4 w-50'>
			<Card>
				<Card.Header>
					<h1>Veterinary consultation survey</h1>
					<h5>
						{formStep !== FORM_STEPS.CONFIRMATION
							? 'Please take a few minutes of your time to answer the following questions'
							: 'Thank you for completing our survey!'}
					</h5>
				</Card.Header>
				<Card.Body>
					<Container className='my-4'>
						{formStep !== FORM_STEPS.CONFIRMATION
							? renderForm(handleChange, form, formStep, formHasAtLeastOneAnsweredQuestion, setFormStep)
							: renderFormConfirmation(form)}
					</Container>
				</Card.Body>
				<Card.Footer>
					{formStep !== FORM_STEPS.CONFIRMATION ? (
						<Stack key='submitandresetbuttons' gap={2} className='col-md-4 mx-auto my-2'>
							<Button variant='primary' type='submit' form='surveyform'>
								Submit answers
							</Button>
							<Button variant='link' size='sm' onClick={handleReset}>
								Reset form
							</Button>
						</Stack>
					) : (
						<Stack key='resetbutton' gap={2} className='col-md-4 mx-auto my-2'>
							<Button variant='primary' type='button' id='cancel' onClick={handleReset}>
								Take the survey again
							</Button>
						</Stack>
					)}
				</Card.Footer>
			</Card>
		</Container>
	);
};

export default App;
