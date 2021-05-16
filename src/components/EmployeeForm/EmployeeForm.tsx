import React, { useState } from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import './EmployeeForm.scss';

interface FormValues {
  firstName: string;
  lastName: string;
  department: 'accountancy' | 'IT' | 'sales' | 'marketing';
  position: 'junior' | 'regular' | 'senior' | 'manager';
}

interface FormProps {
  formType: 'add' | 'update';
  handleClose: () => void;
}

const EmployeeForm = ({ formType, handleClose }: FormProps): JSX.Element => {
  const initialValues: FormValues = {
    firstName: '',
    lastName: '',
    department: 'accountancy',
    position: 'junior',
  };

  const [values, setValues] = useState(initialValues);

  const handleSubmit = (newValues: FormValues, setSubmitting: (boolean: boolean) => void) => {
    setValues(newValues);
    setSubmitting(false);
    handleClose();
  };

  const validateTextInput = (values: FormValues) => {
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
          {formType === 'add' ? 'Add new employee' : 'Update Employee Data'}{' '}
        </h1>
        <Formik
          validate={validateTextInput}
          initialValues={values}
          onSubmit={(values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
            handleSubmit(values, setSubmitting);
          }}
        >
          {({ errors, touched }) => (
            <Form
              name={formType === 'add' ? 'addForm' : 'updateForm'}
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
                {formType === 'add' ? 'Submit' : 'Update'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EmployeeForm;
