import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

export default function Login() {
  return (
    <div className="grid md:grid-cols-3 ">
      <div></div>
      <div className="p-4 mt-20" style={{ minWidth: "400px" }}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Please input a valid email")
              .required("Email must not be empty"),
            password: Yup.string()
              .min(8, "Password must greater than 8 characters")
              .max(18, "Password must be less than 18 characters")
              .required("Password must not be empty"),
          })}
          onSubmit={(values, { setSubmitting }) => {}}
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
            return (
              <form
                onSubmit={handleSubmit}
                className="p-4 border-2 border-solid border-opacity-50 text-white rounded-md"
              >
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
                <div className="formControl mt-4">
                  <button
                    className="w-full bg-black p-2 rounded-full mt-2 hover:border-white hover:bg-opacity-20 border-transparent border-2 border-solid box-border"
                    type="submit"
                  >
                    Login
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
