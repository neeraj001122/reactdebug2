import React, { useState } from "react";
import classes from "./UserList.module.css";
import Card from "./UI/Card";

const UserList = (props) => {
  return (
    <Card className={classes.users}>
      <ul>
        {props.users.map((user) => (
          <li key={user.id}>
            {user.name1} ({user.age1} is year old) {user.collegeName}
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default UserList;
