import { useState, useEffect } from "react";
import { getUserTodos } from "./utils";
import "./project.css";

import TodosComp from "./todos";
import { all } from "axios";


function UserComp({ userId, userName, userEmail, userAdress, callback }) 
{
  const [todos, setTodos] = useState([]);
  const [uncompleted, setUncompleted] = useState([]);

  const [otherDataExist, setOtherDataExist] = useState(false)

  
  const [updatedUser, setUpdatedUser] = useState({});

  const [updatedName, setUpdatedName] = useState([]);
  const [updatedEmail, setUpdatedEmail] = useState([]);
  const [updatedAdress, setUpdatedAdress] = useState([]);

  function createUserObject(userId, userName, userEmail, userAddress) {

  }

  // console.log(userAdress);

//fecth Todos for every change in UserId
  useEffect(() => {
    const fetchTodos = async () => {
      const { data } = await getUserTodos(userId);
      setTodos(data);
    };
    fetchTodos();

  }, [userId]);


  useEffect(() => {
    const getUncompletedTask = () => {
      //find return the object itself
      const uncompletedTask = todos.find(tudo => tudo.completed === false);
      if (uncompletedTask) {
        setUncompleted(true);
      }
      else {
        setUncompleted(false);
      }
      // console.log(`todos: ${user.id}}`, {todos}, uncompleted)
    };
    getUncompletedTask();

  }, [todos]);

  //just for test, to see the data on the console log
  // console.log(updatedName, updatedEmail, updatedAdress)
  console.log(updatedUser);

  const handleUpdateUser = () => {
    console.log("test")
    callback({...updatedUser, id: userId  })
  };

  // useEffect(() => {
  //   setUpdatedUser({...userAdress})
  // }, [userAdress]) 



  const handleAddress = (e) => {
    console.log(updatedUser)
    setUpdatedUser({ ...updatedUser, address: { ...updatedUser.address, zipcode: e.target.value } })
  }

  return (
  
    <div style={{ border: uncompleted ? '1px solid red' : '1px solid green', width: "100%", margin: "2%" }}>
      ID: {userId} <br />


      Name: <input type="text" defaultValue={userName} onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })} /> <br />
      Email: <input type="text" defaultValue={userEmail} onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })} /> <br />
      uncompleted?: {uncompleted.toString()} <br />

      <button onMouseOver={() => setOtherDataExist(true)} onClick={() => setOtherDataExist(false)}>Other Data</button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

      {otherDataExist && <div style={{ border: '1px solid black', width: "90%" }}>
        {/* Street: <input type="text" defaultValue={userAdress.street} onChange={(e) => setUpdatedAdress({...updatedAdress,street: e.target.value})} /> <br />
        City: <input type="text" defaultValue={userAdress.city} onChange={(e) => setUpdatedAdress({...updatedAdress,city: e.target.value})} /> <br />
        Zip Code <input type="text" defaultValue={userAdress.zipcode} onChange={(e) => setUpdatedAdress({...updatedAdress,zipcode: e.target.value})} /> <br /> */}

        Street: <input type="text" defaultValue={userAdress.street} onChange={(e) => setUpdatedUser({ ...updatedUser, address: { ...updatedUser.address, street: e.target.value } })} /> <br />
        City: <input type="text" defaultValue={userAdress.city} onChange={(e) => setUpdatedUser({ ...updatedUser, address: { ...updatedUser.address, city: e.target.value } })} /> <br />
        Zip Code <input type="text" defaultValue={userAdress.zipcode} onChange={handleAddress} /> <br />
      </div>}

      <button onClick={handleUpdateUser}>Update</button>
      &nbsp;
      <button>Delete</button>



      {/* < TodosComp todos={todos}/> */}
    </div>
  );
};

export default UserComp;