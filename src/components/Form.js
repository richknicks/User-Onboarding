import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const FormikForm = ({ values, errors, touched, status }) => {
  const [person, setPerson] = useState([]);
  useEffect(() => {
    console.log("status has changed!", status);
    status && setPerson(person => [...person, status]);
  }, [status]);
  return (
    <div>
      <Form>
        <label htmlFor="name">
          Name
          <Field id="name" type="text" name="name" placeholder="name" />
        </label>
        <label htmlFor="name">
          Email
          <Field id="email" type="email" name="name" placeholder="email" />
        </label>
        <label htmlFor="name">
          Password
          <Field id="password" type="password" name="name" placeholder="password" />
        </label>
        <label htmlFor="name">
          Terms of Service
          <Field id="name" type="checkbox" name="name" placeholder="TOS" />
          <button type="submit">Submit</button>
        </label>
      </Form>
    </div>
  );
};

export default FormikForm;
