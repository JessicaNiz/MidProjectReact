import { useState, useEffect } from "react";
import {v4 as uuidv4 } from "uuid";


function NewUserComp({users, callbackCancelNewUser, callbackAddNewUser}) {
const [newUser, setNewUser] = useState({
  name:'',
  Email:'',
  id:'',
  address: { street:'',
            city:'',
            zipcode:''}

});

console.log("print users from new user component", users)
console.log("users lenght", users.length)

  return (
  <div style={{border:"1.5px solid black", padding:"20px"}}>
    <br />
    Name: <input  type='text' onChange={(e) => setNewUser({...newUser, id: uuidv4(), /*users.length+11,*/  name:e.target.value})}/>
    <br/><br />
    Email: <input type='text' onChange={(e) => setNewUser({...newUser, email:e.target.value})}/>
    <br /><br />
    <button className="yellowButton" onClick={callbackCancelNewUser}>Cancel</button>
    
    <button className="yellowButton" onClick={() =>callbackAddNewUser({...newUser})}>Add</button>
  </div>
  

  );
};

export default NewUserComp;