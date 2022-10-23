import React, { useState, useRef } from "react";
import Card from "../User/UI/Card";
import classes from "./AddUser.module.css";
import Button from "./UI/Button";
import ErrorModal from "./UI/ErrorModal";
import Wrapper from "../Helper/Wrapper";

const AddUser = (props) => {
  const [error, setError] = useState();

  const inputNameRef = useRef();
  const inputAgeRef = useRef();
  const inputCollegeNameRef = useRef();
  const SubmitHandler = (event) => {
    const enteredAge = inputAgeRef.current.value;
    const enteredName = inputNameRef.current.value;
    const enteredCollegeName = inputCollegeNameRef.current.value;
    event.preventDefault();
    if (enteredName.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "an error occured",
        message: "Please enter valid input field",
      });
      return;
    }
    if (+enteredAge < 1) {
      setError({
        title: "an error occured",
        message: "Age should be greater than 0",
      });
      return;
    }
    let userdata = {
      id: Math.random().toString(),
      name1: enteredName,
      age1: enteredAge,
      collegeName: enteredCollegeName,
    };
    props.onAddUser(userdata);
    inputNameRef.current.value = "";
    inputAgeRef.current.value = "";
    inputCollegeNameRef.current.value = "";
  };

  const setErrorHandler = () => {
    setError(null);
  };

  return (
    <>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={setErrorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={SubmitHandler}>
          <label>Username:-</label>
          <input typeof="text" ref={inputNameRef}></input>
          <label>Age(Years):-</label>
          <input type="number" ref={inputAgeRef}></input>
          <label>College Name:-</label>
          <input type="text" ref={inputCollegeNameRef}></input>
          <Button type="submit">Submit</Button>
        </form>
      </Card>
    </>
  );
};

export default AddUser;
