import { useState, useEffect } from "react";
import { getUserTodos } from "./utils";
import "./project.css";

import TodosComp from "./todos";
import { all } from "axios";
import axios from "axios";
import PostsComp from "./posts";


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

  const getUpdatedTodosFromChild = (childValue) => {
    console.log("getUpdatedTodosFromChild",childValue);
    setTodos(childValue)
    // const { data } = await axios.put(`https://jsonplaceholder.typicode.com/users/${user.id}/todos`, childValue)
    // console.log("update todo server response", data)
  };

  const getNewTodosFromChild = (newTodo) => {
    setTodos([...todos, newTodo]);
    console.log("getNewTodosFromChild",newTodo, todos)
    
  };

  console.log("again Todos, to see the new updated Todos", todos)
  return (
    <div style={{display:'flex'}}>
    {/* <div style={{display:"flex", height:"fit-content"}}> */}
    <div style={{height:'fit-content', margin: "5px", padding: "10px" , border: uncompleted ? '2px solid red' : '2px solid green', backgroundColor:userDivClicked ? "#f9ccac":"white"}}>
    {/* <div style={{width:"100%", border: uncompleted ? '2px solid red' : '2px solid green', margin: "2%", backgroundColor:userDivClicked ? "#f9ccac":"white", height:"fit-content"}}> */}
      {/* <div onClick={console.log("i clicked")} style={{backgroundColor:"white"}}> */}
      <p onClick={() => setUserDivClicked(!userDivClicked)}> ID: {user.id} </p> <br />


      Name: <input type="text" defaultValue={user.name}  onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value})} /> <br />
      Email: <input type="text" defaultValue={user.email} onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })} /> <br />
      {/* uncompleted?: {uncompleted.toString()} <br /> */}
      <br />
      <button onMouseOver={() => setOtherDataExist(true)} onClick={() => setOtherDataExist(false)}>Other Data</button>
      

      {otherDataExist && <div style={{ backgroundColor:"#e0e2e4", borderRadius:"25px",border: '1px solid black', margin:'16px', padding:'16px'}}>
        {/* Street: <input type="text" defaultValue={userAdress.street} onChange={(e) => setUpdatedAdress({...updatedAdress,street: e.target.value})} /> <br />
        City: <input type="text" defaultValue={userAdress.city} onChange={(e) => setUpdatedAdress({...updatedAdress,city: e.target.value})} /> <br />
        Zip Code <input type="text" defaultValue={userAdress.zipcode} onChange={(e) => setUpdatedAdress({...updatedAdress,zipcode: e.target.value})} /> <br /> */}

        Street:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" defaultValue={user.address.street} onChange={(e) => setUpdatedUser({ ...updatedUser, address: { ...updatedUser.address, street: e.target.value } })} /> <br />
        City:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" defaultValue={user.address.city} onChange={(e) => setUpdatedUser({ ...updatedUser, address: { ...updatedUser.address, city: e.target.value } })} /> <br />
        Zip Code: <input type="text" defaultValue={user.address.zipcode} onChange={(e) => setUpdatedUser({...updatedUser, address: {...updatedUser.address, zipcode: e.target.value}})} />
      </div>}

      <button className='yellowButton' onClick={() =>callbackUpdate({...updatedUser})}>Update</button>
     
      <button className='yellowButton' onClick={() =>callbackDelete(user.id)}>Delete</button>
    </div>
    {userDivClicked && 
    ( 
    <div style={{position:"absolute", transform:"translateX(370px)", width:'350px'}}>
      <TodosComp userId={user.id} todos={todos} callbackTodosUpdate={getUpdatedTodosFromChild}
      callbackNewTodo={getNewTodosFromChild}/>
      <br /> <br />
      <PostsComp userId={user.id} />
    </div>

    )
    }
  </div>
  );
};

export default UserCompCopy;