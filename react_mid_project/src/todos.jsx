import { useState, useEffect } from "react";
import { getUserTodos } from "./utils";


function TodosComp({userId, todos, callbackTodosUpdate,callbackNewTodo }) {

const [updatedTodos, setUpdatedTodos] = useState(todos);
const [addTodoNotClicked, setAddTodoNotClicked] =useState('true')
const [newTodos, setnewTodos] = useState({
  userId: userId,
  id:'',
  title:'',
  completed:false
});


useEffect(() => {
  setUpdatedTodos(todos)
  console.log("updatedTodos", todos)
}, [todos]);

console.log("newTodo to see first define", newTodos)
  const handleMarkCompleted =(id) => {
    console.log("handle mark completed test ID", id)
    console.log("handle mark completed updatedTodos", updatedTodos)
    const todosCopy = [...updatedTodos]
    console.log("handle mark completed test todosCopy", todosCopy);
    const index = todosCopy.findIndex(todo => todo.id === id)
    console.log("handleMarkCompleted index value", index);
    todosCopy[index] = { ...todosCopy[index], completed: true };
    setUpdatedTodos(todosCopy)
    console.log("todosCopy from handleMarckCompleted",todosCopy)
    callbackTodosUpdate([...todosCopy]);
  }

  const handleAddTodo= (newTodo) => {
    callbackNewTodo(newTodo);
    setAddTodoNotClicked(true);
  }


  console.log("Todos:", todos);
  console.log("add Todo clicked", addTodoNotClicked)

  return (
    <>
    { addTodoNotClicked ? 
    <>

    Todos- User {userId} &nbsp;&nbsp;&nbsp; 
    {<button className="yellowButton" onClick={() =>setAddTodoNotClicked(false)}>Add</button>}
    <div style={{border: '1.5px solid black', alignItems: 'center'}}> 
      {todos.map((todo) => {
        return (
          <div style={{ border: "1.5px solid purple", padding:"10px", margin:"10px" }}>
            Title: {todo.title} <br />
            Completed: {todo.completed.toString()}
            &nbsp;&nbsp; &nbsp;&nbsp;
            {!todo.completed && <button className="yellowButton" onClick={() => handleMarkCompleted(todo.id)} >Mark Completed</button>}
            {/* onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value})} */}
          </div>
        );
      }
      )}
      </div>
      </>
      :
      <>
      New Todo - User {userId}
      <div style={{border: '1px solid black', alignItems: 'center'}}> 
      <br/>
        Title: <input type="text" onChange={(e) => setnewTodos({ ...newTodos, title: e.target.value ,id: userId*100+todos.length })} /> <br /> <br />
        <button onClick={()=> setAddTodoNotClicked(true)}>Cancel</button>
        &nbsp;&nbsp;
        <button onClick={() =>handleAddTodo(newTodos)}>Add</button>
      </div>
      <br />
    </>
    }
  
    </>
  );
};

export default TodosComp;