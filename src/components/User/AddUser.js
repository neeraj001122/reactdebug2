import React, {useState} from "react";
import Card from '../User/UI/Card'
import classes from './AddUser.module.css'
import Button from "./UI/Button";
import ErrorModal from './UI/ErrorModal'
import Wrapper from "../Helper/Wrapper";

const AddUser = (props) => {
    const [username, setUsername] = useState('')
    const [age, setage] = useState('')
    const [error, setError]=useState()
    
    const usernameHandler = (event) => {
         setUsername(event.target.value)
    }
    const ageHandler = (event) => {
          setage(event.target.value)
      }

      const SubmitHandler = (event) => {
        event.preventDefault();
        if(username.trim().length === 0 || age.trim().length === 0)
        {
            setError({
                title:'an error occured',
                message:'Please enter valid input field'
            })
            return;
        }
        if(+age<1)
        {
            setError({
                title:'an error occured',
                message:'Age should be greater than 0'
            })
            return;
        }
       let userdata={
            id:Math.random().toString(),
            name1:username,
            age1:age,    
        }
        props.onAddUser(userdata)
        setUsername('')
        setage('')
    }

    const setErrorHandler = () => {
        setError(null)
    }

    return (
       <>
            {error && <ErrorModal title={error.title} message={error.message} onConfirm={setErrorHandler} />}
        <Card className = {classes.input} >
            <form onSubmit={SubmitHandler}>
            <label>Username:-</label>
            <input typeof="text" value={username} onChange={usernameHandler}></input>
            <label>Age(Years):-</label>
            <input type="number" value={age} onChange={ageHandler}></input>
                <Button type="submit">Submit</Button>
            </form>
        </Card>
        </>
    )
}

export default AddUser;