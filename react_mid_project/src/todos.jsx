import { useState, useEffect } from "react";
import { getUserTodos } from "./utils";


function TodosComp({userId, todos, callbackTodosUpdate }) {

const [updatedTodos, setUpdatedTodos] = useState(todos);
const [addTodoNotClicked, setAddTodoNotClicked] =useState('true')
const [newTodos, setnewTodos] = useState({
  userId: userId,
  id: '',
  title:'',
  completed:false
});

console.log("newTodo to see first define", newTodos)
  const handleMarkCompleted =(id) => {
    console.log("handle mark completed test")
    const todosCopy = [...updatedTodos]
    const index = todosCopy.findIndex(todo => todo.id === id)
    todosCopy[index] = { ...todosCopy[index], completed: true };
    setUpdatedTodos(todosCopy)
    console.log("todosCopy from handleMarckCompleted",todosCopy)
    callbackTodosUpdate([...todosCopy]);
  }

  console.log("Todos:", todos);
  console.log("add Todo clicked", addTodoNotClicked)
  return (
    <>
    Todos- User {userId} &nbsp;&nbsp;&nbsp; 
    {<button onClick={() =>setAddTodoNotClicked(false)}>Add</button>}
    <div style={{border: '1px solid black', alignItems: 'center'}}> 
    { addTodoNotClicked ? 
    <>
      {todos.map((todo) => {
        return (
          <div style={{ border: "1px solid purple", padding:"10px", margin:"10px" }}>
            Title: {todo.title} <br />
            Completed: {todo.completed.toString()}
            &nbsp;&nbsp; &nbsp;&nbsp;
            {!todo.completed && <button onClick={() => handleMarkCompleted(todo.id)} >Mark Completed</button>}
            {/* onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value})} */}
          </div>
        );
      }
      )}
      </>
      :
      <div style={{}}> 
        Title: <input type="text" onChange={(e) => setnewTodos({ ...newTodos, title: e.target.value })} /> <br />
        <button onClick={()=> setAddTodoNotClicked(true)}>Cancel</button>
        &nbsp;&nbsp;
        <button>Add</button>
      </div>
    
    }
    </div>
    </>
  );
};

export default TodosComp;