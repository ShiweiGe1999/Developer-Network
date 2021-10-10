import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import SplitText from "../SplitText";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { login } from "../../reducers/authReducer";
import { selectAuth } from "../../reducers/authReducer";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { Alert } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { clearErrors } from "../../reducers/errorReducer";
import { selectErrors } from "../../reducers/errorReducer";
import { CircularProgress } from "@mui/material";
const useStyles = makeStyles({
  root: {
    marginBottom: "0.3rem",
  },
});
export default function Login() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);
  const globalErrors = useAppSelector(selectErrors);
  const history = useHistory();
  const classes = useStyles();
  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/dashboard");
    }
  }, [auth.isAuthenticated, auth.errors, history]);
  return (
    <div className="grid md:grid-cols-3 h-screen">
      <div></div>
      <div className="p-4 mt-20" style={{ minWidth: "400px" }}>
        <h1 className="text-center text-3xl pb-4">
          <SplitText copy="Login" />
        </h1>
        <p className="pb-8 text-white text-2xl font-serif text-center">
          Connect with millons of developers around the world
        </p>
        {Object.keys(globalErrors).length > 0 && (
          <Alert
            severity="error"
            onClose={() => {
              dispatch(clearErrors());
            }}
            variant="filled"
            className={classes.root}
          >
            Email or Password incorrect!
          </Alert>
        )}
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
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              dispatch(login(values));
              setSubmitting(false);
            }, 3000);
            setSubmitting(true);
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
                <div className="formControl mt-4">
                  {isSubmitting ? (
                    <div className="mt-4 text-center">
                      <CircularProgress color="inherit" className="h-full" />
                    </div>
                  ) : (
                    <button
                      className="w-full bg-black p-2 rounded-full mt-2 hover:border-white hover:bg-opacity-20 border-transparent border-2 border-solid box-border"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Login
                    </button>
                  )}
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
