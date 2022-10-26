import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Input";

const emailReducer = (state, action) => {
  if (action.type === "INPUT_BLUR") {
    return { val: state.value, isValid: state.value.includes("@") };
  }
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
};

const passwordReducer = (state, action) => {
  if (action.type === "INPUT_BLUR") {
    return { val: state.value, isValid: state.value.trim().length > 6 };
  }
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredCollegName, setEnteredCollegName] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [passwordState, dispactPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;
  useEffect(() => {
    let identifier = setTimeout(() => {
      console.log("start");
      setFormIsValid(
        emailState.isValid &&
          passwordState.isValid > 6 &&
          enteredCollegName.trim().length > 0
      );
    }, 500);

    return () => {
      console.log("end");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid, enteredCollegName]);
  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    setFormIsValid(
      event.target.value.includes("@") &&
        passwordState.isValid &&
        enteredCollegName.trim().length > 0
    );
  };

  const passwordChangeHandler = (event) => {
    dispactPassword({ type: "USER_INPUT", val: event.target.value });

    setFormIsValid(
      emailState.isValid &&
        event.target.value.trim().length > 6 &&
        enteredCollegName.trim().length > 0
    );
  };

  const CollegNameHandler = (event) => {
    setEnteredCollegName(event.target.value);

    setFormIsValid(
      emailState.isValid &&
        passwordState.isValid &&
        event.target.value.trim().length > 0
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispactPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label>College Name</label>
          <input type="text" id="text" onChange={CollegNameHandler} />
        </div>
        <Input
          type="email"
          id="email"
          label="E-mail"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        ></Input>
        <Input
          type="password"
          id="password"
          label="password"
          isValid={passwordIsValid}
          value={emailState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        ></Input>
       
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
