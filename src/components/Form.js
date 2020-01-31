import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const MyForm = ({ values, errors, touched, status }) => {
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
  {touched.name && errors.name &&(<p className="errors">{errors.name}</p>)}
        </label>
        <label htmlFor="email">
          Email
          <Field id="email" type="email" name="email" placeholder="email" />
          {touched.email && errors.email &&(<p className="errors">{errors.email}</p>)}
        </label>
        <label htmlFor="password">
          Password
          <Field id="password" type="password" name="password" placeholder="password" />
          {touched.password && errors.password &&(<p className="errors">{errors.password}</p>)}
        </label>
        <label htmlFor="tos">
          Terms of Service
          <Field type="checkbox" name="tos" checked={values.tos}/>
          <span className="checkmark"/>
        </label>
        <button type="submit">Submit</button>
      </Form>
      {person.map(person => {
          return(
              <ul key={person.id}>
                  <li>Name: {person.name}</li>
                  <li>Email: {person.email}</li>
                  <li>Password: {person.password}</li>
                  <li>Terms of Service: {person.tos}</li>
              </ul>
          );
      })}
    </div>
  );
};

const FormikForm = withFormik({
    mapPropsToValues(props){
    return {
        name: props.name || "",
        email: props.email || "",
        password: props.password || "",
        tos: props.tos || false,
    };
},
validationSchema: Yup.object().shape({
    name: Yup.string().required("*Required Field"),
    email: Yup.string().required("*Required Field"),
    password: Yup.string().required("*Required Field"),
    tos: Yup.boolean(true)

}),

handleSubmit(values, { setStatus, resetForm }) {
    console.log("submitting", values);
    axios
      .post("https://reqres.in/api/users/", values)
      .then(response => {
        console.log("success", response);
        setStatus(response.data);
        resetForm();
    })
    .catch(err => console.log(err.response));
}
})(MyForm);


export default FormikForm;
