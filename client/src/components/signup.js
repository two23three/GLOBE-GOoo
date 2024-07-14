import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './/style.css';
import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css';

const AuthForm = () => {
  const containerRef = React.useRef();

  const handleSignUpClick = () => {
    containerRef.current.classList.add("right-panel-active");
  };

  const handleSignInClick = () => {
    containerRef.current.classList.remove("right-panel-active");
  };

  const signUpSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  });

  const signInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  return (
    <div className="container" id="container" ref={containerRef}>
      <div className="form-container sign-up-container">
        <Formik
          initialValues={{ name: '', email: '', password: '' }}
          validationSchema={signUpSchema}
          onSubmit={(values) => {
            console.log('Sign Up:', values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <h1>Create Account</h1>
              <div className="social-container">
                <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
              </div>
              <span>or use your email for registration</span>
              <div>
                <Field type="text" name="name" placeholder="Name" />
                <ErrorMessage name="name" component="div" className="error" />
              </div>
              <div>
                <Field type="email" name="email" placeholder="Email" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <div>
                <Field type="password" name="password" placeholder="Password" />
                <ErrorMessage name="password" component="div" className="error" />
              </div>
              <button type="submit">Sign Up</button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="form-container sign-in-container">
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={signInSchema}
          onSubmit={(values) => {
            console.log('Sign In:', values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <h1>Sign in</h1>
              <div className="social-container">
                <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
              </div>
              <span>or use your account</span>
              <div>
                <Field type="email" name="email" placeholder="Email" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <div>
                <Field type="password" name="password" placeholder="Password" />
                <ErrorMessage name="password" component="div" className="error" />
              </div>
              <a href="#">Forgot your password?</a>
              <button type="submit">Sign In</button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button className="ghost" id="signIn" onClick={handleSignInClick}>Sign In</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button className="ghost" id="signUp" onClick={handleSignUpClick}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <AuthForm />
    </div>
  );
};

export default App;
