import { useState, useEffect } from "react";
import { getUserTodos } from "./utils";
import "./project.css";

import TodosComp from "./todos";
import { all } from "axios";
import axios from "axios";


function UserCompCopy({ user, callbackUpdate, callbackDelete }) 
{
  const [todos, setTodos] = useState([]);
  const [uncompleted, setUncompleted] = useState([]);

  const [otherDataExist, setOtherDataExist] = useState(false)

  
  const [updatedUser, setUpdatedUser] = useState(user);

  const [userDivClicked, setUserDivClicked] = useState(false);


  console.log("first value of updated users", updatedUser);

//fecth Todos for every change in UserId
  useEffect(() => {
    const fetchTodos = async () => {
      const { data } = await getUserTodos(user.id);
      setTodos(data);
    };
    fetchTodos();

  }, [user.id]);


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
    };
    getUncompletedTask();

  }, [todos]);

  //just for test, to see the data on the console log
  // console.log(updatedName, updatedEmail, updatedAdress)
  console.log("second update user log", updatedUser);

  const getUpdatedTodosFromChild = async (childValue) => {
    console.log("getUpdatedTodosFromChild")
    setTodos(childValue)
    const { data } = await axios.put(`https://jsonplaceholder.typicode.com/users/${user.id}/todos`, childValue)
    console.log("update todo server response", data)
  }

  return (
    <div style={{display:"flex", height:"fit-content"}}>
    <div style={{width:"100%", border: uncompleted ? '2px solid red' : '2px solid green', margin: "2%", backgroundColor:userDivClicked ? "#f9ccac":"white", height:"fit-content"}}>
      {/* <div onClick={console.log("i clicked")} style={{backgroundColor:"white"}}> */}
      <p onClick={() => setUserDivClicked(!userDivClicked)}> ID: {user.id} </p> <br />


      Name: <input type="text" defaultValue={user.name}  onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value})} /> <br />
      Email: <input type="text" defaultValue={user.email} onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })} /> <br />
      uncompleted?: {uncompleted.toString()} <br />

      <button onMouseOver={() => setOtherDataExist(true)} onClick={() => setOtherDataExist(false)}>Other Data</button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

      {otherDataExist && <div style={{ backgroundColor:"#e0e2e4", borderRadius:"25px",border: '1px solid black', margin: "2%"}}>
        {/* Street: <input type="text" defaultValue={userAdress.street} onChange={(e) => setUpdatedAdress({...updatedAdress,street: e.target.value})} /> <br />
        City: <input type="text" defaultValue={userAdress.city} onChange={(e) => setUpdatedAdress({...updatedAdress,city: e.target.value})} /> <br />
        Zip Code <input type="text" defaultValue={userAdress.zipcode} onChange={(e) => setUpdatedAdress({...updatedAdress,zipcode: e.target.value})} /> <br /> */}

        Street: <input type="text" defaultValue={user.address.street} onChange={(e) => setUpdatedUser({ ...updatedUser, address: { ...updatedUser.address, street: e.target.value } })} /> <br />
        City: <input type="text" defaultValue={user.address.city} onChange={(e) => setUpdatedUser({ ...updatedUser, address: { ...updatedUser.address, city: e.target.value } })} /> <br />
        Zip Code <input type="text" defaultValue={user.address.zipcode} onChange={(e) => setUpdatedUser({...updatedUser, address: {...updatedUser.address, zipcode: e.target.value}})} /> <br />
      </div>}

      <button onClick={() =>callbackUpdate({...updatedUser})}>Update</button>
      &nbsp;
      <button onClick={() =>callbackDelete(user.id)}>Delete</button>
    </div>
    {userDivClicked && 
    ( 
    <div>
      <TodosComp userId={user.id} todos={todos} callbackTodosUpdate={getUpdatedTodosFromChild}/>
    </div>
    )
    }
  </div>
  );
};

export default UserCompCopy;