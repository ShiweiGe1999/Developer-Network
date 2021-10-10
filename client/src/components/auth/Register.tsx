import { Formik } from "formik";
import React from "react";
import { useHistory } from "react-router";
import * as Yup from "yup";
import { useAppDispatch } from "../../hooks";
import { register } from "../../reducers/authReducer";
import SplitText from "../SplitText";
export default function Register() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  return (
    <div className="grid md:grid-cols-3 h-screen">
      <div></div>
      <div className="p-4 mt-2" style={{ minWidth: "400px" }}>
        <h1 className="text-center text-3xl pb-4">
          <SplitText copy="Sign Up" />
        </h1>
        <p className="pb-8 text-white text-2xl font-serif text-center">
          Connect with millons of developers around the world
        </p>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            password2: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Name must not be empty"),
            email: Yup.string()
              .email("Please input a valid email")
              .required("Email must not be empty"),
            password: Yup.string()
              .min(8, "Password must greater than 8 characters")
              .max(18, "Password must be less than 18 characters")
              .required("Password must not be empty"),
            password2: Yup.string()
              .min(8, "Password must greater than 8 characters")
              .max(18, "Password must be less than 18 characters")
              .required("Password must not be empty"),
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            const newUser = {
              name: values.name,
              email: values.email,
              password: values.password,
              password2: values.password2,
            };
            dispatch(register([newUser, history]))
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => {
            if (touched.password2 && values.password2 !== values.password) {
              errors.password2 = "Passwords must be same";
            }
            return (
              <form
                onSubmit={handleSubmit}
                className="p-4 border-2 border-solid border-opacity-50 text-white rounded-md"
              >
                <div className="formControl">
                  <h1>Name</h1>
                </div>
                <div className="formControl">
                  <input
                    id="name"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    type="text"
                    placeholder="Name"
                    disabled={isSubmitting}
                    className={
                      touched.name && errors.name
                        ? "formInputError"
                        : "formInput"
                    }
                  />
                  {touched.name && errors.name ? (
                    <div className="text-red-400">{errors.name}</div>
                  ) : null}
                </div>
                <div className="formControl">
                  <h1>Email</h1>
                </div>
                <div className="formControl">
                  <input
                    id="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    type="text"
                    placeholder="Email"
                    disabled={isSubmitting}
                    className={
                      touched.email && errors.email
                        ? "formInputError"
                        : "formInput"
                    }
                  />
                  {touched.email && errors.email ? (
                    <div className="text-red-400">{errors.email}</div>
                  ) : null}
                </div>
                <div className="formControl">
                  <h1>Password</h1>
                </div>
                <div className="formControl">
                  <input
                    id="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    placeholder="Password"
                    name="password"
                    type="password"
                    disabled={isSubmitting}
                    className={
                      touched.password && errors.password
                        ? "formInputError"
                        : "formInput"
                    }
                  />
                  {touched.password && errors.password ? (
                    <div className="text-red-400">{errors.password}</div>
                  ) : null}
                </div>
                <div className="formControl">
                  <h1>Password</h1>
                </div>
                <div className="formControl">
                  <input
                    id="password2"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password2}
                    placeholder="Confirm Password"
                    name="password2"
                    type="password"
                    disabled={isSubmitting}
                    className={
                      touched.password2 && errors.password2
                        ? "formInputError"
                        : "formInput"
                    }
                  />
                  {touched.password2 && errors.password2 ? (
                    <div className="text-red-400">{errors.password2}</div>
                  ) : null}
                </div>
                <div className="formControl mt-4">
                  <button
                    className="w-full bg-blue-300 p-2 rounded-full mt-2 hover:border-white hover:bg-opacity-20 border-transparent border-2 border-solid box-border"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting" : "Submit"}
                  </button>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>

      <div></div>
    </div>
  );
}
