import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import {
  Alert,
  Button,
  Card,
  Container,
  Form,
  Stack,
  ToggleButton,
  ToggleButtonGroup
} from 'react-bootstrap';
import formData from './form-data';

type Form = {
  [key: string]: string | string[];
};

const FORM_STEPS = {
  INITIAL: 'INITIAL_STEP',
  CONFIRMATION: 'SUCCESS_STEP',
  INVALID: 'INVALID'
};

const FORM_INITIAL_STATE: Form = {
  'group-how-did-you-hear-about-us': '',
  'group-overall-satisfaction': '',
  'group-opinion-staff': [],
  'group-recommend-us': '',
  'group-prices-reasonable': '3',
  'group-improve-how': ''
};

const handleSubmit =
  (
    formHasAtLeastOneAnsweredQuestion: boolean,
    setFormStep: (arg: string) => void
  ) =>
  (e: React.FormEvent): void => {
    e.preventDefault();
    if (!formHasAtLeastOneAnsweredQuestion) {
      setFormStep(FORM_STEPS.INVALID);
      return;
    }

    setFormStep(FORM_STEPS.CONFIRMATION);
    console.log(e, 'e');
  };

const renderForm = (
  handleChange: React.ChangeEventHandler,
  form: Form,
  formStep: string,
  formHasAtLeastOneAnsweredQuestion: boolean,
  setFormStep: (arg: string) => void
): JSX.Element => {
  return (
    <Form
      id="survey"
      onSubmit={handleSubmit(formHasAtLeastOneAnsweredQuestion, setFormStep)}
    >
      {formData.map((questionGroup) => (
        <Form.Group key={questionGroup.name} className="mb-3">
          <Form.Label>{questionGroup.label}</Form.Label>
          <Container>
            {(questionGroup.type === 'radio' ||
              questionGroup.type === 'checkbox') && (
              <ToggleButtonGroup
                type={questionGroup.type === 'radio' ? questionGroup.type : undefined}
                name={questionGroup.name}
                value={form[questionGroup.name] ?? null}
                defaultValue={questionGroup.defaultValue}
                className="mb-2"
              >
                {questionGroup?.fields?.map((input, index) => (
                  <ToggleButton
                    key={`${input.value}-${index}`}
                    variant={questionGroup.variant}
                    id={`${questionGroup.id}-${input.value}`}
                    value={input.value}
                    onChange={handleChange}
                  >
                    {input.label}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            )}
            {questionGroup.type === 'textarea' && (
              <Form.Control
                key={questionGroup.name}
                name={questionGroup.name}
                value={form[questionGroup.name] ?? ''}
                onChange={handleChange}
                as="textarea"
                rows={3}
              />
            )}
            {questionGroup.type === 'range' && (
              <>
                <Form.Range
                  name={questionGroup.name}
                  min={1}
                  max={questionGroup.fields?.length}
                  value={form[questionGroup.name] ?? ''}
                  onChange={handleChange}
                />
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  {questionGroup?.fields?.map((input) => (
                    <div key={input.value}>
                      <p style={{ textAlign: 'left' }}>{input.label}</p>
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
          <Alert key="danger" variant="danger">
            Please answer at least one question to submit the survey!
          </Alert>
        </Container>
      )}
    </Form>
  );
};

const renderFormConfirmation = (form: Form): JSX.Element => {
  return (
    <Alert variant="success">
      {Object.entries(form).map(([key, value]) => {
        const getLabelForKey =
          formData.find((group) => group.name === key)?.label ?? '';
        const getLabelFromValue = formData.find(
          (question) => question.name === key
        );
        const formattedValue =
          (getLabelFromValue &&
            getLabelFromValue?.fields?.find((field) => field.value === value)
              ?.label) ??
          'Not answered';
        return (
          <div key={getLabelForKey}>
            <p>{getLabelForKey}</p>
            <p>{formattedValue}</p>
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
    Object.values(form).filter(
      (input: string | string[]) => input && input.length > 0
    ).length > 1;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const currentValueForInput: string | string[] = form[e.target.name];

    const value =
      e.target.type === 'checkbox' && typeof currentValueForInput !== 'string'
        ? currentValueForInput?.some((item) => item === e.target.value)
          ? currentValueForInput.filter((item) => item !== e.target.value)
          : [...(currentValueForInput ?? []), e.target.value]
        : e.target.value;

    setForm({
      ...form,
      [e.target.name]: value
    });
  };

  const handleReset = () => {
    setForm(FORM_INITIAL_STATE);
  };

  console.log(form, 'form rendeer');

  return (
    <Card>
      <Card.Header>
        <h1>Veterinary consultation survey</h1>
        <h5>
          {formStep !== FORM_STEPS.CONFIRMATION
            ? 'Please take a few minutes of your time to fill in the following questions'
            : 'Thank you for completing our survey. Here have a cookie!'}
        </h5>
      </Card.Header>
      <Card.Body>
        <Container className="my-4">
          {formStep !== FORM_STEPS.CONFIRMATION
            ? renderForm(
                handleChange,
                form,
                formStep,
                formHasAtLeastOneAnsweredQuestion,
                setFormStep
              )
            : renderFormConfirmation(form)}
        </Container>
      </Card.Body>
      <Card.Footer>
        <Stack gap={2} className="col-md-4 mx-auto my-2">
          {formStep !== FORM_STEPS.CONFIRMATION ? (
            <>
              <Button
                variant="primary"
                type="button"
                onClick={handleSubmit(
                  formHasAtLeastOneAnsweredQuestion,
                  setFormStep
                )}
              >
                Submit answers
              </Button>
              <Button variant="link" size="sm" onClick={handleReset}>
                Reset form
              </Button>
            </>
          ) : (
            <Button
              variant="primary"
              onClick={() => setFormStep(FORM_STEPS.INITIAL)}
            >
              Take the survey again
            </Button>
          )}
        </Stack>
      </Card.Footer>
    </Card>
  );
};

export default App;
