import { useState, useEffect } from "react";
import { getUserPosts } from "./utils";


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
  <div style={{border:"1.5px solide black"}}>
    <br />
    Name: <input type='text' onChange={(e) => setNewUser({...newUser, id: users.length+1, name:e.target.value})}/>
    <br/><br />
    Email:<input type='text' onChange={(e) => setNewUser({...newUser, email:e.target.value})}/>
    <br /><br />
    <button onClick={callbackCancelNewUser}>Cancel</button>
    &nbsp;&nbsp;
    <button onClick={() =>callbackAddNewUser({...newUser})}>Add</button>
  </div>
  

  );
};

export default NewUserComp;