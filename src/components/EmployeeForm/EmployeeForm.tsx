import React from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import './EmployeeForm.scss';
import { IResponseObject } from '../../types/responses';

interface IForm {
  handleClose: () => void;
  employeeData?: IResponseObject | null;
  submitAction: (employee: IResponseObject) => Promise<any>;
  newID?: string;
}

const EmployeeForm = ({ handleClose, submitAction, employeeData, newID }: IForm): JSX.Element => {
  const initialValues: IResponseObject = {
    id: employeeData?.id || newID,
    firstName: employeeData?.firstName || '',
    lastName: employeeData?.lastName || '',
    department: employeeData?.department || 'accountancy',
    position: employeeData?.position || 'junior',
  };

  const handleSubmit = (
    newValues: IResponseObject,
    setSubmitting: (boolean: boolean) => void,
  ): void => {
    submitAction(newValues);
    setSubmitting(false);
    handleClose();
  };

  const validateTextInput = (values: IResponseObject) => {
    const errors: { firstName?: string; lastName?: string } = {};
    if (!values.firstName) {
      errors.firstName = 'Required';
    }
    if (!values.lastName) {
      errors.lastName = 'Required';
    }
    return errors;
  };

  return (
    <div className="form__wrapper form__wrapper--outer">
      <div className="form">
        <button
          aria-label="closeButton"
          className="form__button form__button--close"
          onClick={handleClose}
        >
          <i className="fas fa-times"></i>
        </button>
        <h1 className="form__title">
          {employeeData ? 'Update Employee Data' : 'Add new employee'}
        </h1>
        <Formik
          validate={validateTextInput}
          initialValues={initialValues}
          onSubmit={(
            values: IResponseObject,
            { setSubmitting }: FormikHelpers<IResponseObject>,
          ) => {
            handleSubmit(values, setSubmitting);
          }}
        >
          {({ errors, touched }) => (
            <Form
              name={employeeData ? 'updateForm' : 'addForm'}
              className="form__wrapper form__wrapper--inner"
            >
              <label className="form__label" htmlFor="firstName">
                First Name
              </label>
              <Field
                autoComplete="off"
                className="form__input"
                id="firstName"
                name="firstName"
                placeholder="John"
              />
              {errors.firstName && touched.firstName && (
                <div className="form__error">{errors.firstName}</div>
              )}
              <label className="form__label" htmlFor="lastName">
                Last Name
              </label>
              <Field
                autoComplete="off"
                className="form__input"
                id="lastName"
                name="lastName"
                placeholder="Doe"
              />
              {errors.lastName && touched.lastName && (
                <div className="form__error">{errors.lastName}</div>
              )}
              <label className="form__label" htmlFor="department">
                Department
              </label>
              <Field className="form__input" as="select" id="department" name="department">
                <option value="accountancy">Accountancy</option>
                <option value="IT">IT</option>
                <option value="marketing">Marketing</option>
                <option value="sales">Sales</option>
              </Field>
              <label className="form__label" htmlFor="position">
                Position
              </label>
              <Field as="select" className="form__input" id="position" name="position" type="text">
                <option value="junior">Junior</option>
                <option value="regular">Regular</option>
                <option value="senior">Senior</option>
                <option value="manager">Manager</option>
              </Field>
              <button className="form__button form__button--submit" type="submit">
                {employeeData ? 'Update' : 'Submit'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EmployeeForm;
