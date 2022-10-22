import React, {useState} from 'react';
import AddUser from './components/User/AddUser'
import UserList from './components/User/Userlist';


function App() {  
  const [userList, setUserList] = useState([])
  const ListHandler = (obj) => {
    setUserList((prevList) => {
     return [...prevList, obj]
    })
  }

  return (
    <div>
       <AddUser onAddUser={ListHandler}></AddUser>
       <UserList users={userList} ></UserList>
    </div>
  );
}

export default App;
