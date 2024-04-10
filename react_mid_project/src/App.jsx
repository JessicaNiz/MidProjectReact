import { useState, useEffect } from "react"
import { getAllUsers } from "./utils"
import UserComp from "./user";
import axios from "axios"


function App() {
  // const [originalUsers, setOriginalUsers] = useState([])
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const[usersData, setUsersData]=useState([]);


//for every render will fecth the users data from the server
  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await getAllUsers();
      // setOriginalUsers(data);
      setUsers(data);
      console.log("jen ai marre",data.id);
      const useData = user.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        address: user.address
    }));
    setUsersData(useData);
      console.log({ data });
      console.log("userData", usersData)
    };
    fetchUsers();

  }, [])


  const handleChange = (e) => {
    setSearchText(e.target.value);
    // filterUsers();
  };

  // const filterUsers = () => {
  //   if (searchText.trim() === '') {
  //     setUsers(originalUsers);
  //   }
  //   const filteredUsers = originalUsers.filter(user =>
  //   user.name.toLowerCase().includes(searchText.toLowerCase()) ||
  //   user.email.toLowerCase().includes(searchText.toLowerCase())
  //   );
  //   setUsers(filteredUsers);
  // };


// //console log users data for very change to users
//   useEffect(() => {
//     console.log("users",users);
//     const usersData = users.map(user => ({
//       id: user.id,
//       name: user.name,
//       email: user.email,
//       address: user.address
//     }));
//     console.log("print userData", usersData);
//   }, [users])



  const getUpdatedUserFromChild = async (childValue) => {
    console.log("test")
    const usersCopy = [...users]
    const index = usersCopy.findIndex(user => user.id === childValue.id)
    usersCopy[index] = { ...childValue }
    setUsers(usersCopy)
    const { data } = await axios.put("https://jsonplaceholder.typicode.com/users/" + childValue.id, childValue)
    console.log("update user server response", data)

  }

  return (
    <div style={{ border: '1px solid black', borderRadius: '50px', alignItems: 'center', width: "150%" }}>
      Search&nbsp;&nbsp;  <input type="text" onChange={handleChange} />
      &nbsp;&nbsp;
      <button>Add</button>

      {
        // users.map((user) => <UserComp key={user.id} user={user} />)
        usersData.filter(user =>
          usersData.name.toLowerCase().includes(searchText.toLowerCase()) ||
          usersData.email.toLowerCase().includes(searchText.toLowerCase())).map((user) =>
            // <UserComp key={user.id}

            //   userId={user.id} userName={user.name} userEmail={user.email}
            //   userAdress={user.address} callback={(childvalue) => getUpdatedUserFromChild(childvalue)} />)

              <UserCompCopy key={user.id}
              user={user} callback={(childvalue) => getUpdatedUserFromChild(childvalue)} />)
      }
    </div>
  );
};

export default App;