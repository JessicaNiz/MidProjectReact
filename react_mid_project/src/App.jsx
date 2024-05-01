import { useState, useEffect } from "react"
import { getAllUsers } from "./utils"

import axios from "axios"
import UserCompCopy from "./userCopy";
import NewUserComp from "./newUser";

function App() {
  // const [originalUsers, setOriginalUsers] = useState([])
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [showAddUser, setShowAddUser] = useState(false);

  //for every render will fecth the users data from the server
  useEffect(() => {
  const fetchUsers = async () => {
    const { data } = await getAllUsers();
    console.log("data from server", data);
    // prune users attributes
    const myUsersArray = data.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      address: user.address
    }));
    console.log("myUsersArray", myUsersArray);
    setUsers(myUsersArray);
  };
     fetchUsers();

  }, [])

  console.log("user state", users)


  const handleChange = (e) => {
    setSearchText(e.target.value);
    // filterUsers();
  };




  //console log users data for very change to users
    useEffect(() => {
      console.log("users",users);
      console.log("users lenght from app comp", users.length)

    }, [users])



  const getUpdatedUserFromChild = async (childValue) => {
    console.log("test")
    const usersCopy = [...users]
    const index = usersCopy.findIndex(user => user.id === childValue.id)
    usersCopy[index] = { ...childValue }
    setUsers(usersCopy)
    const { data } = await axios.put("https://jsonplaceholder.typicode.com/users/" + childValue.id, childValue)
    console.log("update user server response", data)

  }

  const getDeletedUserFromChild = async (childValue) => {
    const usersCopy=[...users]
    const index=usersCopy.findIndex(user =>user.id===childValue);
    usersCopy.splice(index,1);
    setUsers(usersCopy)
    const {data } = await axios.delete(`https://jsonplaceholder.typicode.com/users/${childValue}`);
    console.log("delete user server response", data)
  }

  const cancelAddUser=() => {
    setShowAddUser(false);
  };

  const addNewUser = (newValue) => {
    setUsers([...users, newValue]);
    setShowAddUser(false);
  }


  return (
    <>
    <div >
   {/* </div> <div style={{ display:"flex", height:"fit-content", border: '1.5px solid black', borderRadius: '50px', width: "60%" , padding: "20px"}}> */}
    <div className="roundedCard">
      <div style={{margin:"5px", padding:"5px"}}>
      Search&nbsp;&nbsp;  <input type="text" onChange={handleChange} />
      
      <button className="yellowButton" onClick={()=> setShowAddUser(true)}>Add</button>
      </div>
      {
        // users.map((user) => <UserComp key={user.id} user={user} />)
        users.filter(user =>
          user.name.toLowerCase().includes(searchText.toLowerCase()) ||
          user.email.toLowerCase().includes(searchText.toLowerCase())
        ).map((user) => {

          return <UserCompCopy key={user.id}
            user={user} callbackUpdate={getUpdatedUserFromChild} callbackDelete={getDeletedUserFromChild} />
        })

      }
      </div>

    <div >
    {
      showAddUser && <div style={{position:"absolute", transform:"translateX(400px) translateY(-1900px"}}>
        <br /> <br /> <br /> <br />
        Add New User
        <NewUserComp users={users} callbackCancelNewUser={cancelAddUser} callbackAddNewUser={addNewUser}/>
      </div>
    }
    </div>
    </div>
    </>
  );
};

export default App;