import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { TextField, DiagnosisSelection, NumberField, SelectField, TypeOption } from "./FormField";
import { Diagnosis, Discharge, EntryType, HealthCheckRating, SickLeave } from "../types";
import { useStateValue } from "../state";

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

export type EntryFormValues = {
  description: string;
  date: string;
  specialist: string;
  type: EntryType;
  diagnosisCodes?: Array<Diagnosis['code']>;
  healthCheckRating: HealthCheckRating;
  employerName: string;
  sickLeave?: SickLeave;
  discharge: Discharge;
};

const typeOptions: TypeOption[] = [
  { label: 'Health Check', value: 'HealthCheck' },
  { label: 'Hospital', value: 'Hospital' },
  { label: 'Occupational Healthcare', value: 'OccupationalHealthcare' },
];

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnosis }] = useStateValue();
  return (
    <Formik
      initialValues={{
        type: "HealthCheck",
        description: "",
        specialist: "",
        date: "",
        diagnosisCodes: [],
        healthCheckRating: 0,
        sickLeave: { startDate: "", endDate: "" },
        discharge: { date: "", criteria: "" },
        employerName: ""
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) errors.date = requiredError;
        if (!values.specialist) errors.specialist = requiredError;
        if (!values.description) errors.description = requiredError;
        if (!values.type) errors.type = requiredError;
        if (values.type === 'HealthCheck' && !values.healthCheckRating)
          errors.healthCheckRating = requiredError;
        if (values.type === 'Hospital' && !values.discharge.criteria)
          errors.criteria = requiredError;
        if (values.type === 'Hospital' && !values.discharge.date)
          errors.dischargeDate = requiredError;
        if (values.type === 'OccupationalHealthcare' && !values.employerName)
          errors.employername = requiredError;
        return errors;
      }}
    >
      {({ isValid, dirty, values, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <SelectField 
            label='Type' 
            name='type' 
            options={typeOptions} 
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosis)}
            />
            {values.type === "HealthCheck" && (
              <Field
                label="Health Check Rating"
                name="healthCheckRating"
                min={0}
                max={3}
                component={NumberField}
              />
            )}
            {values.type === "OccupationalHealthcare" && (
              <>
                <Field
                  label='Employer Name'
                  name='employerName'
                  placeholder='Employer Name'
                  component={TextField}
                />
                <Field
                  label="Sick Leave Start Date"
                  name="sickLeave.startDate"
                  placeholder="YYYY-MM-DD"
                  component={TextField}
                />
                <Field
                  label="Sick Leave End Date"
                  name="sickLeave.endDate"
                  placeholder="YYYY-MM-DD"
                  component={TextField}
                />
              </>
            )}
            {values.type === 'Hospital' && (
              <>
                <Field
                  label='Discharge Criteria'
                  name='discharge.criteria'
                  placeholder='Discharge Criteria'
                  component={TextField}
                />
                <Field
                  label='Discharge Date'
                  name='discharge.date'
                  placeholder="YYYY-MM-DD"
                  component={TextField}
                />
              </>
            )}
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
